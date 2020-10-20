---
name: Thoughts on Portainenr
tags:
  - portainer
  - homelab
---

# Stacks
- docker-compose version 3 not supported, unless using multi-host swarm - https://github.com/portainer/portainer/issues/3718#issuecomment-613759898
- after stack is deployed, can't see compose file (" This stack was created outside of Portainer. Control over this stack is limited.")&mdash;even though this was created via Portainer GUI
- some environment variables lost, or maybe not visible (`GF_SECURITY_ADMIN_PASSWORD`, `INFLUXDB_ADMIN_PASSWORD`)
- since everything is running on one host, could have port conflicts
  - more of a flaw of my design, not a flaw of Portainer
