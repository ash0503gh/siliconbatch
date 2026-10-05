---
ticker: "TT-BHL"
title: "Blackhole Standalone RISC-V AI Processor"
tagline: "High-density RISC-V compute tile architecture combining AI acceleration with general host CPU execution"
domain: "Hardware & Frontier Silicon"
organization: "Tenstorrent"
country: "Canada / USA"
releaseDate: "2024-11"
impactMetric: "1 PFLOPS FP8 & 790 TOPs Standalone Compute"
status: "Commercial Pilot"
badge: "Open Architecture"
specs:
  "Compute Cores": "140 Tensix AI cores + 16 SiFive RISC-V 64-bit application host cores"
  "Peak Performance": "~1 PFLOPS (FP8) / 790 TOPs (INT8)"
  "Network Interconnect": "10x 100GbE integrated optical/copper Ethernet ports on-die"
  "Memory System": "32 GB GDDR6 @ 512 GB/s memory bandwidth"
  "Process Technology": "TSMC 6nm high-efficiency node"
  "Host Independence": "Full standalone bootable system without external x86 host CPU"
tags:
  - "RISC-V"
  - "Tenstorrent"
  - "Jim Keller"
  - "AI Accelerators"
  - "Heterogeneous Compute"
links:
  website: "https://tenstorrent.com"
  githubUrl: "https://github.com/tenstorrent"
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

Tenstorrent, led by legendary microprocessor architect Jim Keller, engineered **Blackhole** to solve one of the most stubborn inefficiencies in modern AI clusters: the parasitic dependence on expensive external host CPUs. In typical AI servers, banks of expensive x86 processors are required merely to feed data to accelerators, manage PCIe pipelines, and run the operating system.

Blackhole is a standalone, bootable AI processor built entirely on the open RISC-V instruction set architecture. It integrates 140 proprietary Tensix AI processing cores with 16 high-performance 64-bit SiFive RISC-V application cores and 10 on-die 100Gb Ethernet interfaces. A Blackhole processor can directly boot standard Linux, manage its own networking stack, and execute complex AI training and inference workflows with zero reliance on external x86 or ARM host processors.

## Hardware & Neural Architecture

Blackhole combines modular heterogeneous compute tiles with a scalable 2D torus network-on-chip:
- **Tensix AI Cores**: 140 Tensix cores optimized for dense and sparse tensor contractions. Each Tensix core contains dedicated matrix and vector execution units, high-speed local SRAM scratchpads, and custom RISC-V baby controllers for fine-grained execution flow.
- **Onboard Host CPU Subsystem**: 16 SiFive X280 RISC-V application CPU cores operating out of the same die, allowing the processor to independently run Linux, parse file formats, preprocess raw sensory inputs, and coordinate distributed communication.
- **Native 100GbE Mesh Interconnect**: Features 10 integrated 100-gigabit Ethernet interfaces directly on the chip perimeter. This enables clusters of Blackhole processors to scale horizontally into multi-thousand-node supercomputers simply by plugging standard Ethernet cables between PCIe cards or rack trays.
- **GDDR6 Memory Architecture**: Utilizes 32 GB of cost-effective GDDR6 memory providing 512 GB/s of bandwidth, striking an optimal balance between high bandwidth and commodity commercial cost compared to expensive HBM packaging.

## Real-World Benchmarks & Impact

Blackhole delivers enterprise-class performance metrics across multimodal model serving and training workloads:
- **Raw Compute Density**: Sustains approximately **1 PFLOPS of FP8 tensor compute** and nearly 800 TOPs of INT8 inference throughput within a standard 300W PCIe envelope.
- **BOM Cost Sashing**: Cuts server bill-of-materials (BOM) costs by up to 40% by eliminating external host CPU sockets, complex PCIe switches, and proprietary InfiniBand host channel adapters (HCAs).
- **Heterogeneous Workloads**: Runs classical graph neural networks (GNNs), sparse mixture-of-experts (MoE) routing, and physical simulation algorithms efficiently thanks to its programmable RISC-V cores.

## Open-Source, Access & Future Roadmap

Tenstorrent adheres to an open-source hardware and software development philosophy:
- **Open-Source Software Stack (TT-Metalium & TT-NN)**: The entire compiler toolchain, kernel library, and Python bindings are fully open-sourced on GitHub under Apache 2.0, providing bare-metal control without proprietary lock-in.
- **RISC-V Ecosystem Leadership**: Driving the open silicon standards for RISC-V vector extensions (RVV) and AI acceleration.
- **Next Horizon (Grendel)**: Tenstorrent is developing its next-generation Grendel processor, combining custom Aegis RISC-V performance cores with advanced sub-3nm chiplet packaging for frontier model training.
