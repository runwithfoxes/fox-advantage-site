/*
  VERIFICATION FOR src/lib/meta-capi.ts - run it by hand, there is no test runner
  in this repo.

    npx tsc src/lib/meta-capi.ts --outDir /tmp/capi-test --module commonjs \
      --target es2022 --esModuleInterop --skipLibCheck
    cp scripts/verify-meta-capi.js /tmp/capi-test/ && node /tmp/capi-test/verify-meta-capi.js

  ⛔ DO NOT "test" the Conversions API by posting a signup to /api/course-signup.
  That route subscribes the address to the live `course-interest` Klaviyo list,
  which has a LIVE welcome flow on it, so a test signup mails a real human being.
  This file exercises the module directly for exactly that reason.

  Proven to catch real defects: mutating the event name, dropping the email
  lowercase, and changing the fbc subdomain index each turn this red.
*/
const crypto = require("crypto");

let failures = 0;
let checks = 0;
function check(label, cond, detail) {
  checks++;
  if (cond) {
    console.log(`  PASS  ${label}`);
  } else {
    failures++;
    console.log(`  FAIL  ${label}${detail ? `  ->  ${detail}` : ""}`);
  }
}

async function main() {
  // ---------- 1. UNCONFIGURED MUST NO-OP, NOT THROW ----------
  console.log("\n[1] env unset (the state this ships in)");
  delete process.env.META_DATASET_ID;
  delete process.env.META_CAPI_TOKEN;

  let mod = require("./meta-capi.js");
  let calledWhenUnset = false;
  global.fetch = async () => {
    calledWhenUnset = true;
    return { ok: true, text: async () => "" };
  };

  let r = await mod.sendCourseSignupEvent({ email: "a@b.com" });
  check("returns skipped", r.status === "skipped", JSON.stringify(r));
  check("names the missing vars", /META_DATASET_ID/.test(r.reason || ""), r.reason);
  check("makes NO network call when unconfigured", calledWhenUnset === false);

  // ---------- 2. CONFIGURED: INSPECT THE REAL PAYLOAD ----------
  console.log("\n[2] configured, payload inspection");
  process.env.META_DATASET_ID = "1234567890";
  process.env.META_CAPI_TOKEN = "TESTTOKEN";

  let captured = null;
  let capturedUrl = null;
  global.fetch = async (url, opts) => {
    capturedUrl = url;
    captured = JSON.parse(opts.body);
    return { ok: true, text: async () => "{}" };
  };

  r = await mod.sendCourseSignupEvent({
    email: "  Paul.Dervan@Example.COM  ",
    firstName: "Paul",
    fbclid: "IwAR0abcDEF123-_.xyz",
    clientIp: "82.11.4.9",
    userAgent: "Mozilla/5.0 test",
    sourceUrl: "https://runwithfoxes.com/course/fb?fbclid=IwAR0abcDEF123-_.xyz",
    signupSource: "hero",
  });

  check("returns sent", r.status === "sent", JSON.stringify(r));
  check("posts to the dataset's events edge",
    /graph\.facebook\.com\/v\d+\.\d+\/1234567890\/events$/.test(capturedUrl || ""), capturedUrl);
  check("token travels in the body, not the URL",
    captured && captured.access_token === "TESTTOKEN" && !String(capturedUrl).includes("TESTTOKEN"));

  const ev = captured && captured.data && captured.data[0];
  check("exactly one event in the payload", captured && captured.data.length === 1);
  check("event_name is Lead", ev && ev.event_name === "Lead", ev && ev.event_name);
  check("action_source is website", ev && ev.action_source === "website");

  // Known answer, computed here independently of the module.
  const expectedEmailHash = crypto.createHash("sha256")
    .update("paul.dervan@example.com").digest("hex");
  check("email is sha256 of the TRIMMED, LOWERCASED address",
    ev && ev.user_data.em[0] === expectedEmailHash,
    ev && ev.user_data.em[0]);
  check("raw email appears NOWHERE in the payload",
    !JSON.stringify(captured).toLowerCase().includes("paul.dervan@example.com"));

  const expectedFirstHash = crypto.createHash("sha256").update("paul").digest("hex");
  check("first name hashed and lowercased", ev && ev.user_data.fn[0] === expectedFirstHash);

  check("fbc has Meta's fb.1.<ms>.<fbclid> shape",
    ev && /^fb\.1\.\d{13}\.IwAR0abcDEF123-_\.xyz$/.test(ev.user_data.fbc),
    ev && ev.user_data.fbc);
  check("ip sent UNhashed (Meta's spec)", ev && ev.user_data.client_ip_address === "82.11.4.9");
  check("user agent sent UNhashed", ev && ev.user_data.client_user_agent === "Mozilla/5.0 test");
  check("event_id present for dedup", ev && typeof ev.event_id === "string" && ev.event_id.length === 32);
  check("signup_source carried through", ev && ev.custom_data.signup_source === "hero");

  // ---------- 3. DEDUP KEY BEHAVIOUR ----------
  console.log("\n[3] event_id dedup");
  const first = ev.event_id;
  await mod.sendCourseSignupEvent({ email: "paul.dervan@example.com" });
  const second = captured.data[0].event_id;
  check("same person same day -> SAME event_id (a retry dedupes)", first === second,
    `${first} vs ${second}`);
  await mod.sendCourseSignupEvent({ email: "someone.else@example.com" });
  check("different person -> DIFFERENT event_id", captured.data[0].event_id !== first);

  // ---------- 4. JUNK fbclid IS DROPPED, NOT FORWARDED ----------
  console.log("\n[4] fbclid comes from the open internet");
  await mod.sendCourseSignupEvent({ email: "a@b.com", fbclid: "bad id with spaces!" });
  check("malformed fbclid dropped entirely", captured.data[0].user_data.fbc === undefined,
    captured.data[0].user_data.fbc);
  await mod.sendCourseSignupEvent({ email: "a@b.com", fbclid: "" });
  check("empty fbclid dropped", captured.data[0].user_data.fbc === undefined);
  await mod.sendCourseSignupEvent({ email: "a@b.com", fbclid: "x".repeat(9000) });
  check("absurdly long fbclid dropped", captured.data[0].user_data.fbc === undefined);

  // ---------- 5. NO EMAIL -> SKIP ----------
  console.log("\n[5] nothing to match on");
  r = await mod.sendCourseSignupEvent({ email: "   " });
  check("blank email skips rather than sending a matchless event", r.status === "skipped", JSON.stringify(r));

  // ---------- 6. FAILURE MUST NOT THROW ----------
  console.log("\n[6] Meta misbehaving must never break a signup");
  global.fetch = async () => ({ ok: false, status: 400, text: async () => "Invalid OAuth token" });
  r = await mod.sendCourseSignupEvent({ email: "a@b.com" });
  check("400 returns failed, does not throw", r.status === "failed", JSON.stringify(r));
  check("failure reason carries the status", /400/.test(r.reason || ""), r.reason);

  global.fetch = async () => { throw new Error("ECONNREFUSED"); };
  r = await mod.sendCourseSignupEvent({ email: "a@b.com" });
  check("network explosion returns failed, does not throw", r.status === "failed", JSON.stringify(r));

  global.fetch = async (_u, opts) => {
    // Never resolves on its own; only the AbortSignal ends it.
    return new Promise((_res, rej) => {
      opts.signal.addEventListener("abort", () => rej(new Error("aborted")));
    });
  };
  const started = Date.now();
  r = await mod.sendCourseSignupEvent({ email: "a@b.com" });
  const took = Date.now() - started;
  check("a hanging Meta is aborted, not waited on forever", r.status === "failed", JSON.stringify(r));
  check(`abort lands near the 2500ms timeout (took ${took}ms)`, took >= 2000 && took < 4000, `${took}ms`);

  console.log(`\n${checks - failures}/${checks} passed, ${failures} failed\n`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error("TEST HARNESS BLEW UP:", e); process.exit(2); });
