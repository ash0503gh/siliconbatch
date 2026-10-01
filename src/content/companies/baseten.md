---
ticker: "BASE"
name: "Baseten"
batch: "S23"
tagline: "High-performance machine learning inference infrastructure and serving platform"
logo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80"
website: "https://baseten.co"
careersUrl: "https://baseten.co/careers"
demoUrl: "https://app.baseten.co"
stage: "Series B"
totalRaised: "$40M"
sectors:
  - "DevTools"
  - "AI"
  - "Infrastructure"
location:
  city: "San Francisco"
  state: "CA"
  country: "USA"
founders:
  - "Tuhin Srivastava"
  - "Amir Haghighat"
  - "Philip Howes"
hiring: true
openRolesCount: 12
techStack:
  - "Truss"
  - "vLLM"
  - "TensorRT-LLM"
  - "Rust"
  - "Python"
  - "Kubernetes"
  - "CUDA"
badge: "Scaleup"
---

## Problem
Deploying, scaling, and managing open-weight AI models (such as Llama, Mistral, Whisper, and DeepSeek) at production scale requires deep specialized knowledge in distributed GPU orchestration, kernel optimization, and dynamic batching. Engineering teams spend weeks setting up Kubernetes clusters, tuning CUDA memory allocations, configuring cold-start autoscaling, and negotiating fragmented cloud GPU capacity rather than focusing on building user-facing product features.

## Solution & Innovation
Baseten provides an end-to-end inference platform engineered to run open-weight machine learning models with industry-leading throughput, sub-second cold starts, and cost efficiency. With their open-source packaging framework **Truss**, engineers can deploy any PyTorch, Hugging Face, or custom model straight to production with a single CLI command. Baseten's automated autoscaling engine allocates dedicated GPU resources dynamically based on token demand and real-time latency targets.

## Technology & Architecture
Baseten's underlying runtime is optimized for extreme throughput and high concurrency:
- **Truss Packaging & Versioning**: Open-source containerization framework packaging model weights, system dependencies, and custom pre/post-processing handlers.
- **Engine Optimization**: Integrated with modern inference acceleration engines including vLLM, TensorRT-LLM, and FlashAttention to maximize tokens-per-second per GPU.
- **Dynamic Multi-Cloud GPU Scheduling**: Custom bare-metal and cloud orchestrator that provisions and balances traffic across NVIDIA H100s, A100s, L40Ss, and A10Gs globally.

## Team & YC Journey
Co-founded by Tuhin Srivastava, Amir Haghighat, and Philip Howes—alumni of Gumroad and machine learning infrastructure teams—Baseten is backed by Y Combinator, IVP, Spark Capital, and Greylock. With over $40M raised across multiple financing rounds, Baseten powers mission-critical model inference for high-growth tech companies such as Descript, Writer, and Patreon.
