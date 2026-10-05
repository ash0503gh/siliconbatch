---
ticker: "PRP-VIS"
title: "Metavision Event-Based Neuromorphic Sensor"
tagline: "Bio-inspired neuromorphic vision sensors capturing asynchronous pixel flux with microsecond temporal resolution"
domain: "Hardware & Frontier Silicon"
organization: "Prophesee"
country: "France"
releaseDate: "2024-01"
impactMetric: "Microsecond Latency & >120dB Dynamic Range"
status: "Live Production"
badge: "Neuromorphic"
specs:
  "Temporal Resolution": "<10 µs microsecond-level event timing accuracy"
  "Dynamic Range": ">120 dB (operates from starlight to direct sunlight)"
  "Data Output": "Event-based pixel changes (zero redundant background frames)"
  "Power Consumption": "<10 mW ultra-low power neuromorphic sensing"
  "Fabrication Joint": "3D stacked CMOS event sensor co-developed with Sony"
  "Maximum Event Rate": "1.06 Giga-events per second (Geps)"
tags:
  - "Neuromorphic"
  - "Event Camera"
  - "Computer Vision"
  - "Ultra-Low Latency"
  - "Robotic Perception"
links:
  website: "https://www.prophesee.ai"
  demoUrl: "https://www.prophesee.ai/metavision-intelligence/"
image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

For over a century, artificial vision has relied on the concept of discrete "frames"—capturing snapshots of an entire scene 30 or 60 times per second regardless of whether anything actually moved. This paradigm creates massive computational waste: processing millions of redundant pixels of static backgrounds while simultaneously suffering from motion blur and high latency when tracking fast-moving objects in high-speed robotics, defense, and autonomous driving.

Prophesee fundamentally re-architected machine vision with its bio-inspired **Metavision Event-Based Sensor**. Emulating the human retina, each individual pixel on a Metavision sensor is autonomous and asynchronous. Pixels do not wait for an external clock or frame trigger; instead, a pixel activates and emits a digital event packet $(x, y, t, p)$ only when it detects a change in logarithmic light intensity. This breakthrough slashes data volume by 10x to 100x while unlocking microsecond-level temporal precision and an extreme dynamic range that handles direct sunlight and dark tunnels simultaneously.

## Hardware & Neural Architecture

Co-developed in an engineering partnership with Sony Semiconductor Solutions, the Metavision sensor leverages advanced 3D stacked CMOS semiconductor manufacturing:
- **3D Stacked BSI Architecture**: The sensor stacks a backside-illuminated (BSI) pixel photodiode array directly on top of a digital readout IC (ROIC) layer via high-density copper-to-copper Cu-Cu bonding. This achieves industry-leading 4.86 µm pixel pitch.
- **Asynchronous Pixel Logic**: Each pixel integrates a continuous-time logarithmic photoreceptor circuit, an analog differentiator, and dual comparators. When the illuminance change exceeds a configurable threshold, an event is triggered with polarity (+1 or -1) and a microsecond-accurate timestamp.
- **Ultra-Wide Dynamic Range**: Delivers over 120 dB of dynamic range—far surpassing standard automotive HDR cameras (typically 80–100 dB)—allowing autonomous vehicles to detect pedestrians entering dark tunnels without blinding or saturation.
- **Spiking Neural Network (SNN) Native**: Event streams map natively to neuromorphic processing chips (such as Intel Loihi, SynSense, and BrainChip), enabling fully asynchronous, sub-milliwatt edge perception.

## Real-World Benchmarks & Impact

Metavision sensors are deployed across high-speed industrial robotics, aerospace inspection, and advanced driver assistance systems (ADAS):
- **Vibration & High-Speed Tracking**: Accurately tracks mechanical vibrations, drone propellers, and high-speed projectile trajectories exceeding 10,000 equivalent frames per second with zero motion blur.
- **Edge Compute Efficiency**: Reduces camera system data throughput from gigabytes per second to mere megabytes per second, drastically lowering edge processor thermal loads and battery draw in wearable augmented reality and micro-drones.
- **Microsecond Collision Prevention**: Detects obstacle trajectory deviations in under 1 millisecond, empowering collaborative robots to halt or swerve before human contact occurs.

## Open-Source, Access & Future Roadmap

Prophesee provides a comprehensive ecosystem supporting both traditional computer vision pipelines and emerging neuromorphic architectures:
- **OpenEB SDK**: Open-sourced the Metavision Event-Based core SDK (OpenEB) on GitHub under the Apache 2.0 license, providing ROS/ROS2 drivers, event-to-frame conversion algorithms, and tracking libraries.
- **Automotive Production**: Partnering with tier-1 automotive suppliers (including Continental and Bosch) to integrate neuromorphic event sensors into next-generation ADAS sensor suites.
- **Next Frontiers**: Miniaturization for spatial computing headsets, edge medical diagnostic devices, and low-Earth orbit satellite space-debris tracking.
