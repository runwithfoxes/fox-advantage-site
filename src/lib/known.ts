/* The name the "already signed up" answer is kept under in localStorage, and the one line that
   puts it back before the page paints. A plain file with no "use client", so the server layout can
   read the string. The rest is in src/components/Known.tsx. */
export const KNOWN_KEY = "rwf_known";
export const KNOWN_HEAD_SCRIPT = `try{if(localStorage.getItem("${KNOWN_KEY}")==="1")document.documentElement.dataset.known="1"}catch(e){}`;
