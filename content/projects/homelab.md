---
name:         Homelab
description:  Ongoing project of managing servers and services at home.
image:
  src:        /img/projects/homelab/massimo-botturi-zFYUsLk_50Y-unsplash.jpg
  alt:        Homelab
date:         "2020-02-25T00:00:00Z"
---

An ongoing project for services I run at home. I have a few Intel NUCs running [Proxmox](https://www.proxmox.com/), a few Synology NAS for persistent storage and backups, and a handful of Raspberry Pis for ad-hoc projects.

Services include:
- [Pi-Hole](https://pi-hole.net) for network-wide ad blocking and DNS resolution
- [ddclient](https://sourceforge.net/p/ddclient/wiki/Home) for dynamic DNS
- [WireGuard](https://wiki.archlinux.org/index.php/WireGuard) for VPN
- [Grafana](https://grafana.com) + [InfluxDB](https://www.influxdata.com/products/influxdb-overview) for storing and visualizing metrics
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) on every host, plus some extra SNMP metrics for Synology NASs

All of these are running as LXCs or via Docker on VMs. Everything is provisioned with [Ansible](https://www.ansible.com) so that changes are reliable and repeatable.

Future improvements include a separate VLAN for the lab, offsite backups, and improved monitoring for Docker containers.
