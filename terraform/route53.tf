resource "aws_route53_zone" "zone" {
  name = var.root_domain_name
}

resource "aws_route53_zone" "ccag119_info_zone" {
  name = "ccag119.info"
}

resource "aws_route53_record" "ccag119_info_ns" {
  name    = "ccag119.info"
  zone_id = aws_route53_zone.ccag119_info_zone.zone_id
  type    = "NS"
  ttl     = 60

  records = [
    "abby.ns.cloudflare.com.",
    "carter.ns.cloudflare.com."
  ]
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

resource "aws_route53_record" "dns_a" {
  zone_id = aws_route53_zone.zone.zone_id
  name    = local.domain_name
  type    = "A"
  ttl     = 300
  records = ["76.76.21.21"]
}

resource "aws_route53_record" "labs" {
  zone_id = aws_route53_zone.zone.zone_id
  name    = "labs.${local.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.labs.domain_name
    zone_id                = aws_cloudfront_distribution.labs.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "mx-gsuite" {
  zone_id = aws_route53_zone.zone.zone_id
  name    = var.root_domain_name
  type    = "MX"
  ttl     = 60

  records = [
    "1 aspmx.l.google.com",
    "5 alt1.aspmx.l.google.com",
    "5 alt2.aspmx.l.google.com",
    "10 alt3.aspmx.l.google.com",
    "10 alt4.aspmx.l.google.com",
  ]
}

resource "aws_route53_record" "ns" {
  name    = "ryanrishi.com"
  ttl     = 60
  type    = "NS"
  zone_id = aws_route53_zone.zone.zone_id

  records = [
    "${aws_route53_zone.zone.name_servers.0}.",
    "${aws_route53_zone.zone.name_servers.1}.",
    "${aws_route53_zone.zone.name_servers.2}.",
    "${aws_route53_zone.zone.name_servers.3}."
  ]
}

resource "aws_route53_record" "spf" {
  name    = var.root_domain_name
  type    = "SPF"
  ttl     = 300
  zone_id = aws_route53_zone.zone.zone_id

  records = [
    "v=spf1 include:_spf.google.com ~all"
  ]
}

resource "aws_route53_record" "spf_txt" {
  name    = var.root_domain_name
  type    = "TXT"
  ttl     = 300
  zone_id = aws_route53_zone.zone.zone_id

  records = [
    "v=spf1 include:_spf.google.com ~all"
  ]
}

resource "aws_route53_record" "dkim_txt" {
  name = "google._domainkey"
  type = "TXT"
  ttl = 300
  zone_id = aws_route53_zone.zone.zone_id

  records = [
"v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkhm9FqvwwlTht5WXKID63gbqyUT7Hy6Klx9rGLA4h2Jf0CdbqjLoAg0apdtNOaL58BdSv3H5gRklzjJ2zWTnlvrs+nPr966Ldoubd77YkJBn4yvHRcTVg2vvyWV4JpLaPfGzHESMg/u4UEP4PnyVLXDg93a6xlAIwCGMhiwff4nB/FtsNv1SzXAEF5RX9w\"\"VoAUnfHeNnTyyjx4Rr6tpixB9vWYuSpU29zbUMXTDAC5JFCVMFvrz6pca1qJO5lGUHZMko5PB44rYP9PFHz0RStPtbNPrCSGHN76yMRjz70zuE9F8ueYaYCnctuPqnKNO9Zuw8o8gqKqtLAgBNmJ5FdQIDAQAB"
  ]
}
