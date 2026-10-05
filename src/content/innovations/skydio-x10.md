---
ticker: "SKY-X10"
title: "Skydio X10 Autonomous Edge-AI Airframe"
tagline: "Enterprise autonomous drone with 360-degree omnidirectional optical obstacle avoidance and onboard AI compute"
domain: "Autonomous Systems & Aerospace"
organization: "Skydio"
releaseDate: "2023-10"
impactMetric: "60FPS 360° Omnidirectional Obstacle Avoidance"
status: "Live Production"
badge: "Autonomy SOTA"
specs:
  "AI Compute Engine": "NVIDIA Jetson Orin SoC executing spatial DNNs onboard"
  "Navigation Sensors": "6x custom navigation cameras with 360° FOV, night-vision illumination"
  "Sensor Payload": "64MP telephoto, 48MP zoom, and FLIR Boson+ radiometric thermal sensor"
  "Flight Time": "Up to 40 minutes continuous autonomous flight"
  "Environmental Rating": "IP55 weather protection (rain, dust, -20°C to 45°C operation)"
  "Autonomous Features": "Night autonomy, GPS-denied indoor flight, sub-millimeter structure mapping"
tags:
  - "Drones"
  - "Edge AI"
  - "Computer Vision"
  - "Autonomous Navigation"
  - "Thermal Imaging"
links:
  website: "https://www.skydio.com/x10"
image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

Manual drone flight has long represented a precarious and fragile human endeavor: an estimated 30% of commercial enterprise drones crash within their first year of operation due to pilot error, wire strikes, sudden wind gusts, or signal loss in GPS-denied environments. Skydio revolutionized autonomous aviation by shifting the pilot’s role from manual joystick steering to high-level strategic task assignment with the **Skydio X10**.

The Skydio X10 airframe embeds an onboard spatial AI supercomputer that continuously perceives the 3D world in full 360-degree spherical coverage at 60 frames per second. Powered by deep neural networks running on custom onboard silicon, the X10 detects thin telephone wires, tree branches, crane cables, and moving machinery, executing fluid collision avoidance maneuvers even in complete darkness or inside steel GPS-jammed industrial facilities.

## Hardware & Neural Architecture

The X10 integrates state-of-the-art perception, edge computing, and modular imaging hardware:
- **Onboard AI Compute Core**: Powered by the NVIDIA Jetson Orin System-on-Chip (SoC), delivering over 100 trillion operations per second (TOPS) of AI compute to run real-time dense depth estimation, semantic segmentation, and motion prediction models concurrently.
- **Night Autonomy Sensor Array**: Six custom ultra-wide navigation cameras paired with visible and infrared illumination LEDs allow the drone to navigate through zero-light subterranean tunnels and nighttime disaster zones with full optical obstacle avoidance.
- **Modular Sensor Payloads**: Houses an enterprise modular gimbal with a 64MP wide-angle camera, a 48MP zoom camera capable of reading license plates at 800 feet, and a high-resolution FLIR Boson+ radiometric thermal sensor with 30 mK thermal sensitivity.
- **Aerospace-Grade Airframe**: Built with weather-sealed carbon-fiber composite rated at IP55, capable of sustained operations in heavy rainfall and 28 mph (45 km/h) sustained winds.

## Real-World Benchmarks & Impact

The Skydio X10 has established dominant deployment across defense, utility inspection, and emergency response sectors:
- **Zero-Pilot Autonomy**: Deployed autonomously from Skydio Dock charging stations to perform scheduled perimeter patrols and critical substation inspections without a human operator on site.
- **Sub-Millimeter Photogrammetry**: Generates millimeter-accurate 3D digital twins of bridges, dams, and cell towers by automatically calculating optimal flight paths around complex geometric surfaces.
- **Public Safety Response**: Decreased 911 emergency response times by serving as a Drone as First Responder (DFR), arriving on scene minutes before ground patrol units to stream aerial situational awareness.

## Open-Source, Access & Future Roadmap

Skydio delivers enterprise software and hardware autonomy solutions through direct procurement and Skydio Cloud:
- **Skydio Cloud & API SDK**: REST and gRPC developer APIs allowing enterprise developers to programmatically launch autonomous inspection missions, stream live telemetry, and ingest thermal radiometric data.
- **Autonomous DFR Expansion**: Expanding Drone-as-First-Responder deployments across hundreds of municipal police and fire departments nationwide.
- **Edge Model Evolution**: Integrating foundation vision models directly onto the Jetson Orin edge processor to perform automated real-time defect identification (crack detection, rust quantification, thermal leaks) during the flight mission itself.
