---
ticker: "OPNM"
name: "OpenMeter"
batch: "W24"
tagline: "Real-time usage-based billing infrastructure and event metering for AI products"
logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&auto=format&fit=crop&q=80"
website: "https://openmeter.io"
careersUrl: "https://openmeter.io/careers"
demoUrl: "https://openmeter.io/docs"
stage: "Seed"
totalRaised: "$3M"
sectors:
  - "DevTools"
  - "FinTech"
  - "Infrastructure"
location:
  city: "San Francisco"
  state: "CA"
  country: "USA"
founders:
  - "Peter Marton"
  - "Szilard Gabor Szilagyi"
hiring: true
openRolesCount: 4
techStack:
  - "Go"
  - "Apache Kafka"
  - "ClickHouse"
  - "OpenTelemetry"
  - "PostgreSQL"
  - "Docker"
badge: "Top Seed"
---

## Problem
Generative AI applications, developer platforms, and cloud infrastructure companies are moving rapidly from flat monthly SaaS seat subscriptions to usage-based and hybrid consumption billing models (e.g., token usage, GPU minutes, API invocations, and vector storage). However, building an in-house real-time metering engine capable of ingesting millions of events per second with zero data loss, sub-millisecond customer balance checks, and Stripe synchronization requires months of complex distributed systems engineering.

## Solution & Innovation
OpenMeter is an open-source, real-time usage metering and billing engine built for the AI and cloud infrastructure ecosystem. It provides high-throughput event ingestion, real-time aggregation, and instant entitlement enforcement (e.g. cutting off or throttling requests when a customer's prepaid balance runs out). OpenMeter seamlessly bridges developer infrastructure with finance stacks, connecting streaming event collectors to payment gateways like Stripe and customer billing dashboards.

## Technology & Architecture
OpenMeter's architecture is engineered to handle extreme event throughput while maintaining strict financial auditability:
- **Cloud-Native Ingestion**: Built in Go on top of Apache Kafka and ClickHouse to ingest and aggregate hundreds of thousands of events per second per node with sub-second latency.
- **Real-Time Entitlement Checks**: Redis-backed low-latency cache layer allowing API gateways to verify customer credits and rate limits without incurring database bottlenecks.
- **Open-Source Standards**: Native support for CloudEvents and OpenTelemetry standards, allowing teams to emit billing events directly from standard telemetry pipelines.

## Team & YC Journey
Co-founders Peter Marton and Szilard Gabor Szilagyi bring a decade of experience building developer tools, observability systems, and open-source infrastructure (having previously worked at RisingStack and Auth0). Participating in Y Combinator's W24 batch, OpenMeter raised $3M in Seed capital led by YC and prominent open-source enterprise angels, establishing itself as the go-to standard for AI consumption monetization.
