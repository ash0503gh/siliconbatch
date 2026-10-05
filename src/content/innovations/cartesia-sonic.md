---
ticker: "CRTS-SNC"
title: "Sonic Real-Time State-Space Voice Model"
tagline: "Ultra-low latency streaming text-to-speech foundation model built on structured state space architectures"
domain: "AI Foundation Models"
organization: "Cartesia"
releaseDate: "2024-06"
impactMetric: "Sub-100ms Voice Latency & Real-Time Synthesis"
status: "Live Production"
badge: "Ultra-Low Latency"
specs:
  "Architecture": "State Space Model (SSM) acoustic backbone"
  "First Audio Packet Latency": "80-95 ms end-to-end streaming latency"
  "Audio Fidelity": "44.1 kHz broadcast studio sample rate"
  "Voice Cloning Latency": "Zero-shot cloning from 3-second reference audio"
  "Throughput Efficiency": "5x faster synthesis than standard autoregressive transformer TTS"
  "Streaming Interface": "Bidirectional WebSocket with word-level alignment timestamps"
tags:
  - "State Space Models"
  - "Speech Synthesis"
  - "Real-Time Audio"
  - "Conversational AI"
  - "Low Latency"
links:
  website: "https://cartesia.ai"
  demoUrl: "https://play.cartesia.ai"
image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

Human speech communication is fundamentally conversational and bidirectional: humans detect awkward conversational pauses after just 200 milliseconds. Traditional deep learning text-to-speech (TTS) systems—built on autoregressive transformers or diffusion pipelines—routinely suffer from 400 to 1,200 milliseconds of latency to generate the first audio buffer. This latency lag creates unnatural robotic pauses, making true interactive voice AI feel disjointed and clumsy.

Cartesia broke this latency barrier with **Sonic**, a streaming voice foundation model built from the ground up on Structured State Space Models (SSMs). Rather than accumulating quadratic attention matrices over long audio sequences, Sonic models continuous speech audio waveforms with linear computational complexity. The result is instant, studio-quality speech synthesis that begins playing back in under 95 milliseconds—enabling true fluid, natural, human-to-AI spoken conversations.

## Hardware & Neural Architecture

Sonic replaces the computational bottlenecks of transformer acoustic decoders with continuous-time state space mechanics:
- **State Space Acoustic Core**: Replaces self-attention layers with discretized linear state-space operators, allowing continuous streaming audio generation with a fixed, constant memory footprint regardless of speech duration.
- **Sub-100ms First Chunk Generation**: Employs a low-latency neural vocoder that converts hidden acoustic states directly into 44.1 kHz audio samples in tiny 20 ms frames, streaming bytes to the client socket before the full sentence is even generated.
- **Dynamic Emotion & Prosody Modulation**: Enables programmatic control over vocal speed, emotional valence (excitement, empathy, urgency), and whispering without degrading phonetic clarity.
- **Zero-Shot Voice Cloning**: Analyzes short 3-second voice samples, extracting speaker embedding manifolds that accurately preserve regional accents, vocal timbres, and recording acoustics.

## Real-World Benchmarks & Impact

Sonic quickly became the standard streaming audio engine for next-generation conversational AI platforms:
- **Latency Benchmark**: Achieves **80–95 ms Time-to-First-Audio (TTFA)**, outperforming traditional transformer TTS pipelines by 4x to 8x.
- **Real-Time Factor (RTF)**: Delivers an RTF of 0.05 on standard cloud GPUs, synthesizing 20 seconds of broadcast-grade speech in less than 1 second of compute time.
- **Conversational Applications**: Powers voice agents for virtual clinicians, in-game interactive non-player characters (NPCs), automotive voice assistants, and enterprise call-center dispatchers.

## Open-Source, Access & Future Roadmap

Cartesia provides developer access through global low-latency edge endpoints and client SDKs:
- **WebSocket & REST APIs**: Production-ready developer APIs with native Python, TypeScript, and React SDKs providing real-time audio chunk streaming and word-level alignment callbacks.
- **Multilingual Support**: Expanding from English and Spanish to over 30 languages with native accents and phonetic dialect nuances.
- **On-Device Edge Deployment**: Optimizing distilled SSM voice kernels for local execution on edge SoCs in robotics, wearable hearing devices, and automotive head units.
