# ⚡ SiliconBatch

> **The Real-Time Radar for Physical AI, Robotics, Custom Silicon, and Advanced Electronics Accelerators.**

SiliconBatch is a high-density, real-time radar for Physical AI, Robotics, Custom Silicon, and Advanced Electronics Accelerators. It is inspired by the crisp, information-dense aesthetic of financial terminals and Stockdash, built with interactive React Islands and Tailwind CSS.

---

## 🚀 Key Features

* **⚡ Real-Time Deadline Filtering**: Exclusively displays incubator and accelerator cohorts that are currently open for applications from the active date. Expired deadlines are automatically filtered out.
* **⏱️ Interactive Live Countdown Banners**: Monospace countdown clocks (days, hours, minutes, seconds) on program cards. Clicking the banner or card directly launches the program's dedicated Experience Page.
* **📜 In-Depth Experience Pages (`/programs/[slug]`)**: Deep-dive breakdowns for each program (modeled after [Founders, Inc. Blueprint](https://f.inc/blueprint)):
  * **Deal Mechanics**: Investment check, legal instrument (SAFE, Equity, Grant), valuation caps, and **100% IP ownership guarantees**.
  * **Hardware Labs & Prototyping Inventory**: Detailed equipment lists including SMT Pick-and-Place lines, 5-axis CNC mills, carbon fiber 3D printers, RF test benches, and local GPU compute clusters.
  * **Residency & Stipends**: In-person attendance expectations, founder housing, and living allowances.
  * **Application Cheat Sheets**: Key tips, working prototype requirements, and evaluation rubrics.
* **📡 Stockdash-Style Marquee Ticker**: Continuous ticker tape at the top of the radar highlighting active checks and remaining days.
* **🔍 Instant Multi-Filter Matrix**: Filter instantly by Tech Sector (*Physical AI, Robotics, Silicon & Semiconductors, Advanced Electronics, Frontier AI*), Residency Format (*In-Person vs. Remote*), and Deal Structure (*SAFE, Equity, Non-dilutive Grant*).
* **⊞ Dual View Mode**: Switch seamlessly between **Bento Cards** and a dense **Terminal Table** view.

---

## 🛠️ Architecture & Tech Stack

* **Core Engine**: SiliconBatch High-Speed Static Engine (Zero-JS baseline for <1s load times)
* **Interactive Islands**: React 19 for real-time countdown clocks, search filters, and marquee tickers
* **Styling**: Tailwind CSS configured with the signature Stockdash dark palette (`#06090f`, `#0c1018`, `#131a28`, `#1b2540`)
* **Type Safety & Data Schema**: SiliconBatch Content Collections powered by strict Zod schema validation (`src/content.config.ts`)

---

## 📁 Project Structure

```text
siliconbatch/
├── src/
│   ├── content/
│   │   └── programs/                # Markdown program profiles with full frontmatter
│   │       ├── blueprint.md         # Founders, Inc. Blueprint (SF)
│   │       ├── hax-robotics.md      # HAX Hard Tech & Robotics (SOSV)
│   │       ├── berkeley-skydeck-semi.md # Berkeley SkyDeck Chip Track
│   │       ├── root-ventures-lab.md # Root Ventures Embodied AI Lab
│   │       ├── cdl-robotics.md      # Creative Destruction Lab Robotics
│   │       └── ycombinator-physical.md # YC Physical Tech Track
│   ├── components/
│   │   ├── LiveTicker.tsx           # Continuous marquee ticker tape
│   │   ├── DeadlineCountdown.tsx    # Live countdown clock with urgent warning states
│   │   └── RadarDashboard.tsx       # Search, sector filter tabs, bento & table views
│   ├── layouts/
│   │   └── Layout.astro             # Global layout with header, ticker, and footer
│   ├── pages/
│   │   ├── index.astro              # The Live Radar List page
│   │   └── programs/
│   │       └── [slug].astro         # In-depth Experience & Terms page
│   ├── styles/
│   │   └── global.css               # Terminal typography, glass styles & animations
│   ├── utils/
│   │   └── programs.ts              # Deadline filtering logic & date helpers
│   └── content.config.ts            # Zod validation schema for all programs
├── scripts/
│   └── verify-deadlines.mjs         # CLI tool to verify active vs. expired programs
└── package.json
```

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### 3. Verify Program Deadlines via CLI
```bash
npm run check-deadlines
```

### 4. Build for Production
```bash
npm run build
```

---

## 📝 Adding a New Program

To add a new accelerator program, simply create a new `.md` file inside `src/content/programs/` following the Zod schema:

```yaml
---
ticker: "FINC-BP"
name: "Blueprint II"
organizer: "Founders, Inc."
tagline: "3 months in SF to bring your frontier blueprints to life."
logo: "https://..."
website: "https://f.inc/blueprint"
applyUrl: "https://f.inc/blueprint"
closingDate: "2026-10-18T23:59:59Z"
isRolling: false
durationWeeks: 12
cohortStart: "November 2026"
location:
  city: "San Francisco"
  state: "CA"
  country: "USA"
  inPerson: true
  residencyDetails: "In-person residency at Fort Mason Center, SF."
sectors:
  - "Physical AI"
  - "Robotics"
stage: "Pre-Seed / Prototype"
terms:
  checkSizeUsd: 150000
  checkDisplay: "$150,000"
  instrument: "SAFE"
  equityPercent: 7
  valuationCapDisplay: "$3,500,000 Post-Money"
  stipend: "$10,000 living stipend + housing"
  ipOwnership: "100% Founder-Owned"
hardwareFacilities:
  - "In-House SMT Rapid PCB Assembly Line"
  - "5-Axis CNC Desktop Mills & Lathes"
perks:
  - "$200K in Cloud & Compute credits"
---

## Overview
Write your detailed markdown narrative here...
```

SiliconBatch automatically validates the schema and only shows the program if `closingDate` has not yet elapsed.

---

## 🌐 Deploying to Render

### Option 1: Web Service (Node.js)
1. Go to your [Render Dashboard](https://dashboard.render.com) and click **New + > Web Service**.
2. Connect the repository `https://github.com/ash0503gh/siliconbatch`.
3. Set the following settings:
   * **Runtime**: `Node`
   * **Build Command**: `npm install && npm run build`
   * **Start Command**: `npm start`
4. Click **Create Web Service**.

### Option 2: Static Site (Fast Global CDN)
1. Click **New + > Static Site**.
2. Connect `https://github.com/ash0503gh/siliconbatch`.
3. Set:
   * **Build Command**: `npm install && npm run build`
   * **Publish Directory**: `dist`
4. Click **Create Static Site**.
