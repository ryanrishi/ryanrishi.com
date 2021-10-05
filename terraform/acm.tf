resource "aws_acm_certificate" "certificate" {
  domain_name               = var.root_domain_name
  validation_method         = "DNS"
  subject_alternative_names = ["*.${var.root_domain_name}"]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "certificate_validation" {
  certificate_arn = aws_acm_certificate.certificate.arn
  validation_record_fqdns = [
    aws_route53_record.www.fqdn,
    aws_route53_record.dns_a.fqdn,
    aws_route53_record.labs.fqdn,
  ]
}
