---
ticker: "DJI-FC30"
title: "DJI FlyCart 30 Heavy-Lift Delivery Drone"
tagline: "High-capacity automated cargo delivery drone with dual-battery redundancy, active phased-array radar, and intelligent winch system"
domain: "Autonomous Systems & Aerospace"
organization: "DJI"
country: "China"
releaseDate: "2024-01"
impactMetric: "40kg Cargo Payload & 28km Range"
status: "Live Production"
badge: "Commercial Scale"
specs:
  "Maximum Payload": "30 kg (dual battery) / 40 kg (single battery emergency mode)"
  "Maximum Flight Range": "28 km without payload / 16 km with 30 kg full payload"
  "Maximum Flight Speed": "20 m/s (~72 km/h) cruise velocity"
  "Operational Ceiling": "6,000 meters maximum takeoff altitude"
  "Obstacle Avoidance": "Front & rear active phased-array radar + dual binocular vision"
  "Cargo Delivery Mechanisms": "Aerodynamic Cargo Box or 20-meter automated anti-sway cable winch"
tags:
  - "Drone Logistics"
  - "Aerial Robotics"
  - "Autonomous Delivery"
  - "Heavy Lift"
  - "China"
  - "Shenzhen"
links:
  website: "https://www.dji.com/flycart-30"
  demoUrl: "https://www.youtube.com/watch?v=sI9fG0q9tB8"
image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1600&auto=format&fit=crop&q=80"
---

## Technical Breakthrough & Overview

DJI, headquartered in Shenzhen, commands over 70% of the world's commercial drone market. With the launch of the FlyCart 30 (FC30), DJI engineered a mass-manufactured, heavy-lift autonomous aerial logistics airframe built for extreme industrial operating environments. Designed to overcome complex geographic barriers in mountain logistics, offshore island supply, emergency rescue, and construction site transport, the FC30 delivers up to 40 kg of physical payload across all-weather conditions.

The system combines dual-redundant smart battery architectures, automated anti-sway cable winch systems that lower cargo without landing, and active phased-array radar systems that detect overhead power lines and tree branches in zero-visibility conditions.

## Hardware & Neural Architecture

The FlyCart 30 is built around ruggedized industrial avionics and edge perception:
- **Active Phased-Array Radar**: Front and rear active phased-array radars emit multidirectional electromagnetic beams to build an active point-cloud perception map up to 50 meters away, ensuring omnidirectional obstacle avoidance day or night.
- **Intelligent Cable Winch System**: For landing zones that cannot accommodate the drone's 1.5-meter footprint, an automatic 20-meter cable winch lowers the cargo container smoothly. An onboard gyro detects pendulum swing, commanding micro-propulsion counter-thrusts to suppress cargo oscillation.
- **DJI O3 Long-Range Transmission**: Encrypted video and telemetry links maintaining full-resolution camera feeds and flight telemetry up to 20 km away via 4-antenna intelligent switching, supplemented by optional 4G enhanced connectivity.

## Real-World Benchmarks & Impact

DJI FlyCart 30 has logged thousands of commercial missions across rugged global terrain:
- **Mount Everest Supply Run**: In 2024, successfully conducted the first-ever drone transport test on Mount Everest, ascending between Base Camp (5,300m) and Camp 1 (6,000m) to deliver oxygen bottles and remove trash.
- **Offshore Island Logistics**: Serving daily island delivery routes in Zhoushan and Guangdong, replacing 2-hour boat transits with 12-minute autonomous flights.
- **Extreme Weather Resilience**: Operating reliably in temperatures from -20°C to 45°C with IP55 ingress protection and 12 m/s wind resistance.

## Open-Source, Access & Future Roadmap

DJI provides enterprise cloud logistics APIs through DJI DeliveryHub:
- **Autonomous Fleet Orchestration**: Cloud software allowing a single operator to manage multi-drone scheduled routes, automated battery charging docks, and delivery confirmations.
- **Payload SDK**: Open electrical and serial interface for third-party payload sensors, specialized medical refrigeration pods, and emergency dropping mechanisms.
