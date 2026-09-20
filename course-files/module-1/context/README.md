# Module 1, item 02: the two recordings

Real runs, saved word for word, 20 Sep 2026. Claude Opus 5, one message each, with
`campaigns-2025.csv` (from `../data/`) attached and a way to run Python on it. Nothing else
was in the conversation: no project, no instructions, no memory.

- `without-context.prompt.txt` and `without-context.md`: the ask with no context, and the reply.
- `with-context.prompt.txt` and `with-context.md`: the five-line ask from the page, and the reply.

The page plays these through `src/app/course/contextSessions.generated.ts`, which
`scripts/build-context-sessions.mjs` writes from the files here. Never edit a reply. To
re-record, run the prompt again, save what came back, and run the script.

## Which run, and why

Replies to the same prompt differ from run to run, and on this file most runs get at least
one figure wrong. So each prompt was run several times in the same set-up, every figure in
the candidates was checked against the csv, and the run shown is the one whose figures hold.
Nothing in either reply was edited.

**Without context: run 5 of 5.** It removes the duplicated social row for the week of 14
July before totalling, so its totals (€308,047, 5,468 policies) agree with the with-context
reply beside it and with the analyst in item 10. Three of the other four said the April and
May price-comparison increase bought no extra policies. The file says otherwise: about 36
policies a week before, about 39 during. One figure in the chosen run is loose: it puts
brand search at "~€40" a policy with the four March weeks left out, and the file gives €37.

**With context: run 8 of 10.** It kept to the page it was asked for: one table, three short
paragraphs, a note on the data. It removes the duplicated row, and it reads the price-comparison
test correctly (3.4 extra policies a week, €62 each). Five of the other nine misread that test
or left the duplicated row in. One phrase in the chosen run is loose: "43 policies in every
single radio week" is the average (42.6, range 40 to 46) against 35.4 (range 32 to 39) in
the other weeks. Its claim that the two ranges never overlap is right.

⚠️ The lesson of the item is what context does to the SHAPE of the answer, and that holds in
every run: without context the reply is an analyst's write-up of around 600 words that never
says whether to keep spending; with it, the reply is one page that answers the question.
