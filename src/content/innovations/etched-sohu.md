---
ticker: "ETC-SOHU"
title: "Sohu 3nm Transformer ASIC"
tagline: "Dedicated hardware ASIC hardwired specifically for transformer attention and inference"
domain: "Hardware & Frontier Silicon"
organization: "Etched"
country: "USA"
releaseDate: "2024-06"
impactMetric: "10x Token Throughput vs H100 GPU"
status: "Commercial Pilot"
badge: "Custom ASIC"
specs:
  "Fabrication Node": "TSMC 3nm (N3P) FinFET process"
  "Memory Subsystem": "144 GB HBM3e delivering >5.3 TB/s bandwidth"
  "Supported Models": "Transformer-based architectures (Llama, GPT, Mistral)"
  "Cluster Scale": "8x Sohu 8U server serving 500,000+ tokens/sec on Llama 3 70B"
  "Attention Engine": "Hardwired FlashAttention matrix execution cores"
  "TDP / Thermal": "~700W peak server package power dissipation"
tags:
  - "Silicon"
  - "ASIC"
  - "Transformer Hardware"
  - "High Bandwidth Memory"
  - "Inference Acceleration"
links:
  website: "https://www.etched.com"
  demoUrl: "https://www.etched.com/announcing-sohu"
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

As generative AI foundation models converged overwhelmingly onto the Transformer architecture, general-purpose graphics processing units (GPUs) began carrying immense structural overhead. GPUs dedicate massive silicon die area to hardware logic unnecessary for inference: programmable instruction schedulers, cache hierarchies for dynamic control flow, graphics ray tracing units, and FP64 scientific simulation math units.

Etched took the ultimate engineering gamble with **Sohu**: hardwiring the entire transformer computation graph—specifically the attention mechanism and matrix feed-forward layers—directly into silicon on TSMC’s cutting-edge 3nm process. By burning the transformer equations into ASIC transistors, Sohu eliminates instruction decoding overhead and maximizes arithmetic density, yielding an unprecedented 10x throughput advantage over NVIDIA H100 GPUs while consuming a fraction of the operating power.

## Hardware & Neural Architecture

Sohu is purpose-built to deliver extreme arithmetic density and ultra-high memory bandwidth for transformer inference:
- **Dedicated Transformer Core**: Unlike programmable SIMD/SIMT architectures, Sohu replaces programmable ALUs with specialized matrix multiplication engines designed exclusively for FP8, FP16, and BF16 transformer computations.
- **Hardwired FlashAttention Engine**: The self-attention matrix operations $\text{Softmax}(QK^T/\sqrt{d})V$ are executed in dedicated physical silicon pipelines, calculating attention blocks without bouncing intermediate activations back to high-bandwidth memory.
- **HBM3e Memory Pipeline**: Each Sohu accelerator integrates 144 GB of high-bandwidth memory (HBM3e), sustaining memory bandwidth exceeding 5.3 TB/s to handle enormous batch sizes and multi-hundred-thousand-token context windows.
- **Sohu 8U System Architecture**: An enterprise 8x Sohu server node fits within a standard 8U rack footprint, interconnected via direct chip-to-chip copper links that avoid expensive network switch fabrics.

## Real-World Benchmarks & Impact

Etched published verified engineering benchmarks validating the dramatic throughput leap of specialized silicon:
- **Llama 3 70B Throughput**: A single 8x Sohu server serves over **500,000 tokens per second** on Llama 3 70B—matching the throughput capacity of 160 NVIDIA H100 GPUs in an equivalent data center footprint.
- **Cost Reduction**: Yields a ~90% decrease in operational cost per million generated tokens compared to contemporary hyperscaler cloud GPU instances.
- **Real-Time Video Generation**: Enables real-time, interactive generation of continuous video streams with diffusion transformers (DiTs) like Sora and Cosmos, running inference at over 24 frames per second.

## Open-Source, Access & Future Roadmap

Etched is conducting commercial pilots with enterprise hyperscalers, frontier AI labs, and high-frequency inference providers:
- **Software Stack Compatibility**: Sohu exposes a drop-in software SDK compatible with PyTorch, Hugging Face, vLLM, and TensorRT-LLM, allowing developers to execute existing model weights without manual kernel rewriting.
- **Hyperscaler Deployment**: Tier-1 cloud providers and sovereign AI data centers are integrating Sohu nodes into production inference clusters throughout 2025 and 2026.
- **Architectural Flexibility**: While the core attention pipeline is hardwired, Sohu supports arbitrary token vocabularies, rotational position embeddings (RoPE), mixture-of-experts (MoE) routing, and variable hidden dimensions.
