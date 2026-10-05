---
ticker: "RT2-VLA"
title: "RT-2: Vision-Language-Action Models"
tagline: "Translating web-scale vision and language knowledge into direct physical robotic actions"
domain: "Physical AI & Robotics"
organization: "Google DeepMind"
releaseDate: "2023-07"
impactMetric: "3x Generalization & Emergent Reasoning in Physical Actions"
status: "Research Breakthrough"
badge: "SOTA Benchmark"
specs:
  "Parameter Scale": "Up to 55B parameters (PaLI-X & PaLM-E backbones)"
  "Action Representation": "Tokenized 6-DoF end-effector delta poses & gripper states"
  "Inference Latency": "1-3 Hz real-time closed-loop control via TPU cloud runtime"
  "Generalization Gain": "3x performance jump on novel unseen physical objects"
  "Pretraining Base": "Web-scale text-image datasets combined with robotic trajectory data"
  "Action Vocabulary": "Discretized into 256 action bins per coordinate dimension"
tags:
  - "VLA"
  - "Vision-Language-Action"
  - "DeepMind"
  - "Physical AI"
  - "Robotics"
links:
  website: "https://deepmind.google/discover/blog/rt-2-new-model-translates-vision-and-language-into-action/"
  paperUrl: "https://arxiv.org/abs/2307.15818"
  githubUrl: "https://github.com/google-deepmind/open_x_embodiment"
image: "https://images.unsplash.com/photo-1525338078858-d762b5e32f2c?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

Robotics has historically suffered from the "embodiment bottleneck": training models exclusively on narrow robotic demonstration data prevented robots from acquiring broad common-sense understanding of the real world. Google DeepMind dismantled this barrier with **RT-2 (Robotics Transformer 2)**, the foundational Vision-Language-Action (VLA) model that directly casts physical robotic actions into the output token vocabulary of frontier vision-language models (VLMs).

By co-fine-tuning large vision-language models (PaLI-X 55B and PaLM-E 12B) on internet-scale multimodal data alongside robotic trajectory demonstrations, RT-2 unlocked emergent semantic reasoning in physical systems. A robot equipped with RT-2 can understand abstract instructions like "pick up the extinct animal" (selecting a plastic dinosaur from a tray of toys) or "move the improvised hammer" (grasping a stone), without having ever received explicit demonstration data for those specific tasks or objects.

## Hardware & Neural Architecture

The core innovation of RT-2 lies in its unified tokenization and co-fine-tuning architecture:
- **Action Tokenization**: Instead of adding a separate policy head with continuous loss functions, RT-2 discretizes 6-DoF end-effector displacement coordinates (x, y, z, roll, pitch, yaw) and gripper open/close triggers into 256 discrete integer bins. These action tokens are mapped directly into the model’s standard text token vocabulary.
- **Joint Co-Fine-Tuning**: During training, batches combine web-scale vision-language tasks (visual question answering, image captioning, OCR) with robotic manipulation trajectories. This preserves the general reasoning capabilities of the base model while teaching it to emit sequence tokens corresponding to physical motions.
- **Inference Runtime**: To operate a physical robot arm safely, the 55B parameter model runs in Google Cloud TPU infrastructure, streaming predicted action sequences to the edge robot controller via high-speed gRPC channels at approximately 1–3 Hz.
- **Embodiment Abstraction**: The model was evaluated across standard mobile manipulator platforms featuring 7-DoF arms and parallel-jaw grippers operating across typical office kitchen environments.

## Real-World Benchmarks & Impact

DeepMind evaluated RT-2 over 6,000 robotic evaluation trials, establishing state-of-the-art results for zero-shot robotic generalization:
- **Novel Object Generalization**: RT-2 achieved a **62% success rate** on unseen objects, novel backgrounds, and new environments—nearly tripling the 32% performance achieved by predecessor systems like RT-1 and VC-1.
- **Emergent Semantic Reasoning**: Successfully performed multistep contextual interpretations, including recognizing human emotional states depicted on sticky notes, identifying brand logos, and choosing functional tool substitutes based on physics commonsense.
- **Robustness to Visual Distractors**: Maintained stable manipulation trajectories even when surrounded by dense visual clutter and adversarial background clutter.

## Open-Source, Access & Future Roadmap

RT-2 catalyzed the broader physical AI community, leading directly to the Open X-Embodiment collaboration:
- **Open X-Embodiment Dataset (RT-X)**: DeepMind open-sourced a massive cross-robot dataset spanning 1 million+ trajectories across 22 different robot embodiments, alongside open-weight RT-1-X and RT-2-X model checkpoints.
- **Next Frontier (Spatial VLAs)**: DeepMind’s ongoing physical AI work focuses on incorporating 3D point cloud tokens, reducing inference latency below 50 milliseconds via distilled edge transformers, and scaling autonomous self-correction loops.
- **Industry Impact**: Established the architectural blueprint now followed by leading embodied AI startups and research labs including Physical Intelligence, Figure, Covariant, and Skild AI.
