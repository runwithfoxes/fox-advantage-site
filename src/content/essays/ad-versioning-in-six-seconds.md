---
title: "Ad versioning in six seconds"
date: 2026-06-08
dek: "If your team spend time or money on versioning digital ads, this is for you."
substack: https://runwithfoxes.substack.com/p/ad-versioning-in-six-seconds
---
I can version this digital Ad into 9 sizes in six seconds. The *6 seconds* is accurate, not hype. But first you have to build the system. 

![](/essays/ad-versioning-in-six-seconds/01.gif)

This ad is from an article I’m writing. When I have my original or hero asset, I can then point Claude Code at it and ask it to re-size it into the formats I need. Claude knows what sizes I want and in seconds, it spits them all out, in static, and Gifs and mpegs. The files done and ready to put live. 

![](/essays/ad-versioning-in-six-seconds/02.gif)

![](/essays/ad-versioning-in-six-seconds/03.png)

Claude is not drawing the ads. It opens each ad as a tiny web page and takes a picture of it frame by frame. Then it uses two free tools, ffmpeg and gifsicle, and turns those frames into a video and a looping GIF. That’s it. No image generation. No internet. Not even Python. These are just tools. 

The real work is before that. To set up a system like this means taking everything you know about how you want this type of ad to behave, pulling it apart, and writing it down as rules. 

For example, you need to think about what Claude should put into vertical ads. Or really small ads. If not, it will try to just take everything from the big hero ad, make everything smaller and shove it into a different size or shape. That doesn’t end well. 

The brand guidelines must work every time. This is the important part, and is why I’ve not gone for generic solutions. I want the ads to be exactly right every time, without me getting involved. 

So for the example above, stuff like the data in the chart should be blue. The hero number, and the “run” in the logo, is always orange. They never swap. Headlines never run to the edges. They sit at about 72% of the width, because type crammed edge to edge looks cheap. And every size ends the same way, closing on runwithfoxes.com with the logo fading as the address takes over. 

None of that is the ad. It’s the knowledge of how the ad works, taken apart and made explicit.  Once it’s written down, the machine just follows it. Every one of those decisions lives once, as a rule, in one place. The ad I feed in carries only the data, the numbers and the words. It carries nothing about the look. So the same ad in, gives the same pixels out, every time, on every size. 

> Once built, I couldn’t make it off- brand even if I tried. I’ve tried plenty. 

The other really important bit for me is this. I’ve found that the more narrow the use case the better. So this is not about making one tool or system that works for all brands. Instead, it is about making a system for just one brand, and building that brand exact details into it.  

So, build slowly and carefully first. Then you get speed. 

![](/essays/ad-versioning-in-six-seconds/04.jpeg)
