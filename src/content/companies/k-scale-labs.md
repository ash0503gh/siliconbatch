---
ticker: "KSC"
name: "K-Scale Labs"
batch: "W24"
tagline: "Open-source humanoid robotics and physical AI operating system"
logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=120&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=1200&auto=format&fit=crop&q=80"
website: "https://kscale.dev"
careersUrl: "https://kscale.dev/careers"
demoUrl: "https://github.com/kscalelabs"
stage: "Seed"
totalRaised: "$5M"
sectors:
  - "Robotics"
  - "Physical AI"
  - "Hardware"
location:
  city: "Palo Alto"
  state: "CA"
  country: "USA"
founders:
  - "Benjamin Bolte"
  - "Paweł Budzianowski"
hiring: true
openRolesCount: 6
techStack:
  - "ROS2"
  - "PyTorch"
  - "MuJoCo"
  - "Isaac Sim"
  - "Rust"
  - "C++"
badge: "Top Seed"
---

## Problem
Building general-purpose humanoid robots remains gatekept by multi-million-dollar hardware BOM costs, closed-source proprietary stacks, and fragmented sim-to-real research infrastructure. Individual robotics labs and developers cannot afford six-figure commercial platforms, which severely bottlenecks the collection of real-world physical manipulation datasets and stalls community-driven reinforcement learning progress.

## Solution & Innovation
K-Scale Labs is democratizing embodied physical intelligence through an entirely open-source humanoid platform. By publishing complete mechanical CAD files, open electrical schematics, firmware drivers, and reinforcement learning training pipelines, K-Scale enables researchers and builders to manufacture fully functional bipedal robots for under $10,000. Through their distributed operating system and cloud teleoperation protocol, hundreds of distributed robots contribute motion trajectories back to a unified open weights foundation model.

## Technology & Architecture
The K-Scale hardware and software stack combines accessible fabrication with state-of-the-art simulation:
- **Low-Cost Actuation & Modular Mechatronics**: Utilizes planetary quasi-direct-drive (QDD) actuators, 3D-printable nylon brackets, and off-the-shelf industrial brushless motors.
- **Sim-to-Real RL Infrastructure**: Pretrained locomotion policies trained using NVIDIA Isaac Sim and MuJoCo are distilled into lightweight neural policies running on embedded edge compute.
- **KOS (K-Scale Operating System)**: A high-performance Rust and ROS2 runtime orchestrating sub-millisecond motor controller loops, IMU sensor fusion, and vision-language-action (VLA) inference.

## Team & YC Journey
Founded by Benjamin Bolte (formerly AI researcher at Meta FAIR) and Paweł Budzianowski (Cambridge PhD and NLP/dialogue veteran), K-Scale Labs emerged from Y Combinator's W24 batch. Supported by prominent robotics angels and top deep-tech venture funds, the team operates out of their robotics lab in Palo Alto, California, accelerating the global development of open-source embodied AI.
