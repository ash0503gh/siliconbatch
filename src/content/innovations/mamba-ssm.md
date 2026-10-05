---
ticker: "MAMBA-2"
title: "Mamba-2 State Space Duality (SSD)"
tagline: "Linear-time attention alternative unifying structured state space models with fast structured matrix multiplications"
domain: "AI Foundation Models"
organization: "State Spaces Research"
releaseDate: "2024-05"
impactMetric: "8x Training Throughput vs Attention on Long Telemetry"
status: "Open Weights"
badge: "Open Weights"
specs:
  "Algorithmic Formulation": "State Space Duality (SSD) mapping SSMs to 1-semiseparable matrix transformations"
  "Complexity Scaling": "O(N) linear time and memory complexity with respect to sequence length"
  "Hardware Utilization": "Block-diagonal matrix multiplication mapped directly onto Tensor Cores"
  "Throughput Speedup": "Up to 8x faster training than standard FlashAttention-2 on long sequences"
  "Target Domains": "High-frequency robotic sensor telemetry, DNA sequences, audio, long-context LLMs"
  "License": "Apache 2.0 Open Source"
tags:
  - "State Space Models"
  - "Mamba"
  - "Linear Attention"
  - "Sequence Modeling"
  - "Physical Telemetry"
links:
  paperUrl: "https://arxiv.org/abs/2405.21060"
  githubUrl: "https://github.com/state-spaces/mamba"
image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

For over seven years, the Transformer’s attention mechanism dominated machine learning. However, standard self-attention has a critical weakness: quadratic computational and memory scaling $O(N^2)$ with respect to sequence length. In physical AI applications—such as continuous 1,000 Hz robotic torque telemetry, multi-channel EEG monitoring, autonomous vehicle sensor logs, and raw audio processing—context lengths easily stretch to millions of tokens, causing GPUs to run out of memory or slow to a crawl.

Developed by Tri Dao and Albert Gu, **Mamba-2** introduces the theoretical framework of **State Space Duality (SSD)**. Mamba-2 proves an exact mathematical equivalence between continuous-time structured state space models (SSMs) and structured matrix multiplication (specifically 1-semiseparable matrices). This mathematical unification allows SSMs to be computed using highly optimized block matrix multiplication algorithms directly on GPU Tensor Cores, delivering true linear $O(N)$ scaling while training up to 8x faster than FlashAttention-2.

## Hardware & Neural Architecture

Mamba-2 redesigns the sequence modeling layer to maximize hardware arithmetic intensity and memory efficiency:
- **State Space Duality (SSD) Layer**: Formulates the selective SSM recurrence as a structured masked matrix multiplication $Y = (M \circ (C B^T)) X$. This formulation transforms sequential recurrence into dense block matrix operations that execute efficiently inside SRAM.
- **Hardware-Aligned Tensor Core Execution**: Unlike Mamba-1 which required complex custom scan kernels that underutilized GPU matrix multiplication units, Mamba-2 executes primarily via Tensor Core matrix multiply (GEMM) primitives, maximizing FLOP utilization on NVIDIA Hopper and Blackwell architectures.
- **Constant Memory Footprint**: During autoregressive inference, Mamba-2 maintains a fixed-size recurrent state vector regardless of whether the context has processed 1,000 tokens or 1,000,000 tokens, eliminating the unbounded memory explosion of Transformer KV caches.
- **Multi-Head State Spaces (MHAM)**: Introduces multi-head state dimensions analogous to multi-head attention, enabling separate channels to specialize in disparate sensory frequencies (e.g., low-frequency GPS trajectories vs. high-frequency IMU vibrations).

## Real-World Benchmarks & Impact

Mamba-2 established new Pareto frontiers across natural language processing, genomics, and robotics telemetry:
- **Training Throughput**: Achieved up to **8x faster training throughput** than FlashAttention-2 on long sequences (16k to 32k+ tokens) on 8x H100 GPU clusters.
- **Extrapolation to Infinite Contexts**: Models trained on 4k-token sequences demonstrated zero-shot perplexity stability when evaluated on sequences extending past 1,000,000 tokens without performance degradation.
- **High-Rate Physical AI Telemetry**: Adopted as the primary sequence backbone for processing continuous high-rate robotic sensor streams, autonomous drone state estimation, and seismic sensor networks where quadratic attention is computationally infeasible.

## Open-Source, Access & Future Roadmap

The Mamba-2 codebase, paper, and pre-trained checkpoints are fully open-sourced for the global machine learning ecosystem:
- **Open-Source Repository**: Released under the Apache 2.0 license on GitHub, including PyTorch layers, Triton kernels, and pre-training configurations.
- **Hybrid Transformer-Mamba Architectures**: Major open-weights models (such as Jamba, Nemotron, and Zamba) have adopted hybrid architectures that interleave Mamba-2 layers with Transformer attention, achieving the latency advantages of SSMs with the in-context recall of transformers.
- **Edge Deployment**: Compiling Mamba-2 checkpoints to edge silicon (Apple Neural Engine, Qualcomm Hexagon, and RISC-V accelerators) to unlock low-power on-device continuous sequence modeling.
