---
ticker: "WAY-G6"
title: "6th-Generation Autonomous Driver Suite"
tagline: "Next-generation production robotaxi hardware and physical AI sensor suite optimized for modularity and reduced BOM"
domain: "Autonomous Systems & Aerospace"
organization: "Waymo"
country: "USA"
releaseDate: "2024-08"
impactMetric: "Surround 4D Radar & 50% Component Cost Reduction"
status: "Live Production"
badge: "Commercial First"
specs:
  "Sensor Suite": "13 cameras, 4 LiDARs, 6 radar sensors, and audio detection modules"
  "Radar Modality": "Surround high-resolution imaging 4D radar tracking velocity vectors"
  "Cost Optimization": "Over 50% reduction in total sensor BOM compared to 5th-gen"
  "Perception Range": "Up to 500 meters all-weather environmental perception"
  "Vehicle Platform": "Geely Zeekr purpose-built EV with redundant steering/braking"
  "Safety Record": "100+ million commercial autonomous miles logged"
tags:
  - "Autonomous Vehicles"
  - "Robotaxi"
  - "Sensor Fusion"
  - "4D Radar"
  - "Physical AI"
links:
  website: "https://waymo.com/blog/2024/08/meet-the-6th-generation-waymo-driver/"
image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

Commercializing autonomous mobility at global scale requires surmounting two towering hurdles: absolute safety across extreme all-weather environments and reducing the capital expenditure of the vehicle hardware stack. While earlier generations of robotaxis relied on bespoke, multi-hundred-thousand-dollar sensor suites grafted onto third-party combustion or EV chassis, Waymo’s **6th-Generation Autonomous Driver Suite** represents the first automotive-grade, mass-producible architecture designed for consumer ride-hailing economics.

Unveiled in August 2024 on the purpose-built Geely Zeekr electric passenger platform, the 6th-Generation Waymo Driver delivers greater perception resolution and extended range while slashing sensor count and reducing total hardware bill-of-materials (BOM) cost by over 50%. The suite integrates custom surround high-resolution 4D imaging radars, weather-clearing optical systems, and end-to-end multimodal physical AI models that maintain safety in dense fog, heavy snow, and torrential rain.

## Hardware & Neural Architecture

Waymo engineered the 6th-Generation suite from the silicon wafer to the aerodynamic sensor pods:
- **Streamlined Multimodal Sensor Suite**: Employs 13 automotive HDR cameras, 4 solid-state and spinning LiDAR units, and 6 high-resolution imaging radar sensors. This represents a significant reduction in total components compared to the 29 cameras and 5 LiDARs of the 5th-gen Jaguar I-PACE fleet.
- **Surround High-Resolution 4D Imaging Radar**: Waymo’s custom 4D radar measures azimuth, elevation, distance, and Doppler velocity simultaneously. Unlike optical sensors, the 4D radar penetrates heavy fog, blowing snow, and road spray, instantly detecting decelerating vehicles up to 500 meters away.
- **Integrated Weather Protection & Self-Cleaning**: Sensors feature micro-heaters, aerodynamic air curtains, and high-pressure fluid wiper nozzles to clear freezing rain, ice, dust, and mud without manual depot maintenance.
- **End-to-End Multimodal World Model**: Sensor tokens from LiDAR range images, radar point clouds, and camera pixels are ingested directly by unified transformer networks that predict the intent of nearby cyclists, pedestrians, and emergency vehicles hundreds of time-steps into the future.

## Real-World Benchmarks & Impact

Waymo is the undisputed global leader in commercial autonomous mobility, with the 6th-generation architecture accelerating fleet expansion:
- **Commercial Scale**: Powering over 150,000 paid autonomous passenger trips per week across San Francisco, Phoenix, Los Angeles, and Austin, logging over 100 million fully driverless commercial miles.
- **Safety Benchmarks**: Verified actuarial insurance data demonstrates an 85% reduction in injury-causing crashes and a 57% reduction in police-reported crashes compared to human-driven benchmark baselines.
- **All-Weather Capability**: Unlocks commercial operation in northern cold-weather metropolitan areas prone to icing and persistent snowfall, overcoming the geographic constraints of legacy autonomous vehicles.

## Open-Source, Access & Future Roadmap

Waymo integrates the 6th-generation system into commercial consumer ride-hailing and enterprise delivery:
- **Waymo One App**: Commercial rider app serving public riders 24/7 across expanding operational design domains (ODDs).
- **Waymo Open Dataset**: Waymo continues to support the academic research community by releasing large-scale multimodal autonomous driving datasets with 3D perception and motion prediction annotations.
- **Zeekr Fleet Rollout**: Transitioning the primary commercial ride-hailing fleet to the low-step, spacious Zeekr robotaxi platform as vehicle manufacturing ramps in late 2025 and 2026.
