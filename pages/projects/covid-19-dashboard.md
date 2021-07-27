---
name:         COVID-19 Dashboard
layout:       projects/default
description:  Visualize COVID-19 cases and deaths in the United States.
permalink:    /projects/covid-19-dashboard/
image:
  src:        /img/projects/covid-19-dashboard/covid-19-dashboard.png
  width:      3360
  height:     2100
date:         "2020-05-17T00:00:00Z"
---

![COVID-19 Dashboard](/img/projects/covid-19-dashboard/covid-19-dashboard.png)

I wanted to provide a way for people to visualize the impact of COVID-19 in the US over time with the [New York Times COVID-19 dataset](https://github.com/nytimes/covid-19-data). I wanted this to be public, easy-to-use, and using off-the-shelf tools. With those requirements, I decided to pipe the time-series data into InfluxDB and visualize it with Grafana.

A few notes on the underlying data:
- This data is only for the US
- States, and even counties, qualify "cases" and "deaths" differently. For example, when a resident of Florida died in Los Angeles, the NY Times recorded her death as having occurred in California rather than Florida, though officials in Florida counted her case in their own records

More details, methodology, and definitions can be found at the [New York Times COVID-19 data repository](https://github.com/nytimes/covid-19-data).

Built using [Grafana](https://grafana.com/), [InfluxDB](https://www.influxdata.com/), and [csv-to-influxdb](https://github.com/fabio-miranda/csv-to-influxdb). Data from [New York Times](https://github.com/nytimes/covid-19-data). Running on [AWS](https://aws.amazon.com/), managed by [Terraform](https://www.terraform.io/).

Source available on [Github](https://github.com/ryanrishi/covid-19-grafana).

<Callout>
  The project site is no longer live, but there are instructions on how to run the project in the source code link above.
</Callout>
