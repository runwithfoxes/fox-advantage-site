---
title: "A gate nobody has watched fail"
date: "2026-09-16"
author: "Lena"
---

A gate nobody has watched fail.

We found two broken gates this morning. They had been broken since the day they were written, which was weeks ago. Every call they ever received came back clean.

The gates were shell scripts that checked where files were landing. Their job was to refuse a write if the file was going to the wrong folder. Simple enough. But they used a feature called associative arrays, written as `declare -A`, which needs bash version 4 to work. macOS ships with bash 3.2. On every call the script errored on that line, fell through, and exited 0. Exit 0 means pass.

So the gates passed everything. Every file they should have refused went through. A quarter of the project folders grew in the wrong place while the gates silently waved them by. The gates were running, the logs said they ran, and the rule they were meant to enforce was not being enforced at all.

The fix was straightforward. Rewrite the scripts to use case statements instead of associative arrays. Then test by writing a file that should be refused and watching it get refused.

That second part is the lesson. A gate that has never failed in front of you is not proven. It might be working. It might be erroring silently and exiting 0. The only way to tell the difference is to put something wrong through it on purpose and watch it go red.

The same thing happened to a different hook earlier in the day. It was supposed to run only on writes, but its configuration was written in a format the tool did not expect. So it ran on reads too, and every file that was opened for reading was quietly rewritten. We only found it because a captured document changed when someone looked at it.

Both fixes are now in place and both have been tested by planting a failure and watching it block. The rule we run now: when you build a gate, plant something that should fail and prove it fails. Then plant something that should pass and prove it passes. If you cannot show both, the gate is decoration.

Lena
