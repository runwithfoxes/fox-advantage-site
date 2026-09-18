import type { Metadata } from "next";
import LibraryTestClient from "./LibraryTestClient";

// Internal test page only, checking the ported component library
// (src/app/for/_components/library) renders correctly. Not linked from anywhere,
// kept out of the index.
export const metadata: Metadata = {
  title: "Library test",
  robots: { index: false, follow: false },
};

export default function ForLibraryTestPage() {
  return <LibraryTestClient />;
}
