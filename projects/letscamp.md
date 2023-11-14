---
name:         Letscamp
layout:       projects/default
description:  I wrote a bot that texts me when a Yosemite reservation I'm interested in becomes available.
image:
  src:        /img/projects/letscamp/scott-goodwill-y8Ngwq34_Ak-unsplash.jpg
  alt:        A tent
  width:      4498
  height:     3000
permalink:    /projects/letscamp/
date:         "2021-03-18T00:00:00Z"
---

I built a bot that scrapes [recreation.gov](https://www.recreation.gov/) for campsite available for dates I've input. When it finds a campsite availability, it texts me so that I can hop online to book it. This project is 50% a pet project to play around with Python and related tech and 50% "hey, this is actually kinda useful".

This project started as a [fork of bri-bri/yosemite-camping](https://github.com/ryanrishi/yosemite-camping) running on a VPS with a cron job, but over the years has evolved into a more robust application that allows me to:
- add campsites outside of Yosemite
- add desired reservations via a CLI
- use [recreation.gov's new RIDB API](https://ridb.recreation.gov/docs) (the old one is no longer supported), using an [OpenAPI](https://github.com/OpenAPITools/openapi-generator)-generated Python client
- use built-in scheduling

Future improvements include:
- automatically booking a reservation when a campsite becomes available
- better scaling&mdash; separating the config management, the scraper, and the notification system
- Dockerizing it
- better handling around rate limiting for the RIDB API

Source code available [upon request](/contact). Built using Python, Selenium, SQLite, and Twilio.
