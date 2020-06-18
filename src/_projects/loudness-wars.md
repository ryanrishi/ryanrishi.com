---
title:      Loudness Wars
permalink:  /projects/loudness-wars/
date:       2020-02-06
tags:
  - music
  - d3
---

<style>
  #chart > .tooltip {
    background-color: white;
  }

  #abba {
    max-width: 50%;
    margin: auto;
  }
</style>


# todo
### technical
- [x] resize / redraw
- [ ] waveform of remaster (like on [Wikipedia](https://en.wikipedia.org/wiki/Loudness_war))
- [ ] parallax?
- [ ] breakdown by genre?
- [ ] cleanup repo
- [ ] og:image

### content
- [ ] background of the loudness wars
- [ ] compression / replay gain
- [ ] throw historical data at it
- [ ] examples (using something like Spotify?)
- [ ] so what?

---
### Loudness Wars
The loudness war

### Compression

<figure id="abba">
  <img  src="https://upload.wikimedia.org/wikipedia/commons/4/4d/ABBA_-_Super_Trouper_Title_Track_Remaster_Waveform_Comparisons_%28Small_Version%29.png" />
  <figcaption>
    Different releases of ABBA's 1980 song "Super Trouper" show different levels of loudness compared to the original 1980 release.
    <br>
    <a href="https://commons.wikimedia.org/wiki/File:ABBA_-_Super_Trouper_Title_Track_Remaster_Waveform_Comparisons_(Small_Version).png" title="via Wikimedia Commons">Kosmosi</a> / <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA</a>
  </figcaption>
</figure>

- how sound is produced, eardrums pick that up
- closer look at speaker (or drumhead, guitar string, etc.)&mdash;only one position at a given time

There are three domains in a signal: time, frequency, and amplitude. [This article](https://www.sciencelearn.org.nz/resources/573-measuring-sound) does a great job demonstrating these domains. The focus of this post is amplitude, aka the _loudness_ of the sound.

<!-- We can calculate the loudness of a signal by performing a Fast Fourier Transform <sup>citation needed</sup>.
(might  be  kinda confusing saying it's only one given position _p_ for any time _t_, then show animation of multiple  signals) -->

<!-- ![Fourier transform - time and frequency domains](https://upload.wikimedia.org/wikipedia/commons/5/50/Fourier_transform_time_and_frequency_domains.gif "Fourier transform - time and frequency domains") -->

The loudness wars refers to the dramatic increase in amplitude over the past 40 years.

<p>
  <iframe src="https://open.spotify.com/embed/track/4a3kh2tnEj9zIi9LFgYWoq" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
</p>
<p>
  <iframe src="https://open.spotify.com/embed/track/1UBQ5GK8JaQjm5VbkBZY66" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
</p>
<p>
  <iframe src="https://open.spotify.com/embed/track/5Wqhh9QKqZZmLjLdFLoW04" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
</p>

- dBFS
- LUFS

<div id="chart"></div>

{% javascript loudness-wars %}

Source code for the project is available [here](https://github.com/ryanrishi/loudness-wars).

### Sources
- Audio analysis from [EchoNest](http://the.echonest.com/) (now available via [Spotify's API](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/))
- Billboard chart data scraped from [Top 100 Songs of the Year](http://www.bobborst.com/popculture/top-100-songs-of-the-year)

### Further Reading
Here are some more resources I found helpful in learning about the loudness wars:
- [Dynamic Range Day - What is the Loudness Wars?](https://dynamicrangeday.co.uk/about/)
- [Learn Web Audio from the Ground Up, Part 3: Controlling Amplitude and Loudness](https://teropa.info/blog/2016/08/30/amplitude-and-loudness.html)
- [How Does Spotify Calculate Loudness?](https://artists.spotify.com/faq/mastering-and-loudness#how-does-spotify-calculate-loudness)
- [The Loudness Wars: Why Music Sounds Worse](https://www.npr.org/2009/12/31/122114058/the-loudness-wars-why-music-sounds-worse)

{% javascript loudness-wars %}
