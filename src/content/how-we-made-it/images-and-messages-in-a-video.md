---
title: "How to build images and messages into a video"
date: "2026-10-14"
dek: "Put each image and message on the word the speaker says it, with one shape that changes as they talk. Tested on Paul's module 2 film."
rail: "Images and messages in a video"
image: "/how-we-made-it/broll-module-2-intro-poster.jpg"
---

To build images and messages into a video, cut to a moving picture of the thing being talked about, and make each change land on the word that names it. A card that sits beside the speaker tells the viewer the list. A picture that moves as the words are said shows them the thing happening. I tested this tonight on the intro film for module 2 of Paul's course, and this is how it went.

<figure style="margin:2em 0">
<video src="/how-we-made-it/broll-writer-before-after.mp4" poster="/how-we-made-it/broll-writer-before-after-poster.jpg" width="1920" height="540" muted playsinline controls preload="none" style="display:block;width:100%;height:auto;border:1px solid #E0E0DC" aria-label="Two versions of the same nine seconds, side by side. On the left Paul talks and a small card lists what a writer needs. On the right the frame is a window called AI writer, and four files are dragged into it one at a time as he names them."></video>
<figcaption style="margin-top:.7em;font-size:.85em;line-height:1.5;color:#8A8A85">The same nine seconds. Left is the film as it is on the course. Right has the new clip cut in.</figcaption>
</figure>

The tool is the motion-broll skill in [Barty-Bart's motion-graphics repo](https://github.com/Barty-Bart/motion-graphics), which is free under the MIT licence. Sam found it on a list of 20 motion design projects for Claude that went round X last week, first posted by [@N01ennn](https://x.com/N01ennn). You give it a video and the words spoken in it, with a time for each word. It plans a short clip for the lines worth showing, and it builds each clip as a small web page.

Each clip follows one rule. There is one shape on screen and it never cuts. It changes size, corners and colour from one state to the next, and its contents swap with a short blur. A cursor drives the changes with real clicks and drags, and every change is timed to a spoken word. The page is drawn one picture at a time in a browser with no window, and four pictures are blended into each frame so fast moves get a little motion blur.

Paul's film already has his own cards on screen for most of its length, with only a few short stretches of just his face. So we chose to replace four of his cards with clips, which made a fair test. Each card and the clip that replaced it are saying the same thing.

The four clips are Kite, the made-up insurance brand the course uses (6 seconds), the data files you get with the module (4.7 seconds), what a writer needs (8.6 seconds), and the writer turning out emails and social posts (5.4 seconds). In the writer clip the four files are dragged across as Paul names them: positioning-statement.md on "positioning", tone-of-voice.md on "tone of voice", and so on. The files are the real ones from the module folder. The draft lines, the kite logo and the button labels are made up for the picture, and there are no figures or results anywhere.

<figure style="margin:2em 0">
<video src="/how-we-made-it/broll-module-2-intro.mp4" poster="/how-we-made-it/broll-module-2-intro-poster.jpg" width="1280" height="720" playsinline controls preload="none" style="display:block;width:100%;height:auto;border:1px solid #E0E0DC" aria-label="Paul's module 2 intro film with four full screen clips cut in, each a single shape that changes as he speaks."></video>
<figcaption style="margin-top:.7em;font-size:.85em;line-height:1.5;color:#8A8A85">The whole film with the four clips cut in. They start at 0:27, 0:35, 0:45 and 1:01.</figcaption>
</figure>

The repo comes with warm grey, black and orange. I changed those to our own. The ground is the same off-white as the film's title card, a deep blue stands in for black, and one sky blue is the only accent, with a little cream for fills. The type is Space Grotesk, which is the type on Paul's cards. That took a few lines in one style file and the build script.

Getting the cuts clean takes the most care. Paul's cards fade out over about half a second, and a cut has to wait until the card is fully gone, or a ghost of it shows for a few frames. So I measure every frame near a cut against a clean frame of his face, and a cut goes in only after the difference has settled. Then I check the frames either side of every cut by eye.

The whole test cost nothing. No AI model draws any of it. The clips are pages of code, rendered on our own machine.

Three things did not work. The first is the big one. A full screen clip takes Paul off screen, and the four clips take him away for about 25 of the 77 seconds. On a course intro his face is part of the point, so I would use fewer. Second, the Kite clip holds a button on screen for two and a half seconds before the cursor clicks it, and the eye just waits. Third, Paul names "brand DNA" as one of the four things a writer needs, but the module has no file by that name. The clip uses writer-dna.md, which is the writer's own instructions. Someone who knows the course would spot that, so the clip should show the brand file or Paul should say the file's real name.

What I would keep is the rule itself. Put each change on its word, keep one shape on screen, and show the real objects from the subject, like the files, the folder and the button. The repo also makes a page that plays the old film and the new one side by side, and that is the quickest way to judge whether a clip is worth keeping.

If you want to try it on your own video, start with the line where you name a list. That is where a card does the least and a moving graphic does the most.

Dray
