---
ticker: "FIG-02"
title: "Figure 02 Helix Humanoid"
tagline: "Next-generation production humanoid robot deployed in commercial manufacturing"
domain: "Physical AI & Robotics"
organization: "Figure AI"
country: "USA"
releaseDate: "2024-08"
impactMetric: "16-DoF Hands & BMW Pilot Deployment"
status: "Commercial Pilot"
badge: "Commercial First"
specs:
  "Hand Dexterity": "16 Degrees of Freedom (DoF) with integrated tactile sensing"
  "Onboard Compute": "3x CPU/GPU compute boost for local VLM inference"
  "Battery Pack": "2.25 kWh custom battery module (+50% capacity)"
  "Vision Suite": "6 RGB cameras delivering 360° visual perception"
  "Payload Capacity": "Up to 20 kg (44 lbs) payload handling"
  "Structural Weight": "70 kg integrated exoskeleton"
tags:
  - "Humanoid"
  - "Physical AI"
  - "Dexterous Manipulation"
  - "Manufacturing Automation"
  - "VLM"
links:
  website: "https://www.figure.ai"
  demoUrl: "https://www.figure.ai/news/figure-02"
image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

Figure 02 represents a major milestone in embodied artificial intelligence: transitioning bipedal humanoid platforms from research laboratory demonstrations into high-volume, commercially viable industrial production lines. Unveiled in August 2024, Figure 02 redesigns every component from its predecessor, integrating fourth-generation human-scale dexterous hands, custom in-house actuators, an edge-native vision-language-action compute stack, and fully enclosed internal wire routing.

Unlike teleoperated prototypes or single-task industrial robotic arms, Figure 02 operates autonomously in dynamic factory floor environments. The platform leverages an onboard multi-modal neural network architecture trained in collaboration with OpenAI, enabling speech-to-speech conversational interaction, real-time object classification, zero-shot visual reasoning, and adaptive path planning directly on the robot without relying on cloud computation roundtrips.

## Hardware & Neural Architecture

Figure 02's mechanical design centers on maximizing payload-to-weight efficiency while ensuring 24/7 durability in industrial settings:
- **Fourth-Generation Dexterous Hands**: Figure 02 features human-scale hands with 16 degrees of freedom (DoF), actuated by micro-brushless motors integrated directly inside the palm and forearm. Each fingertip embeds multi-axis tactile array sensors that measure shear force, normal load, and slip detection at microsecond resolution.
- **Embedded Compute Pod**: The robot houses custom liquid-cooled edge compute boards powered by redundant GPU and CPU modules delivering 3x higher inference compute compared to Figure 01. This allows concurrent execution of a high-rate 1 kHz motor control policy, low-frequency VLM semantic scene parsing, and onboard acoustic noise cancellation.
- **Fully Integrated Exoskeleton**: All power conduits, Ethernet backbones, and actuator cooling lines are routed completely inside the matte-black carbon-fiber and aluminum shell, preventing wire snags and particle contamination in automotive assembly cells.
- **High-Density Energy System**: A custom 2.25 kWh lithium-ion battery pack is placed centrally inside the torso, lowering the center of gravity and providing over 5 hours of continuous industrial operational uptime with fast-charge docking.

## Real-World Benchmarks & Impact

Figure AI validated Figure 02 in a multi-week commercial pilot deployment at the **BMW Group Plant Spartanburg** in South Carolina—the world's highest-volume automotive manufacturing facility:
- **Sheet Metal Insertion**: The robot performed autonomous sheet metal fixture placement for vehicle chassis assembly, picking stamped components from bins, aligning them to indexing pins with sub-millimeter precision, and inserting them into welding fixtures.
- **Grasp Generalization**: Reached a 99.2% grasp success rate across varying lighting conditions and part orientations using tactile-visual closed-loop policies.
- **Human-Robot Coexistence**: Operating alongside human assembly line workers within standard factory safety envelopes, eliminating the need for safety cages or custom fixturing retrofits.

## Open-Source, Access & Future Roadmap

Figure AI operates as a vertically integrated commercial enterprise, deploying Figure 02 through Robotics-as-a-Service (RaaS) agreements across automotive, warehouse logistics, and precision manufacturing sectors:
- **Fleet Scale**: Production ramp-up targeting hundreds of units deployed in automotive tier-1 suppliers throughout 2025 and 2026.
- **Unified World Model**: Ongoing development of an end-to-end foundation model that unifies high-level visual semantic reasoning with low-level torque-level impedance control, reducing the policy transition latency to under 5 milliseconds.
- **Commercial Availability**: Figure 02 is currently deployed in enterprise pilots with commercial scaling slated for logistics and material handling centers.
