---
ticker: "DSK-R1"
title: "DeepSeek-R1 Incentivized Reasoning Model"
tagline: "Large-scale reasoning model trained via pure reinforcement learning without supervised warm-up fine-tuning"
domain: "AI Foundation Models"
organization: "DeepSeek"
releaseDate: "2025-01"
impactMetric: "97.3% MATH-500 & Open-Weights Frontier Parity"
status: "Open Weights"
badge: "Open Weights"
specs:
  "Architecture": "Mixture-of-Experts (MoE) with Multi-Head Latent Attention (MLA)"
  "Total Parameters": "671 Billion total parameters"
  "Active Parameters": "37 Billion activated parameters per token"
  "Training Paradigm": "Large-scale Reinforcement Learning (RL) directly on base models (DeepSeek-R1-Zero & R1)"
  "Context Window": "128,000 tokens"
  "Benchmark Score": "97.3% on MATH-500, 79.8% on AIME 2024"
tags:
  - "Reasoning"
  - "Reinforcement Learning"
  - "Open Weights"
  - "Test-Time Compute"
  - "Mixture-of-Experts"
links:
  website: "https://www.deepseek.com"
  paperUrl: "https://arxiv.org/abs/2501.12948"
  githubUrl: "https://github.com/deepseek-ai/DeepSeek-R1"
image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

For years, the artificial intelligence industry operated under the consensus that frontier reasoning models like OpenAI o1 required proprietary, massive supervised fine-tuning (SFT) demonstration datasets curated by thousands of human annotators. In January 2025, DeepSeek upended this entire consensus with the open release of **DeepSeek-R1** and **DeepSeek-R1-Zero**.

DeepSeek demonstrated that pure, large-scale Reinforcement Learning (RL) applied directly to a base foundation model—without any prior supervised warm-up fine-tuning—naturally incentivizes the emergence of sophisticated test-time reasoning behaviors. The model autonomously learned to generate explicit internal chain-of-thought tokens, allocate dynamic test-time compute to verify its own intermediate steps, explore alternative solution trajectories, and backtrack when it detected mathematical errors. DeepSeek-R1 matched the reasoning performance of the world's most capable closed commercial systems while making its weights and research findings completely open to the world.

## Hardware & Neural Architecture

DeepSeek-R1’s technical foundation combines extreme parameter efficiency with novel training mechanics:
- **Multi-Head Latent Attention (MLA)**: Compresses the key-value (KV) cache into low-dimensional latent vectors, slashing inference memory footprint by over 75% compared to traditional Multi-Query Attention (MQA) while retaining full multi-head expressive capability.
- **DeepSeekMoE Architecture**: Employs fine-grained mixture-of-experts routing with 671 billion total parameters, but activates only 37 billion parameters per generated token. This allows dense-model-level cognitive capacity with the inference speed and compute budget of a mid-sized model.
- **Group Relative Policy Optimization (GRPO)**: Dispenses with a separate critic/value neural network (which normally doubles training memory requirements). Instead, GRPO evaluates groups of sampled model responses against rule-based accuracy rewards (e.g., deterministic compiler outputs and mathematical verification engines).
- **Distillation to Dense Models**: DeepSeek distilled the reasoning patterns discovered by R1 into compact dense open-source architectures (Qwen-1.5B, 7B, 14B, 32B and Llama-8B, 70B), allowing sub-10B parameter models running on consumer laptops to achieve elite reasoning benchmark scores.

## Real-World Benchmarks & Impact

DeepSeek-R1 shattered the closed-source monopoly on frontier reasoning benchmarks:
- **Mathematical Competitions**: Scored **79.8% on AIME 2024** (American Invitational Mathematics Examination) and **97.3% on MATH-500**, matching OpenAI's o1-preview on identical evaluation splits.
- **Competitive Programming**: Achieved a 2029 Codeforces rating, placing in the 96.3rd percentile of human competitive programmers globally.
- **Democratization Shocks**: Triggered a global re-evaluation of semiconductor Capex requirements by proving that architectural elegance and test-time reinforcement learning can offset raw brute-force pre-training spend.

## Open-Source, Access & Future Roadmap

DeepSeek released all model weights and distillation checkpoints under the permissive MIT License:
- **Full Model Weights**: Available on Hugging Face and ModelScope for free commercial and academic deployment.
- **Ecosystem Integration**: Drop-in support rapidly added to vLLM, Ollama, SGLang, and LM Studio, enabling local private hosting on workstation and server clusters.
- **Next Horizon**: DeepSeek is actively developing multimodal reasoning models that extend test-time RL into physical mechanics, automated theorem proving in Lean 4, and autonomous software development agents.
