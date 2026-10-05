---
ticker: "NV-COSM"
title: "Cosmos World Foundation Models"
tagline: "Open physical world foundation models generating physically consistent synthetic environments for robotics and AVs"
domain: "AI Foundation Models"
organization: "NVIDIA"
releaseDate: "2025-01"
impactMetric: "Physics-Informed Spatial Simulation for Embodied AI"
status: "Open Weights"
badge: "Open Weights"
specs:
  "Model Families": "Cosmos Diffusion (DiT) & Cosmos Autoregressive (AR) world models"
  "Parameter Scales": "4B, 7B, and 14B parameter open weights"
  "Continuous Tokenizer": "Discrete & continuous video tokenizers with 8x temporal & 16x spatial compression"
  "Training Corpus": "Millions of hours of physical world, driving, and robotic manipulation video"
  "Target Workloads": "Photorealistic synthetic data generation, physical forecasting, counterfactual testing"
  "Inference Stack": "NVIDIA TensorRT-LLM and NeMo curation pipelines"
tags:
  - "World Models"
  - "Physical AI"
  - "Diffusion Transformer"
  - "Robotics Simulation"
  - "Autonomous Vehicles"
links:
  website: "https://www.nvidia.com/en-us/ai/cosmos/"
  paperUrl: "https://arxiv.org/abs/2501.03575"
  githubUrl: "https://github.com/NVIDIA/Cosmos"
image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

Training physical AI systems—such as autonomous vehicles and humanoid robots—requires exploring rare edge cases: pedestrian near-misses, unexpected debris on high-speed freeways, slippage on wet factory floors, and novel mechanical failures. Collecting such catastrophic scenarios in the real world is perilous, slow, and often physically impossible.

At CES 2025, NVIDIA unveiled **Cosmos**, a family of open-weights World Foundation Models engineered to simulate and forecast physical reality. Rather than merely synthesizing visually appealing videos like creative generative tools, Cosmos is grounded in Newtonian mechanics, 3D geometry, and physical causality. By understanding object permanence, gravity, friction, and light transport, Cosmos enables roboticists to simulate physical actions, predict future world states given hypothetical robot controls, and generate high-fidelity synthetic sensor data for autonomous systems training.

## Hardware & Neural Architecture

Cosmos consists of two complementary foundation model architectures supported by cutting-edge neural tokenizers:
- **Cosmos-Diffusion (DiT)**: A Diffusion Transformer architecture optimized for high-resolution photorealistic synthetic video generation. It conditions on text descriptions, camera trajectories, and bounding boxes to render diverse, weather-varied physical scenarios.
- **Cosmos-Autoregressive (AR)**: A causal transformer architecture designed for rapid future-state prediction and robotic world modeling. It predicts next-token world latents conditioned on continuous robot action inputs (steering angles, throttle, joint torques).
- **Causal Continuous & Discrete Tokenizers**: Custom video tokenizers that achieve an 8x temporal and 16x spatial compression ratio. They map multi-frame video into compact latent spaces while preserving high-frequency edge details and lighting continuity.
- **Physical Commonsense Conditioning**: Incorporates 3D bounding boxes, optical flow fields, depth maps, and HD road maps into the cross-attention layers, enforcing geometric consistency across multi-camera surround views.

## Real-World Benchmarks & Impact

Cosmos establishes a new foundation for the development and validation of autonomous machines:
- **Counterfactual "What-If" Simulation**: Allows autonomous vehicle fleets to test alternate decisions in past safety-critical events (e.g., "what would happen if the vehicle swerved left instead of braking?") by simulating physically consistent branch realities.
- **Robotic Policy Training**: Drastically reduces physical robot hardware hours by pre-training physical manipulation policies inside photorealistic Cosmos-generated environments before zero-shot transfer to real hardware.
- **Autonomous Driving Validation**: Synthesizes thousands of variations of rare hazard events (such as wildlife crossing during blinding blizzards), accelerating the validation of safety critical systems by orders of magnitude.

## Open-Source, Access & Future Roadmap

NVIDIA released Cosmos under the open-access NVIDIA Open Model License to accelerate physical AI research globally:
- **Weights & Code on GitHub & Hugging Face**: Full model checkpoints (4B, 7B, 14B), tokenizer weights, and data curation pipelines are freely downloadable for commercial and research development.
- **NVIDIA Isaac & Omniverse Integration**: Native plugins allow developers to connect Cosmos directly into Isaac Sim and DRIVE Sim environments.
- **Multimodal Sensory Expansion**: Future Cosmos updates will incorporate multi-spectral infrared, radar, and tactile sensor tokenizers, establishing a unified multimodal simulator for all physical robotic sensors.
