/*
  Does a sign-up that FILLED THE HIDDEN TRAP look like a bot? Only ever asked when the trap
  is already filled. A match does not reject the person, it holds them off the email list.
  See the long note above the call in src/app/api/course-signup/route.ts.
*/
const TEXT_GATEWAYS = /@(txt\.att\.net|tmomail\.net|vtext\.com|vzwpix\.com|messaging\.sprintpcs\.com|mms\.att\.net|sms\.[^@]+)$/;
const NAME_STARTS = new Set("bl br ch cl cr dr fl fr gl gr kl kr ph pl pr sc sh sk sl sm sn sp st sw th tr tw wh wr ll ff gw rh dw sv bj kw ng nk nd mb ts dm sr".split(" "));
const ODD_PAIRS = /(bx|cx|dx|fx|gx|hx|jx|kx|mx|px|qx|sx|vx|wx|zx|xz|xj|xq|xk|xv|xg|xb|xd|xf|xm|q[^u]|[^aeiou]q|jq|jz|zj|vz|zv|fz|zf|kz|zk|hk|hz|hj|hv|cj|jc|fj|jf|gj|jg|vj|jv|wv|vw)/;
/* Three consonants in a row that real first names do carry: Andrew, Matthew, Sorcha, Cliodhna. */
const OK_TRIPLES = new Set("ndr tth rch dhn chr sch thr str ngr ntr lph mbr nch rth ldr rtn rls tch ght phn lfr shl nst rst nth ndl rnd lth ngl rdr mph nsl ksh shr rsh thm lvn ttr ffr ppl rtr stl rsl ngh rgh dhg bhn dhb mhn nds lls rry".split(" "));
/* Two consonants a real first name can end on: Mark, Ruth, Bernard, Matthijs. */
const OK_ENDS = new Set("ch ck ld ll lm ln lt nd ng nk nn ns nt nz rd rk rl rm rn rs rt ry sh ss st th tt wn ys hn ff gh lf lv mp nc rc rg rp rv sk dd bb ly ny dy ty gy hy ky my py sy vy by cy fy zy tz rr mm pp gg rb rf lk lp ls sc pt ct ft xt ks cs ps ms bs ds gs ws ts yn yl yr wl ph js".split(" "));

/* ⚠️ A Python port lives in paul-hub/scripts/course_bot_rule.py. The two must agree; if you
   change one, change the other, then run that script's check over the whole roll. */
export function looksLikeTrapBot(name: string, email: string): boolean {
  const [local, domain = ""] = email.toLowerCase().split("@");
  if (TEXT_GATEWAYS.test(email.toLowerCase())) return true;
  if (/^(gmail|googlemail)\.com$/.test(domain) && (local.match(/\./g) || []).length >= 3) return true;

  const t = name.trim().toLowerCase();
  if (!/^[a-z]{3,11}$/.test(t)) return false;
  /* 1 Oct 2026: a first name that sits inside the person's own address is a person. No bot's
     did across 73, and it is what lets Ashley (ashley@...) and Max (max.stricker@...) through. */
  if (local.replace(/[^a-z]/g, "").includes(t)) return false;
  if ((domain.split(".")[0] || "").replace(/[^a-z]/g, "").includes(t)) return false;

  for (const m of t.matchAll(/[bcdfghjklmnpqrstvwxz]{3,}/g)) {
    if (!OK_TRIPLES.has(m[0])) return true;
  }
  if (/^[bcdfghjklmnpqrstvwxz]{2}/.test(t) && !NAME_STARTS.has(t.slice(0, 2))) return true;
  if (ODD_PAIRS.test(t)) return true;
  if (/[aeiou]{3,}/.test(t) && !/(eoi|aoi|uai|iai|eau|oui|oia|ioa)/.test(t)) return true;
  if (/[qj]$/.test(t)) return true;
  if (!/[aeiouy]/.test(t)) return true;
  if (t.includes("ii") || t.includes("uu")) return true;
  return /[bcdfghjklmnpqrstvwxz]{2}$/.test(t) && !OK_ENDS.has(t.slice(-2));
}
