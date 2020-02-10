---
layout: post-max-width-1200
title:  Loudness Wars
description:  TBD
image:        /assets/img/tbd.png
date:         2020-02-06
tags:
  - music
  - d3
---

<style>
  #chart > .tooltip {
    background-color: white;
  }
</style>

<div id="chart"></div>

{% javascript loudness-wars %}

Source code for the project is available [here](https://github.com/ryanrishi/loudness-wars).

### Sources
- Audio analysis from [EchoNest](http://the.echonest.com/) (now available via [Spotify's API](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/))
- Billboard chart data scraped from [Top 100 Songs of the Year](http://www.bobborst.com/popculture/top-100-songs-of-the-year)

### Resources
Here are some more resources I found helpful in learning about the loudness wars:
- [Dynamic Range Day - What is the Loudness Wars?](https://dynamicrangeday.co.uk/about/)
- [Learn Web Audio from the Ground Up, Part 3: Controlling Amplitude and Loudness](https://teropa.info/blog/2016/08/30/amplitude-and-loudness.html)
- [How Does Spotify Calculate Loudness?](https://artists.spotify.com/faq/mastering-and-loudness#how-does-spotify-calculate-loudness)
