---
name:       Homelab
layout:     default
blurb:      Ongoing project of managing servers and services at home.
permalink:  /projects/homelab/
date:       2020-02-25
---

# Homelab

An ongoing project for services I run at home. Services include [ddclient](https://sourceforge.net/p/ddclient/wiki/Home/), [Wireguard](https://wiki.archlinux.org/index.php/WireGuard), [Pi-Hole](https://pi-hole.net/), a Synology NAS with some NFS shares, and [Grafana](https://grafana.com/)/[Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)/[InfluxDB](https://www.influxdata.com/products/influxdb-overview/) to monitor it all. Everything is provisioned via [Ansible](https://www.ansible.com/).

As of June 2020, I'm in the process of migrating services from a handful Raspberry Pis to an Intel NUC, with everything in Docker containers running on Proxmox VMs. Future improvements include a separate VLAN for the lab, offsite backups, and improved monitoring for Docker containers.