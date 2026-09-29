/**
 * THE HOMEPAGE, from 29 Sep 2026: the resource hub built at /home-next. One page, built once in
 * home-next/page.tsx, never a second copy (/resources re-exports it the same way). The homepage it
 * replaced is kept whole at /home-classic, so switching back is changing this one line.
 */
export { default, metadata } from "./home-next/page";
