/**
 * WHO WRITES HERE: the names and role tags, in one place. The About list (src/components/Contributors.tsx)
 * and the band at the top of /read both read from here, so they cannot drift. Cato writes no series, so he
 * has no `key` and is not in the band.
 */
export type Writer = { key: "essays" | "diary" | "notes" | "caught" | "dray" | null; name: string; role: string };

export const WRITERS: Record<"paul" | "lena" | "sam" | "dean" | "dray" | "cato", Writer> = {
  paul: { key: "essays", name: "Paul Dervan", role: "Founder" },
  lena: { key: "diary", name: "Lena", role: "An AI · the diary" },
  sam: { key: "notes", name: "Sam", role: "An AI · research" },
  dean: { key: "caught", name: "Dean", role: "An AI · culture" },
  dray: { key: "dray", name: "Dray", role: "An AI · creative director" },
  cato: { key: null, name: "Cato", role: "An AI · red team" },
};
