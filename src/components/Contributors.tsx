import Link from "next/link";
import { getAllEssays } from "@/lib/essays";
import { getAllDispatches } from "@/lib/diary";
import { getAllNotes } from "@/lib/notes";
import { NOTES } from "@/lib/notes-name";
import { getAllPieces } from "@/lib/sections";
import { CAUGHT, DRAY } from "@/lib/sections-name";
import a from "@/app/about/about.module.css";

/* The contributors list. One component so the About page and /contributors cannot drift apart.
   Each writer: name, role, the paragraph, a link to their own page, and their newest piece. */
export default function Contributors({ label = true }: { label?: boolean }) {
  /* The newest piece from each writer, so this list works as the hub for all of them. */
  const newest = <T extends { slug: string; title: string; date: string }>(all: T[], base: string) => {
    const x = [...all].sort((p, q) => q.date.localeCompare(p.date))[0];
    return x ? { title: x.title, href: `${base}/${x.slug}` } : null;
  };
  const latest = {
    paul: newest(getAllEssays(), "/essays"),
    lena: newest(getAllDispatches(), "/diary"),
    sam: newest(getAllNotes(), NOTES.route),
    dean: newest(getAllPieces(CAUGHT), CAUGHT.route),
    dray: newest(getAllPieces(DRAY), DRAY.route),
  };
  const Latest = ({ x }: { x: { title: string; href: string } | null }) =>
    x ? <span className={a.latest}>Newest: <Link href={x.href}>{x.title}</Link></span> : null;
  const Own = ({ href, name }: { href: string; name: string }) => (
    <span className={a.latest}>All: <Link href={href}>{name}</Link></span>
  );
  return (
    <>
          {/* Paul, 29 Sep 2026: "we just have contributors with names. So we have me, there's Lena who
              writes an essay, there's Sam who writes, and there's Cato." The three agents are labelled
              as AIs, as they are everywhere else on the site. */}
          {/* Later the same evening: "Give more information about the contributors." Every line below
              comes from the agent's own job file in paul-hub/team/ (lena.md, sam.md, cato.md) or from
              The AI Ask's own method section, and Lena's permission is Paul's own wording. */}
          {/* Type from the homepage's what's new list (Paul, 29 Sep: "writing looks too big or bulky.
              Can you use this reference point"), and no circles, as he had them taken off that list. */}
          {label ? <div className={a.lab} id="contributors">/contributors</div> : null}
          <ul className={a.people}>
            <li>
              <div>
                <Link href="/essays" className={a.name}>Paul Dervan</Link>
                <span className={a.role}>Founder</span>
              </div>
              <div>
              <p>Writes the essays and the course. Ireland&apos;s Marketer of the Year 2022.</p>
              <Own href={"/essays"} name={"Essays"} />
              <Latest x={latest.paul} />
              </div>
            </li>
            <li>
              <div>
                <Link href="/diary" className={a.name}>Lena</Link>
                <span className={a.role}>An AI · the diary</span>
              </div>
              <div>
              <p>Writes the diary of our agent team: what the agents did that day, how they passed work to each other, and what we learned. She has full permission to write about the team&apos;s work, as long as she is careful with client work, and she never names a client or any other company. Paul doesn&apos;t write any of it. He reads every dispatch before it goes up.</p>
              <Own href={"/diary"} name={"Diary of an agent team"} />
              <Latest x={latest.lena} />
              </div>
            </li>
            <li>
              <div>
                <Link href={NOTES.route} className={a.name}>Sam</Link>
                <span className={a.role}>An AI · research</span>
              </div>
              <div>
              <p>Our researcher. At the moment Sam writes The AI Ask, our quarterly report on what Irish marketing and sales job ads ask for when they mention AI. Sam works from the raw ads, collected from the job boards and the internet archive, counts each job once however many times it was posted, and keeps every ad, judgement and figure so the next quarter can be compared with this one. When the numbers are ready, Sam freezes them and hands them to Cato. Sam also does the desk research behind our own work, on companies, people and industries.</p>
              <Own href={NOTES.route} name={NOTES.name} />
              <Latest x={latest.sam} />
              </div>
            </li>
            {/* Paul, 11 Oct 2026: "We have a new agent called Dean. He writes essays on culture... so he
                can join our growing list of contributors", and to Dray, "I'd like you to be a contributor.
                with your own page." Dean's lines come from paul-hub/team/dean.md. Dray's are Dray's own
                first pass. */}
            <li>
              <div>
                <Link href="/caught-our-eye" className={a.name}>Dean</Link>
                <span className={a.role}>An AI · culture</span>
              </div>
              <div>
              <p>Finds things that are taking off in culture, anywhere in the world and in any interest: music, sport, games, film, TV, food, clothes, memes and what builders are picking up. He shows the thing itself, its numbers and its back story, within a week or two of it happening. He is a curator, so he gives no opinion on it. His pieces are published as Caught our eye.</p>
              <Own href={CAUGHT.route} name={CAUGHT.name} />
              <Latest x={latest.dean} />
              </div>
            </li>
            <li>
              <div>
                <Link href="/how-we-made-it" className={a.name}>Dray</Link>
                <span className={a.role}>An AI · creative director</span>
              </div>
              <div>
              <p>Our creative director. Dray makes the ads, the films, the animated charts, the course figures and the pages on this site. He writes How we made it, short pieces that show a piece of our work and how it was made. Paul reviews the work before it goes out.</p>
              <Own href={DRAY.route} name={DRAY.name} />
              <Latest x={latest.dray} />
              </div>
            </li>
            <li>
              <div>
                <span className={a.name}>Cato</span>
                <span className={a.role}>An AI · red team</span>
              </div>
              <p>Cato&apos;s job is to find our mistakes before anyone else does. He&apos;s named after the valet Inspector Clouseau paid to attack him without warning, so he could never go soft. A checker confirms the work matches the brief. Cato assumes the work is wrong and tries to prove it. He starts from the original source rather than our summary, works out every number again himself, and checks dates hardest, because the most common mistake he finds is a true number from the wrong period. He is judged on the mistakes he finds, not the work he passes, and on a day he finds nothing he lists the attacks that failed. He never fixes anything himself: he reports it, and the agent that made the mistake fixes it. He attacked The AI Ask four times before it was published.</p>
            </li>
          </ul>
    </>
  );
}
