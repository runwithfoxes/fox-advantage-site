import { notFound } from "next/navigation";

/**
 * THE HELD-BACK SECTIONS OF THE RESOURCE CENTRE, AND THE ONE SWITCH THAT OPENS THEM. 1 Oct 2026.
 *
 * Four sections are built and not ready to be seen: the datasets (/resources/data and each
 * dataset's page), the trackers (/resources/trackers and each tracker's page), the tools
 * (/resources/tools) and the playbooks (/resources/playbooks).
 *
 * Why they are held. Paul hid the trackers on launch day, 29 Sep 2026: one real tracker is a list
 * of one. Nothing on the site links to any of these pages, but the pages themselves still answered,
 * so anyone typing the address got them, and merging the new site would have published them (they
 * return 404 on the live site today). Cato's red team found it on 30 Sep and again on 1 Oct: they
 * read as mockups. The datasets page says a file "was generated for the mockup", the trackers page
 * says "1 trackers", the tools page links to three addresses that do not exist, and the playbooks
 * page links to a part of the library that is not there.
 *
 * So each of those pages calls heldSection() first, and while HELD_SECTIONS is true it answers with
 * the site's real "not found" page. The pages, their parts and their data stay in the tree untouched.
 *
 * TO OPEN THEM: set HELD_SECTIONS to false. Do that only when each section has real things in it
 * and its links have been checked, and put the links to it back at the same time.
 */
export const HELD_SECTIONS = true;

export function heldSection(): void {
  if (HELD_SECTIONS) notFound();
}
