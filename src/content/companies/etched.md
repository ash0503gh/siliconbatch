---
ticker: "ETCH"
name: "Etched"
batch: "S24"
tagline: "Specialized Transformer ASICs delivering 10x-100x compute efficiency over general GPUs"
logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80"
website: "https://etched.com"
careersUrl: "https://etched.com/careers"
demoUrl: "https://etched.com/sohu"
stage: "Series A"
totalRaised: "$120M"
sectors:
  - "AI"
  - "Hardware"
  - "Semiconductors"
location:
  city: "Cupertino"
  state: "CA"
  country: "USA"
founders:
  - "Gavin Uberti"
  - "Robert Wachen"
hiring: true
openRolesCount: 14
techStack:
  - "Sohu ASIC"
  - "TSMC 4nm"
  - "SystemVerilog"
  - "PyTorch"
  - "LLVM"
  - "C++"
badge: "Breakthrough"
---

## Problem
Modern large language models and generative foundation architectures are severely bottlenecked by memory bandwidth, thermal power limits, and the architectural overhead of general-purpose graphics processing units. While GPUs excel at versatile parallel math across scientific computing and graphics, running production transformer inference on traditional GPU clusters introduces massive silicon underutilization, extreme electrical power consumption, and prohibitive capital expenditures for frontier AI labs.

## Solution & Innovation
Etched developed **Sohu**, the world's first application-specific integrated circuit (ASIC) hardwired strictly for transformer architectures. By burning the transformer algorithm directly into silicon circuitry, Sohu strips away legacy compute units, generic scheduling overhead, and unused instruction decoders. A single 8x Sohu server replacement delivers throughput equivalent to dozens of legacy H100 nodes at a fraction of the thermal power, processing over 500,000 tokens per second on Llama-3 70B models.

## Technology & Architecture
Sohu is fabricated on TSMC's 4nm process and engineered from the ground up for extreme transformer inference efficiency:
- **Hardwired Attention Datapaths**: Matrix multiply-accumulate engines and scaled dot-product attention are implemented directly in dedicated silicon, achieving near 100% FLOPS utilization.
- **Ultra-High Memory Bandwidth**: Tight co-packaging with HBM3e high-bandwidth memory eliminates memory stalls during autoregressive token generation and large KV cache reads.
- **Zero-Overhead Compiler Pipeline**: The Etched compiler ingests standard PyTorch and ONNX computational graphs, mapping model weights and token streams directly onto Sohu's spatial array.

## Team & YC Journey
Founded by Gavin Uberti and Robert Wachen after leaving Harvard, Etched backed their conviction that transformers represent the foundational computing primitive of the next half-century. Backed by Y Combinator's S24 batch and seasoned semiconductor veterans, Etched raised a $120M Series A led by Primary Venture Partners and Positive Sum with participation from prominent angel investors, establishing their headquarters in Cupertino, California.
