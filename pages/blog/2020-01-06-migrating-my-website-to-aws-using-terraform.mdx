---
title:        Migrating My Website to AWS Using Terraform
description:  I recently migrated my personal website infrastructure from a VPS to AWS S3 + CloudFront, with infrastructure managed by Terraform.
image:        /img/waterfall-cdn.png
date:         "2020-01-06T00:00:00Z"
layout:       blog
tags:
  - terraform
  - aws
  - cloudfront
  - s3
  - jekylll
  - travis
---

import Image from 'next/image';

I recently migrated my personal website hosting from a [DigitalOcean VPS](https://www.digitalocean.com/products/droplets/) to [Amazon AWS S3 + CloudFront](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/). As part of this, I wanted to use [Terraform](https://www.terraform.io/) to manage infrastructure-as-code.

# Requirements
My website is built using [Jekyll](https://jekyllrb.com/). Jekyll is a static site generator, which makes it a perfect candidate to serve from a CDN such as CloudFront. In addition to CloudFront, I would need to store the site in S3, update my DNS to point to CloudFront, and generate a TLS certificate that CloudFront can use.

# Building Out the Infrastructure
I had played with Terraform a few months ago, and wanted to try it out in a real-world situation. I followed [this tutorial](https://medium.com/runatlantis/hosting-our-static-site-over-ssl-with-s3-acm-cloudfront-and-terraform-513b799aec0f) to write the Terraform code needed to accomplish this task.

## S3 Bucket
The generated static site needs to be stored somewhere. S3 is an object storage service designed with 99.999999999% (11 9’s) of data durability and relatively cheap prices.

The Terraform code blow creates a S3 bucket that allows anyone to read objects from the bucket:
```hcl
resource "aws_s3_bucket" "www" {
  bucket = var.www_domain_name
  acl    = "public-read"
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AddPerm",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::${var.www_domain_name}/*"]
    }
  ]
}
POLICY

  website {
    index_document = "index.html"
    error_document = "404.html"
  }
}
```

## ACM Certificate
To serve my website over HTTPS, I need a TLS certificate for my domain. [AWS ACM](https://aws.amazon.com/certificate-manager/) provides free public TLS certificates.
```hcl
resource "aws_acm_certificate" "certificate" {
  domain_name               = "*.${var.root_domain_name}"
  validation_method         = "EMAIL"
  subject_alternative_names = [var.www_domain_name]
}
```

## CloudFront CDN
A CDN caches content at the edges of a network, which helps reduce load on the origin server and reduce and latency due to geographic location. When somebody visits my website, the CDN checks if has the file they are requesting, and if not, will fetch it from the S3 bucket.
```hcl
resource "aws_cloudfront_distribution" "www_distribution" {
  origin {
    domain_name = aws_s3_bucket.www.website_endpoint
    origin_id   = var.www_domain_name

    custom_origin_config {
      http_port               = "80"
      https_port              = "443"
      origin_protocol_policy  = "http-only"
      origin_ssl_protocols    = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    viewer_protocol_policy  = "redirect-to-https"
    compress                = true
    allowed_methods         = ["GET", "HEAD"]
    cached_methods          = ["GET", "HEAD"]
    target_origin_id        = var.www_domain_name
    min_ttl                 = 0
    default_ttl             = 86400
    max_ttl                 = 31536000

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  aliases = [var.www_domain_name]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.certificate.arn
    ssl_support_method  = "sni-only"
  }
}
```

## Domain Name
I use [Google Domains](https://domains.google/) as my DNS provider. In order to route traffic from `www.ryanrishi.com` to the CloudFront distribution, I created a [AWS Route 53](https://aws.amazon.com/route53/) zone and record:
```hcl
resource "aws_route53_zone" "zone" {
  name = var.root_domain_name
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.zone.zone_id
  name    = var.www_domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.www_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
```

While DNS propagates, I can get the AWS nameservers from the Terraform state so I can configure Google Domains:
```hcl
$ terraform state show aws_route53_zone.zone
# aws_route53_zone.zone:
resource "aws_route53_zone" "zone" {
    comment       = "Managed by Terraform"
    force_destroy = false
    id            = "Z1ETY..."
    name          = "ryanrishi.com."
    name_servers  = [
        "ns-1188.awsdns-20.org",
        "ns-161.awsdns-20.com",
        "ns-1993.awsdns-57.co.uk",
        "ns-689.awsdns-22.net",
    ]
    tags          = {}
    zone_id       = "Z1ETY..."
}
```

# Deploying the Website
The final step is to deploy the website to the S3 bucket. I use [Travis CI](https://travis-ci.org/) to build and deploy my code.

This snippet of code will deploy to the preconfigured S3 bucket whenever a change is pushed to my `master` branch:
```yaml
deploy:
  provider: s3
  skip_cleanup: true
  access_key_id: $AWS_ACCESS_KEY_ID
  secret_access_key: $AWS_SECRET_ACCESS_KEY
  bucket: $S3_BUCKET
  local-dir: _site
  acl: public_read
  on:
    repo: ryanrishi/website
    branch: master
```

After deploying, I want to invalidate the CloudFront cache. If I skipped this step, changes to my website may not show up for 24 hours because the `default_ttl` for the CloudFront distribution is set to 86400 seconds.
```yaml
after_deploy:
  - aws configure set preview.cloudfront true
  - aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
```

You can see the full Travis CI configuration [here](https://github.com/ryanrishi/website/commit/fcc70801ece6d09b494f6026476213696eb59e65#diff-354f30a63fb0907d4ad57269548329e3).

# Benchmark
Moving from my own VPS in New York to a CDN shaved the load time from 1.2s to 200ms. Visitors in California used to have higher latency due to cross-country travel, but now that it is served via a CDN, geographic location plays a much smaller factor&mdash;the content will be served from the closest edge of the network topology.

<figure className="image">
  <Image src="/img/waterfall-vps.png" alt="Waterfall VPS" height="2100" width="3360" />
  <figcaption>Waterfall when serving over VPS</figcaption>
</figure>

<figure className="image">
  <Image src="/img/waterfall-cdn.png" alt="Waterfall CDN" height="2100" width="3360" />
  <figcaption>Waterfall when serving over CDN</figcaption>
</figure>

# Next Steps
I'm currently running `terraform apply` on my laptop&mdash; I'd rather run that in a continuous integration pipeline.

Using Terraform was challenging at first, but in the end it seems like a great way to track infrastructure changes. I'd like to continue learning how to manage infrastructure using Terraform, including migrating some other VPSs to EC2/Kubernetes.

You can see the final Terraform code [here](https://github.com/ryanrishi/devops/tree/f858d1448d5105df3a231c91fc60882b82d4d05a).
