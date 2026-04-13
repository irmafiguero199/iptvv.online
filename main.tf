# ═══════════════════════════════════════════════════════════
# NorthStream IPTV Canada — Google Cloud Terraform Config
# Infrastructure: Cloud Run + Cloud CDN + Load Balancer + SSL
# ═══════════════════════════════════════════════════════════

terraform {
  required_version = ">= 1.5"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
  backend "gcs" {
    bucket = "northstream-terraform-state"
    prefix = "prod/state"
  }
}

# ── VARIABLES ──────────────────────────────────────────────
variable "project_id" {
  description = "GCP Project ID"
  type        = string
  default     = "northstream-iptv-canada"
}

variable "region" {
  description = "Primary GCP region (Canada)"
  type        = string
  default     = "northamerica-northeast1"  # Toronto
}

variable "region_secondary" {
  description = "Secondary GCP region for redundancy"
  type        = string
  default     = "northamerica-northeast2"  # Montreal
}

variable "domain" {
  description = "Your domain"
  type        = string
  default     = "northstreamiptv.ca"
}

variable "image_tag" {
  description = "Docker image tag to deploy"
  type        = string
  default     = "latest"
}

# ── PROVIDER ───────────────────────────────────────────────
provider "google" {
  project = var.project_id
  region  = var.region
}

# ── ENABLE APIS ────────────────────────────────────────────
resource "google_project_service" "apis" {
  for_each = toset([
    "run.googleapis.com",
    "compute.googleapis.com",
    "certificatemanager.googleapis.com",
    "dns.googleapis.com",
    "secretmanager.googleapis.com",
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",
    "monitoring.googleapis.com",
    "logging.googleapis.com",
  ])
  service            = each.key
  disable_on_destroy = false
}

# ── ARTIFACT REGISTRY (Docker images) ─────────────────────
resource "google_artifact_registry_repository" "northstream" {
  location      = var.region
  repository_id = "northstream-iptv"
  format        = "DOCKER"
  description   = "NorthStream IPTV Docker images"

  depends_on = [google_project_service.apis]
}

# ── CLOUD RUN — PRIMARY (Toronto) ─────────────────────────
resource "google_cloud_run_v2_service" "northstream_primary" {
  name     = "northstream-iptv-primary"
  location = var.region

  template {
    scaling {
      min_instance_count = 1   # Always warm — no cold starts
      max_instance_count = 20  # Scale for Canadian traffic peaks
    }

    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/northstream-iptv/web:${var.image_tag}"

      resources {
        limits = {
          cpu    = "2"
          memory = "2Gi"
        }
        cpu_idle = false  # CPU always allocated — better TTFB
      }

      ports {
        container_port = 8080
      }

      # Performance-critical env vars
      env {
        name  = "NODE_ENV"
        value = "production"
      }
      env {
        name  = "PORT"
        value = "8080"
      }

      # Startup probe (faster cold start detection)
      startup_probe {
        http_get {
          path = "/health"
          port = 8080
        }
        initial_delay_seconds = 5
        period_seconds        = 3
        failure_threshold     = 5
      }

      # Liveness probe
      liveness_probe {
        http_get {
          path = "/health"
          port = 8080
        }
        period_seconds    = 30
        failure_threshold = 3
      }
    }

    # Max request timeout (streaming content)
    timeout = "60s"
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  depends_on = [google_project_service.apis]
}

