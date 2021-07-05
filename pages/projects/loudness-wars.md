---
name:         Loudness Wars
description:  A closer look at how recorded music has been getting increasingly louder over the past 50 years.
permalink:    /projects/loudness-wars
date:         "2021-06-23T00:00:00Z"
---

import LoudnessWars from '../../components/projects/loudness-wars';

# Loudness Wars

The [Loudness Wars](https://en.wikipedia.org/wiki/Loudness_war) refers to the dramatic increase in the perceived loudness of a song over the past 40 years. The loud parts haven't necessarily become louder, but instead the effecftive loudness (called the root mean square, or RMS) of recorded music has increased. This has been done by compressing the loud parts of an audio signal, and then increasing the overall loudness of the signal. The loud parts are now more or less as loud as they were before dynamic compression, but now that overall loudness has increased.

I wanted to quantify this notion that music is getting increasingly louder. I did so by scraping the year-end Billboard charts for the past 50 years, searching Spotify for those tracks, and using [Spotify's audio analysis API](https://developer.spotify.com/console/get-audio-analysis-track/) to get the loudness for each track, then visualized the data by plotting the loudness and release date for each track.

<LoudnessWars className="w-full h-full" />

Why does this matter? In short, everything being loud results in listener fatigue. It's kind of like eating the same meal every single day&mdash; you will (hopefully) get tired of eating the same thing. The same is true with our ears&mdash; if everything is loud, we get tired and nothing really sounds loud anymore.

This project utilized [Spotipy](https://github.com/plamere/spotipy) to pull information about tracks, and [d3](https://github.com/d3/d3) to visualize the data. Source code for this project is available [here](https://github.com/ryanrishi/loudness-wars).

<Callout type="info">
For some tracks, Spotify puts out a new version of the album with a new release date, but keeps the original loudness. For other tracks, Spotify puts out a remastered or deluxe version that is louder, but keeps the original release date. I've manually removed those entries, and if you come across a track that looks suspicious (eg. a Michael Jackson track from 2017), please <a href="/contact">contact me</a> to remove it. Thank you!
</Callout>

# Further Reading
If you're interested in learning more about the loudness wars, here are some good resources.
- [The Loudness Wars: Why Music Sounds Worse](https://www.npr.org/2009/12/31/122114058/the-loudness-wars-why-music-sounds-worse)
- [Dynamic Range Day](https://dynamicrangeday.co.uk/)
- [They Really Don’t Make Music Like They Used To](https://www.nytimes.com/2019/02/07/opinion/what-these-grammy-songs-tell-us-about-the-loudness-wars.html) - this article has a great visualization of the average loudness vs. the peak loudness for many songs
