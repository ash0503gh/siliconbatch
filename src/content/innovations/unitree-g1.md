---
ticker: "UNI-G1"
title: "Unitree G1 Dexterous Humanoid"
tagline: "Sub-$16k mass-manufactured humanoid robot with high-degree-of-freedom dexterous hands"
domain: "Physical AI & Robotics"
organization: "Unitree Robotics"
country: "China"
releaseDate: "2024-05"
impactMetric: "$16k Sub-Industrial Humanoid & 23-43 DoF"
status: "Live Production"
badge: "Mass Production"
specs:
  "Degrees of Freedom": "23 to 43 DoF (optional 3-finger force-controlled hands)"
  "Max Joint Torque": "120 N·m knee joint actuators"
  "Total Weight": "~35 kg lightweight alloy & carbon fiber construction"
  "Walking Speed": "2.0 m/s (~7.2 km/h) dynamic bipedal gait"
  "Onboard Processor": "8-core high-performance CPU with AI co-processor"
  "Battery Endurance": "9000 mAh quick-release battery (~2 hours runtime)"
tags:
  - "Humanoid"
  - "Robotics"
  - "Dexterous Manipulation"
  - "Low Cost"
  - "End-to-End RL"
  - "China"
  - "Hangzhou"
links:
  website: "https://www.unitree.com/g1"
  demoUrl: "https://www.youtube.com/watch?v=0Z4ZfF0z5_w"
image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

The Unitree G1 represents an unprecedented economic disruption in robotics: the arrival of a fully capable, highly dynamic bipedal humanoid robot priced at just $16,000. Historically, humanoid robotic platforms like Boston Dynamics Atlas, Honda ASIMO, or research testbeds cost between $150,000 and $2,000,000, severely limiting academic research and industrial prototyping to elite institutions.

By leveraging Unitree’s established mass-manufacturing supply chain for high-torque quadruped actuators and planetary gearboxes, the Unitree G1 achieves industrial-grade dynamic balance, acrobatic agility, and fine manipulation at consumer-accessible pricing. Powered by end-to-end deep reinforcement learning (RL) policies, the G1 executes high-speed walking, recovery from severe physical kicks, and fine dexterity tasks with its optional multi-degree-of-freedom hand modules.

## Hardware & Neural Architecture

Unitree engineered the G1 from the ground up for power density, impact resistance, and structural simplicity:
- **Integrated High-Torque Actuators**: The knee joints pack custom planetary gear actuators producing up to 120 N·m of instantaneous peak torque, allowing explosive vertical jumps, deep squats, and dynamic balance adjustments on uneven terrain.
- **Modular Kinematic Options**: The standard G1 ships with 23 degrees of freedom (DoF), expandable up to 43 DoF when equipped with Unitree's 3-finger force-controlled dexterous hands and actuated waist rotations.
- **Deep RL Motion Control**: Rather than relying on traditional Zero Moment Point (ZMP) or model predictive control (MPC) equations, Unitree trains neural network policies end-to-end inside simulated physical engines. The policy directly outputs actuator target positions at 200–500 Hz, absorbing disturbances with fluid, biological responsiveness.
- **Perception Sensor Suite**: The head housing integrates an Intel RealSense D435i depth camera alongside a Livox Mid-360 solid-state LiDAR sensor, enabling simultaneous localization and mapping (SLAM) and real-time obstacle avoidance.

## Real-World Benchmarks & Impact

Since shipping customer units in mid-2024, the Unitree G1 has set high performance marks for compact humanoids:
- **Acrobatic Recovery**: Survives aggressive push/kick disturbances and recovers from supine and prone ground falls with zero human intervention in under 3.5 seconds.
- **Fine Manipulation**: Capable of cracking walnuts, uncapping bottles, handling fragile glassware, and operating power tools using tactile force feedback in the fingertips.
- **Academic Democratization**: Over 300 research universities and AI labs deployed G1 units in its first two quarters of production, creating the largest shared hardware testbed for physical AI algorithms globally.

## Open-Source, Access & Future Roadmap

Unitree provides both commercial and developer editions of the G1 to support diverse customer needs:
- **Developer SDK**: Full access to low-level motor torque commands, sensor telemetry streams, and ROS2/C++/Python bindings for custom policy deployment.
- **Isaac Sim Integration**: Pre-calibrated URDF and MJCF physics models provided for immediate training in NVIDIA Isaac Gym and Isaac Lab environments.
- **Next Iteration**: Unitree is finalizing an industrial variant with 5-finger humanoid hands, higher payload capacity (up to 5 kg per arm), and extended 4-hour hot-swappable battery systems for factory inspection and service automation.
