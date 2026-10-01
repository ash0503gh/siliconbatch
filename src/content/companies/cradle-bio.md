---
ticker: "CRDL"
name: "Cradle"
batch: "S23"
tagline: "Generative AI platform predicting and engineering novel synthetic proteins"
logo: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=120&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&auto=format&fit=crop&q=80"
website: "https://cradle.bio"
careersUrl: "https://cradle.bio/careers"
demoUrl: "https://cradle.bio/platform"
stage: "Series A"
totalRaised: "$29M"
sectors:
  - "Biotech"
  - "AI"
  - "Life Sciences"
location:
  city: "Zurich"
  country: "Switzerland"
founders:
  - "Stef van Grieken"
  - "Jelle Prins"
  - "Elise de Reus"
hiring: true
openRolesCount: 8
techStack:
  - "Protein Language Models"
  - "PyTorch"
  - "JAX"
  - "Nextflow"
  - "AlphaFold"
  - "Distributed HPC"
badge: "Breakthrough"
---

## Problem
Designing custom proteins for therapeutics, sustainable bio-manufacturing, enzyme engineering, and agriculture is one of biology's most expensive and unpredictable challenges. Traditional wet-lab "directed evolution" requires iterative rounds of random mutagenesis, testing thousands of physical variants over several years with low success rates. Most experimental protein designs misfold, aggregate, or fail to exhibit desired enzymatic activity in vivo.

## Solution & Innovation
Cradle builds generative AI software that empowers biologists to design optimized proteins in a fraction of the time and cost. By framing protein sequence design as a multimodal generative modeling problem, Cradle's models predict structural stability, expression yield, binding affinity, and thermal tolerance before wet-lab synthesis. Biologists using Cradle achieve target protein performance specifications in just one to two experimental rounds, cutting laboratory cycle times by over 80%.

## Technology & Architecture
Cradle combines generative machine learning models with active closed-loop laboratory learning:
- **Proprietary Protein Foundation Models**: Multi-task transformers trained on evolutionary sequence diversity and biophysical measurements to propose novel amino acid substitutions.
- **Active Learning Feedback Loop**: Wet-lab assay results from customer experiments continuously fine-tune project-specific surrogate models, maximizing exploration efficiency in sequence space.
- **High-Performance Cloud Bio-Pipelines**: Automated structure prediction, molecular dynamics simulations, and candidate scoring orchestrated via Nextflow on high-memory GPU clusters.

## Team & YC Journey
Cradle was founded by Stef van Grieken (former Google Brain project lead), Jelle Prins (Uber's first designer and former VP of Product), and Dr. Elise de Reus (synthetic biology PhD). Backed by Y Combinator and Index Ventures, Cradle raised $29M in Series A funding, operating dual laboratories and engineering hubs in Zurich, Switzerland, and Amsterdam, Netherlands to power discovery programs for global pharma and biotech pioneers.
