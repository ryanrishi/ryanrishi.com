---
title:        Managing the Same AWS Key Pair in Multiple Terraform Workspaces
description:  Importing key pairs into a Terraform workspace can lead to some unexpected results. This post outlines the problem and provides a solution by manipulating the Terraform state.
image:        /img/Terraform-Logo.png
date:         "2020-06-01T00:00:00Z"
layout:       blog
tags:
  - terraform
  - aws
---
AWS key pairs allow you to put your SSH key on EC2 instances when the are created, allowing you to SSH into an instance with a public key instead of a password. If you have multiple [Terraform workspaces](https://www.terraform.io/docs/state/workspaces.html), eg. `staging` and `production`, using the same key pair in multiple workspaces can cause some problems.

### The Problem
Consider the following Terraform block in the `staging` workspace:
```hcl
resource "aws_key_pair" "key_pair" {
  key_name   = "ryan"
  public_key = "ssh-rsa AAAAB...."
}

resource "aws_instance" "web" {
  key_name = aws_key_pair.key_pair.key_name
  # rest of definition
}
```

If you want to use the same key pair in the `production` workspace, you might switch workspaces and import the key pair:
```shell-session
$ terraform workspace show
production
$ terraform import -var-file=production.tfvars aws_key_pair.key_pair ryan
aws_key_pair.key_pair: Importing from ID "ryan"...
aws_key_pair.key_pair: Import prepared!
  Prepared aws_key_pair for import
aws_key_pair.key_pair: Refreshing state... [id=ryan]

Import successful!

The resources that were imported are shown above. These resources are now in
your Terraform state and will henceforth be managed by Terraform.
```

This will import the key pair, but there is a problem&mdash;running `terraform plan` in the `production` workspace shows that the key pair will be recreated:
```hcl
# aws_key_pair.key_pair must be replaced
+/- resource "aws_key_pair" "key_pair" {
      ~ fingerprint = "ca:0b:36:48:39:69:86:21:8a:15:da:c2:10:f0:91:a7" -> (known after apply)
      ~ id          = "ryan" -> (known after apply)
        key_name    = "ryan"
      ~ key_pair_id = "key-0ef79e456a8daa98a" -> (known after apply)
      + public_key  = "ssh-rsa AAAAB...." # forces replacement
      - tags        = {} -> null
}
```

Notice the "forces replacement" next to the `public_key`. Running `terraform import` imported the key pair but _not_ the `public_key` for the key pair&mdash;this is because the [AWS API does not expose the public key](https://github.com/terraform-providers/terraform-provider-aws/issues/1092).

We can confirm that the Terraform state does not have the public key by running `terraform state show`:
```hcl
$ terraform state show aws_key_pair.key_pair
# aws_key_pair.key_pair:
resource "aws_key_pair" "key_pair" {
    fingerprint = "ca:0b:36:48:39:69:86:21:8a:15:da:c2:10:f0:91:a7"
    id          = "ryan"
    key_name    = "ryan"
    key_pair_id = "key-0ef79e456a8daa98a"
    tags        = {}
}
```

### The Solution
We’re going to update `terraform.tfstate` to include public key. I *do not* recommend this approach if you’re using Terraform as a team, as editing the Terraform state file by hand can lead to unexpected behaviors if a change to the infrastructure is made while you’re doing this.

```hcl
$ terraform workspace show
staging
# get the public key
$ terraform state show aws_key_pair.key_pair
# aws_key_pair.key_pair:
resource "aws_key_pair" "key_pair" {
    fingerprint = "ca:0b:36:48:39:69:86:21:8a:15:da:c2:10:f0:91:a7"
    id          = "ryan"
    key_name    = "ryan"
    key_pair_id = "key-0ef79e456a8daa98a"
    public_key  = "ssh-rsa AAAAB...."
    tags        = {}
}
```

Make a note of the `public_key` from above, and then switch to the production workspace:
```shell-session
# switch to production workspace
$ terraform workspace select production
```

#### Edit Terraform state file
The next step is to get the Terraform state file. Your mileage may vary depending on which [Terraform backend](https://www.terraform.io/docs/backends/index.html) you're using. In my case, I use the S3 backend, so I need to copy the production state file so I can edit it:
```shell-session
$ aws s3 cp s3://terraform/env:/production/terraform.tfstate production.tfstate
```

Find the resource with type `aws_key_pair` named `key_pair`. Add the public key from above to the `public_key` attribute:
```diff
{
  "mode": "managed",
  "type": "aws_key_pair",
  "name": "key_pair",
  "provider": "provider.aws",
  "instances": [
    {
      "schema_version": 1,
      "attributes": {
        "fingerprint": "ca:0b:36:48:39:69:86:21:8a:15:da:c2:10:f0:91:a7",
        "id": "ryan",
        "key_name": "ryan",
        "key_name_prefix": null,
        "key_pair_id": "key-0ef79e456a8daa98a",
-       "public_key": null
+       "public_key": "ssh-rsa AAAAB....",
        "tags": {}
      },
      "private": "eyJzY2hlbWFfdmVyc2lvbiI6IjEifQ=="
    }
  ]
}
```

Finally, we need to re-upload the state file:
```shell-session
$ aws s3 cp production.tfstate s3://terraform/env:/production/terraform.tfstate
```

To ensure the public key was added to the key pair state, we can run `terraform plan` to verify that a second key pair won’t be created:
```shell-session
$ terraform workspace show
production
$ terraform plan -var-file=production.tfvars
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

aws_key_pair.key_pair: Refreshing state... [id=ryan]
aws_vpc.vpc: Refreshing state... [id=vpc-066836488ca1736cc]
aws_internet_gateway.internet_gateway: Refreshing state... [id=igw-063ceed82c4a9575b]
aws_subnet.subnet: Refreshing state... [id=subnet-00223b10865ba9fcd]
aws_security_group.security_group: Refreshing state... [id=sg-00b43e691cb489f74]
aws_route_table.route_table: Refreshing state... [id=rtb-08856ff0b342d789d]
aws_instance.web: Refreshing state... [id=i-088d61e604d233686]
aws_route_table_association.subnet_association: Refreshing state... [id=rtbassoc-05bfaf2437b843a0c]
aws_eip.elastic_ip: Refreshing state... [id=eipalloc-09baa591c07a453a7]

------------------------------------------------------------------------

No changes. Infrastructure is up-to-date.

This means that Terraform did not detect any differences between your
configuration and real physical resources that exist. As a result, no
actions need to be performed.
```

### Conclusion
That's it! Even though importing the AWS key pair didn't import the public key, we can manipulate the Terraform state to include the public key so that the resource is not recreated.

While I went with the above solution for my use case, there are other solutions to this problem:
- set up each Terraform workspace to use different AWS accounts
- use different key pairs for each workspace, naming them like `ryan-staging` and `ryan-production`
