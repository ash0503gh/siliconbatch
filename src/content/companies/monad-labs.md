---
ticker: "MOND"
name: "Monad Labs"
batch: "W24"
tagline: "Ultra-high-throughput parallelized EVM Layer-1 blockchain delivering 10,000 TPS"
logo: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=120&auto=format&fit=crop&q=80"
bannerImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
website: "https://monad.xyz"
careersUrl: "https://monad.xyz/careers"
demoUrl: "https://monad.xyz/testnet"
stage: "Series A"
totalRaised: "$225M"
sectors:
  - "FinTech"
  - "Infrastructure"
  - "Web3"
location:
  city: "New York"
  state: "NY"
  country: "USA"
founders:
  - "Keone Hon"
  - "James Hunsaker"
  - "Eunice Giarta"
hiring: true
openRolesCount: 15
techStack:
  - "Parallel EVM"
  - "MonadBFT Consensus"
  - "MonadDb (Custom Async DB)"
  - "C++"
  - "Rust"
  - "Kernel io_uring"
badge: "Unicorn"
---

## Problem
Decentralized financial systems and EVM-compatible applications are constrained by the linear execution bottlenecks of the standard Ethereum Virtual Machine. Traditional EVM nodes process transactions sequentially one by one, capping global throughput at 15 to 30 transactions per second. This severe execution bottleneck leads to exorbitant gas fees during peak network congestion and forces developers to sacrifice composability or move to fragmented Layer-2 rollups.

## Solution & Innovation
Monad Labs has re-engineered the Ethereum Virtual Machine from first principles to deliver a parallelized, high-performance Layer-1 blockchain capable of processing 10,000 transactions per second with 1-second single-slot finality. Monad introduces optimistic parallel execution, decoupled transaction scheduling, and asynchronous state access, all while maintaining 100% bytecode and RPC compatibility with existing Ethereum smart contracts, tools, and wallets.

## Technology & Architecture
Monad's performance stems from a deeply optimized low-level systems engineering architecture:
- **Optimistic Parallel Execution**: Multi-threaded execution pipelines process non-conflicting transactions simultaneously; conflicts are automatically detected and re-evaluated using an optimistic concurrency control algorithm.
- **MonadDb Custom State Store**: Built from scratch to support native asynchronous disk I/O (via Linux `io_uring`), eliminating storage access wait times that throttle traditional Merkle Patricia tries.
- **Pipelined MonadBFT**: High-throughput consensus protocol decoupling transaction execution from block consensus, ensuring validators achieve consensus at wire speed.

## Team & YC Journey
Monad was founded by Keone Hon and James Hunsaker—veteran high-frequency quantitative systems engineers from Jump Trading who spent over eight years building ultra-low-latency financial matching engines—along with fintech leader Eunice Giarta (ex-Broadway Technology). With backing from Y Combinator, Paradigm, Electric Capital, and Greenoaks, Monad raised $225M to establish the ultimate high-performance decentralized financial foundation.
