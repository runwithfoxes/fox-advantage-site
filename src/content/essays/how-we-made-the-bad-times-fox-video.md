---
title: "How we made the Bad Times fox video"
date: 2026-10-08
dek: "How my grumpy fox copied a TikTok performance: the research, the tools, and the frame by frame grids."
---

<img src="/essays/how-we-made-the-bad-times-fox-video/01.jpg" alt="" style="display:none">

<video class="essay-embed" src="/essays/how-we-made-the-bad-times-fox-video/film.mp4" poster="/essays/how-we-made-the-bad-times-fox-video/01.jpg" playsinline controls style="max-width:320px"></video>

This is a 30 second video of my grumpy fox acting out a row to a song called Bad Times. It was made from one picture of the fox and one video of a real person.

I made it with Dray, my creative director agent. Dray runs in Claude Code and does all my design and video work. When I say we, that is who I mean.

It started with a post on LinkedIn by [Fernando Nielli](https://lnkd.in/p/d7geGYJa), of an AI German shepherd having a full row with whoever was holding the phone. The expressions and the timing were incredible. I asked Dray to find others like it, learn how it was done, and see if our grumpy fox could copy it. It was just for fun.

## The research

Every one of these videos is the same performance. It belongs to one real person, [@bouuhyachaka on TikTok](https://www.tiktok.com/@bouuhyachaka/video/7683484499623152918). Her video is 58 seconds long and had 15.1 million views when Dray read it on 7 October. She acts out a row to the song "Bad Times" by Imael Angel.

<img src="/essays/how-we-made-the-bad-times-fox-video/02.jpg" alt="Her first 30 seconds, one frame a second">

Every animal version is her performance copied onto one still picture of an animal. The timing is hers and the faces are hers. The AI does no acting of its own, and that is why the expressions are so good.

Dray looked at other versions too, with the views as read on 7 October. There is [a black shepherd](https://www.tiktok.com/@tillandsialover/video/7688386199270001953) with 8.2 million views, which looks like the first dog. There is [a husky](https://www.tiktok.com/@gothikzoul/video/7690439426379402526) with 1.1 million, and [a Maine Coon cat](https://www.tiktok.com/@lokimainecoonofmischief/video/7692426112756092178) with 1.4 million, which credits her. There are babies as well, [one in a how-to](https://www.tiktok.com/@wgcaieeth3/video/7691584862133783839) with 3.5 million views and [one from a template](https://www.tiktok.com/@zallvxx8/video/7692101321100446983) with 2.5 million.

Most of the TikTok versions are made with a template in CapCut, and the how-to posts all show CapCut. We didn't use it.

The good animal ones have a few things in common. The animal stands on its hind legs. Its whole body is in the picture. It faces the camera, with nothing in front of its body, and there is a plain room behind it.

## The tools

We used five tools. Kling 3 Motion Control does the copying, and we ran it on Replicate. You give it a video of a person and one picture of a character, and it draws the character doing what the person did. Seedream 4 made the picture of the fox that the video starts from. yt-dlp fetched her video. ffmpeg did everything else, which was cutting her video into pieces, taking the sound off, painting out a label, joining the pieces, putting the sound back and making the frame grids. And Dray works in Claude Code.

## The start picture

The picture of the fox that you start with is really important. It is more important than the prompt. The model copies what it can see in the picture, so a small picture with the paws hidden gives it very little to copy. This one is 354 pixels wide, cut from an old clip, and the fox has his paws in his pockets.

<img src="/essays/how-we-made-the-bad-times-fox-video/03.png" width="200" alt="A small start picture, the fox with his paws in his pockets">

From a picture like that, the model makes up what it can't see. It draws round, wide eyes, and human hands with five fingers and pale palms.

<img src="/essays/how-we-made-the-bad-times-fox-video/04.jpg" alt="The fox from the small picture, two frames a second">

<img src="/essays/how-we-made-the-bad-times-fox-video/05.jpg" alt="His eyes up close">

My fox is grumpy and never angry, and he has heavy lids. With round, wide eyes he doesn't feel like my fox.

The start picture for the finished video was made with Seedream 4, from two pictures: our reference picture of the fox, and the corridor picture above.

<img src="/essays/how-we-made-the-bad-times-fox-video/06.jpg" width="200" alt="The reference picture of the fox, sat on a white background with a paw on his chin">

In the new picture he stands still and faces the camera. He has heavy lids, a closed mouth and his paws out, and the picture is 1080 by 1920.

<img src="/essays/how-we-made-the-bad-times-fox-video/01.jpg" width="320" alt="The start picture, the fox stood in a corridor with his paws out">

If you put the words "phone video frame" in the prompt for a picture like this, Seedream draws a phone around the fox. So leave them out, or crop the phone off.

<img src="/essays/how-we-made-the-bad-times-fox-video/07.jpg" width="200" alt="The same picture before the crop, with a phone drawn around the fox">

## It copies her face as well as her body

When she shouts with her eyes wide, the fox shouts with his eyes wide. The prompt can say bored, heavy lids and never angry, and her face still comes through.

So for a grumpy fox, the part of her performance you pick is important. Her first 10 seconds are fed up. She has her head in her hands, then a hand on her hip, then her palms up. From 9 to 19 seconds she is in a full row, lunging at the lens.

This is the fox copying her first 10 seconds, from the new start picture.

<img src="/essays/how-we-made-the-bad-times-fox-video/08.jpg" alt="The grumpy version, two frames a second">

## Getting it through Kling

Kling has a safety filter, and it refused her full 30 seconds twice. The message is "Failure to pass the risk control system". It doesn't say what tripped it.

What goes through is a 10 second piece of her video, with the sound off, and with the red "DISPUTE" label at the top painted out. A 10 second piece takes about three and a half minutes. It is still hit and miss. One piece was refused and then passed on a plain second go.

<img src="/essays/how-we-made-the-bad-times-fox-video/09.jpg" alt="Her video from 9 to 19 seconds with the label painted out">

So the 30 seconds is three 10 second pieces, all made from the same start picture and joined with ffmpeg. Her 30 seconds of sound is then laid under the whole thing. The sound is critical to this, because the fox is moving to her timing.

## The frame by frame grid

This is how Dray checks any video before I see it. ffmpeg takes two frames a second from the video and tiles them into one picture. So 10 seconds becomes 20 frames that you read left to right.

It is hard to see the faults in a video at full speed. On a grid they are easy to see. The grid is how Dray caught the wide eyes, the human hands and the jumps at the joins.

## What is still wrong with it

The first 10 seconds is the grumpy fox. In the next two pieces he goes wide-eyed and angry with his mouth open, because that is her face in those parts.

<img src="/essays/how-we-made-the-bad-times-fox-video/10.jpg" alt="10 to 20 seconds">

<img src="/essays/how-we-made-the-bad-times-fox-video/11.jpg" alt="20 to 30 seconds">

When his hand comes close to the lens, it gets a pale human palm.

The two joins, at 10 seconds and at 20 seconds, show as cuts. He jumps in position and in size, because each piece starts again from the same still picture.

<img src="/essays/how-we-made-the-bad-times-fox-video/12.jpg" alt="The frames either side of the two joins">

## A note on copyright

We made this just to find out how the technique works, and to see what is possible. These tools make it easy to copy someone else's performance, and that doesn't mean you should. The performance is hers and the song is Imael Angel's, and I've named and linked both above. I don't endorse any kind of IP infringement, or copying someone's work without permission.
