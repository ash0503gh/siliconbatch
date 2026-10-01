---
ticker: "CRTS"
name: "Cartesia"
batch: "S24"
tagline: "Ultra-low-latency real-time voice and multimodal State Space Models"
logo: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=120&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80"
website: "https://cartesia.ai"
careersUrl: "https://cartesia.ai/careers"
demoUrl: "https://play.cartesia.ai"
stage: "Series A"
totalRaised: "$15M"
sectors:
  - "AI"
  - "DevTools"
  - "Voice AI"
location:
  city: "San Francisco"
  state: "CA"
  country: "USA"
founders:
  - "Karan Goel"
  - "Albert Gu"
  - "Tri Dao"
hiring: true
openRolesCount: 10
techStack:
  - "State Space Models (SSMs)"
  - "Sonic TTS Engine"
  - "FlashAttention"
  - "PyTorch"
  - "CUDA C++"
  - "WebSockets"
badge: "Breakthrough"
---

## Problem
Conversational voice AI applications require end-to-end latencies under 200 milliseconds to feel lifelike and interactive to humans. Traditional text-to-speech (TTS) pipelines and transformer-based autoregressive audio models suffer from severe quadratic attention bottlenecks and high time-to-first-byte (TTFB) delays, often taking 800ms to 2 seconds to generate speech responses. This latency lag causes jarring pauses in spoken conversations, breaking realism in interactive agents, virtual characters, and gaming.

## Solution & Innovation
Cartesia builds real-time multimodal intelligence based on State Space Models (SSMs). Their flagship generative audio model, **Sonic**, produces natural, emotionally expressive human speech with an industry-record latency of under 100 milliseconds. Because SSM architectures process long sequential audio streams with linear rather than quadratic computational complexity, Cartesia enables fluid, real-time bidirectional vocal interactions at massive scale and minimal GPU compute overhead.

## Technology & Architecture
Cartesia's models stem from core algorithmic breakthroughs created by their founding team:
- **State Space Model Foundations**: Powered by the theoretical breakthroughs of Mamba and S4, replacing heavy quadratic self-attention with efficient linear-time state updates.
- **Sub-100ms Streaming Audio Synthesis**: Direct streaming audio generation delivering the first speech chunk in under 90ms over low-latency WebSocket connections.
- **Custom Hardware Kernels**: Highly optimized fused CUDA and Triton kernels co-developed with the creators of FlashAttention, maximizing arithmetic intensity across modern GPU silicon.

## Team & YC Journey
Cartesia was founded by world-renowned machine learning pioneers: Karan Goel (Stanford PhD), Albert Gu (co-creator of the Mamba and S4 architectures, Carnegie Mellon professor), and Tri Dao (creator of FlashAttention, Princeton professor). Backed by Y Combinator's S24 batch, Index Ventures, and prominent AI researchers, Cartesia raised $15M to build the next generation of real-time sensory and multimodal AI systems.
