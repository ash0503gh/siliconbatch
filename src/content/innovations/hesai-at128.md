---
ticker: "HES-AT128"
title: "Hesai AT128 Automotive Solid-State Hybrid LiDAR"
tagline: "Ultra-high resolution long-range solid-state hybrid LiDAR delivering 1.53 million points per second for mass-market autonomous mobility"
domain: "Hardware & Frontier Silicon"
organization: "Hesai Technology"
country: "China"
releaseDate: "2023-08"
impactMetric: "1.53M Pts/Sec & 200m Range Solid-State"
status: "Live Production"
badge: "Hardware Scale"
specs:
  "Point Generation Rate": "1.53 million points per second (single return)"
  "Detection Range": "200 meters at 10% reflectivity target"
  "Field of View": "120° horizontal × 25.4° vertical FOV"
  "Angular Resolution": "0.1° × 0.2° ultra-fine angular resolution"
  "Form Factor & Height": "Ultra-compact 48 mm profile for seamless vehicle roofline integration"
  "Integrated ASIC Architecture": "V-Series proprietary silicon integrating hundreds of laser & receiver channels"
tags:
  - "LiDAR"
  - "Perception Silicon"
  - "Autonomous Driving"
  - "Robotics Sensors"
  - "China"
  - "Shanghai"
links:
  website: "https://www.hesaitech.com/product/at128"
  demoUrl: "https://www.youtube.com/watch?v=Xh71Z38O_iI"
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

Headquartered in Shanghai, Hesai Technology transformed LiDAR from an experimental, hand-assembled mechanical optical sensor costing $10,000–$75,000 into a high-yield, automotive-grade solid-state silicon component costing a fraction of that amount. The Hesai AT128 is the automotive industry's premier long-range solid-state hybrid LiDAR, selected by leading global OEMs including Li Auto, Lotus, Xiaomi, and autonomous trucking fleets.

Delivering an extraordinary **1.53 million points per second** at a detection range of 200 meters (at 10% reflectivity), the AT128 produces dense, camera-like 3D point clouds that allow perception algorithms to identify small debris, lost tires, and pedestrian limb poses at highway speeds under direct sunlight, zero lighting, and heavy fog.

## Hardware & Neural Architecture

The AT128's breakthrough lies in proprietary monolithic silicon integration:
- **Proprietary V-Series Silicon**: Traditional spinning LiDAR stacked hundreds of individual discrete lasers and detectors manually. Hesai integrated 128 micro-channel laser transmitters and photodetectors directly into a custom-designed CMOS transceiver ASIC, reducing component count by >90%.
- **Solid-State Hybrid Scanning**: Employs a high-reliability rotating polygon mirror mechanism inside an ultra-slim 48 mm housing, completely eliminating external spinning bodies and meeting stringent automotive vibration (ISO 16750) and shock certifications.
- **Ultra-Fine Horizon Perception**: Achieves 0.1° horizontal resolution across the center region of interest, allowing neural perception networks to differentiate between a road shadow and a physical hazard 150 meters down the highway.

## Real-World Benchmarks & Impact

Hesai AT128 represents the highest-volume production LiDAR in the autonomous mobility sector:
- **Mass Scale Production**: Over 500,000 cumulative automotive LiDAR units delivered, logging billions of commercial highway and urban autonomous driving kilometers.
- **High Reflectivity Range**: Detects standard vehicles up to 250+ meters away, providing autonomous motion planners up to 7 full seconds of reaction time at 120 km/h highway speeds.
- **Energy & Thermal Efficiency**: Consumes under 18W of total system power, enabling direct integration behind automotive windshields or inside roof fairings without auxiliary liquid cooling.

## Open-Source, Access & Future Roadmap

Hesai maintains extensive open-source developer tooling for the robotics community:
- **ROS / ROS 2 Drivers**: Official open-source drivers supporting point-cloud visualization, PCL library integration, and Autoware autonomous driving pipelines.
- **Next-Gen Micro-Mirror Architectures**: Scaling the AT512 and FT120 pure solid-state flash LiDARs for blind-spot robotic perception and humanoid vision integration.