# ── CLOUD RUN — SECONDARY (Montreal — Québec users) ───────
resource "google_cloud_run_v2_service" "northstream_secondary" {
  name     = "northstream-iptv-secondary"
  location = var.region_secondary  # Montreal

  template {
    scaling {
      min_instance_count = 1
      max_instance_count = 10
    }

    containers {
      image = "northamerica-northeast1-docker.pkg.dev/${var.project_id}/northstream-iptv/web:${var.image_tag}"

      resources {
        limits = {
          cpu    = "2"
          memory = "2Gi"
        }
        cpu_idle = false
      }

      ports { container_port = 8080 }

      env {
        name  = "NODE_ENV"
        value = "production"
      }
      env {
        name  = "PORT"
        value = "8080"
      }
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  depends_on = [google_project_service.apis]
}

# ── PUBLIC ACCESS (unauthenticated) ───────────────────────
resource "google_cloud_run_service_iam_member" "public_primary" {
  location = google_cloud_run_v2_service.northstream_primary.location
  service  = google_cloud_run_v2_service.northstream_primary.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_service_iam_member" "public_secondary" {
  location = google_cloud_run_v2_service.northstream_secondary.location
  service  = google_cloud_run_v2_service.northstream_secondary.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# ── NETWORK ENDPOINT GROUPS (Cloud Run → LB) ──────────────
resource "google_compute_region_network_endpoint_group" "neg_primary" {
  name                  = "northstream-neg-toronto"
  network_endpoint_type = "SERVERLESS"
  region                = var.region

  cloud_run {
    service = google_cloud_run_v2_service.northstream_primary.name
  }
}

resource "google_compute_region_network_endpoint_group" "neg_secondary" {
  name                  = "northstream-neg-montreal"
  network_endpoint_type = "SERVERLESS"
  region                = var.region_secondary

  cloud_run {
    service = google_cloud_run_v2_service.northstream_secondary.name
  }
}

# ── BACKEND SERVICE (with Cloud CDN) ──────────────────────
resource "google_compute_backend_service" "northstream" {
  name                  = "northstream-backend"
  protocol              = "HTTPS"
  port_name             = "https"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  timeout_sec           = 30

  # Cloud CDN — critical for fast TTFB across Canada
  enable_cdn = true
  cdn_policy {
    cache_mode                   = "CACHE_ALL_STATIC"
    client_ttl                   = 86400    # 1 day for static
    default_ttl                  = 3600     # 1 hour default
    max_ttl                      = 604800   # 1 week max
    negative_caching             = true
    serve_while_stale            = 86400
    
    cache_key_policy {
      include_host         = true
      include_protocol     = true
      include_query_string = false  # Don't cache query strings separately
    }
  }

  backend {
    group = google_compute_region_network_endpoint_group.neg_primary.id
  }

  backend {
    group           = google_compute_region_network_endpoint_group.neg_secondary.id
    capacity_scaler = 0.5  # Secondary handles overflow
  }

  # Logging for SEO/analytics
  log_config {
    enable      = true
    sample_rate = 0.1  # 10% sampling — sufficient for analytics
  }
}

# ── SSL CERTIFICATE (managed by Google) ───────────────────
resource "google_compute_managed_ssl_certificate" "northstream" {
  name = "northstream-ssl-cert"

  managed {
    domains = [
      var.domain,
      "www.${var.domain}",
    ]
  }
}

# ── GLOBAL LOAD BALANCER ──────────────────────────────────
resource "google_compute_global_address" "northstream" {
  name = "northstream-global-ip"
}

resource "google_compute_url_map" "northstream" {
  name            = "northstream-url-map"
  default_service = google_compute_backend_service.northstream.id

  # WWW redirect to apex
  host_rule {
    hosts        = ["www.${var.domain}"]
    path_matcher = "www-redirect"
  }

  path_matcher {
    name            = "www-redirect"
    default_service = google_compute_backend_service.northstream.id
  }
}

# HTTP → HTTPS redirect
resource "google_compute_url_map" "https_redirect" {
  name = "northstream-https-redirect"

  default_url_redirect {
    https_redirect         = true
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
    strip_query            = false
  }
}

resource "google_compute_target_https_proxy" "northstream" {
  name             = "northstream-https-proxy"
  url_map          = google_compute_url_map.northstream.id
  ssl_certificates = [google_compute_managed_ssl_certificate.northstream.id]

  # QUIC — faster for Canadian mobile users
  quic_override = "ENABLE"
}

resource "google_compute_target_http_proxy" "northstream_redirect" {
  name    = "northstream-http-redirect"
  url_map = google_compute_url_map.https_redirect.id
}

resource "google_compute_global_forwarding_rule" "https" {
  name                  = "northstream-https-forwarding"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "443"
  target                = google_compute_target_https_proxy.northstream.id
  ip_address            = google_compute_global_address.northstream.id
}

resource "google_compute_global_forwarding_rule" "http_redirect" {
  name                  = "northstream-http-redirect"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "80"
  target                = google_compute_target_http_proxy.northstream_redirect.id
  ip_address            = google_compute_global_address.northstream.id
}

# ── DNS (Cloud DNS) ───────────────────────────────────────
resource "google_dns_managed_zone" "northstream" {
  name     = "northstream-zone"
  dns_name = "${var.domain}."
}

resource "google_dns_record_set" "apex" {
  name         = "${var.domain}."
  managed_zone = google_dns_managed_zone.northstream.name
  type         = "A"
  ttl          = 300
  rrdatas      = [google_compute_global_address.northstream.address]
}

resource "google_dns_record_set" "www" {
  name         = "www.${var.domain}."
  managed_zone = google_dns_managed_zone.northstream.name
  type         = "CNAME"
  ttl          = 300
  rrdatas      = ["${var.domain}."]
}

# ── OUTPUTS ───────────────────────────────────────────────
output "load_balancer_ip" {
  value       = google_compute_global_address.northstream.address
  description = "Point your domain A record to this IP"
}

output "primary_cloud_run_url" {
  value = google_cloud_run_v2_service.northstream_primary.uri
}

output "secondary_cloud_run_url" {
  value = google_cloud_run_v2_service.northstream_secondary.uri
}
