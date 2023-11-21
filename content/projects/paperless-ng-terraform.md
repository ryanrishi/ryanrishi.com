---
name:         paperless-ng Terraform
description:  Terraform module to set up paperless-ng on AWS.
image:
  src:        /img/projects/paperless-ng-terraform/wesley-tingey-snNHKZ-mGfE-unsplash.jpg
  alt:        A stack of books, binders, and folders
  width:      6000
  height:     4000
date:         "2023-01-22T00:00:00Z"
---

This module creates the necessary resources to run [paperless-ng](https://paperless-ng.readthedocs.io/en/latest/index.html) on AWS.

The resources managed by this module are:
- Aurora RDS (serverless, Postgres)
- ElastiCache (Redis)
- EC2
- Security groups, EBS attachments, passwords, etc. for the above

Source code available [here](https://github.com/ryanrishi/paperless-ng-terraform).
