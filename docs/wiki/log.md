# Wiki Log

This append-only log tracks every ingestion, revision, and lint cycle executed against the AI Safety and Security Wiki.

---

## [2026-05-20] scaffold | initialized portfolio knowledge base
- Reverted portfolio `/Users/matheusvsky/Documents/personal/portfolio/docs/LLM_WIKI.md` back to its original clean personal/outreach state.
- Scaffolds a multi-file structured knowledge base under `/Users/matheusvsky/Documents/personal/portfolio/docs/wiki/` conforming to Karpathy's `llm-wiki` gist.
- Added `SCHEMA.md` outlining metadata standards, workflows, and rules.
- Created `index.md` as the master page map.
- Ingested 11 concepts covering PAIR, TAP, Crescendo, GS-MCTS, G-Eval, Prometheus 2, Regression Replay, MCP Tool Poisoning, ToolLeak, Confused Deputy, and Clawdrain.
- Ingested `systems/kill-chain-canaries.md` for deterministic data tracking.
- Ingested `entities/open-agent-passport-oap.md` for cryptographic tool execution auth.
- Ingested `research/agentic-vulnerability-landscape-2025-2026.md` for industry threat vectors.

## [2026-05-20] ingest | target & loop research ingestion
- Ingested core target papers: `research/agents-of-chaos.md` (arXiv:2602.20021), `research/adversarial-gan-cybersecurity.md` (arXiv:2509.20411v2), and `research/owasp-asi08-cascading-failures.md` (Adversa AI OWASP ASI08).
- Implemented discovery feedback loop to query and curate recent 2025-2026 academic publications.
- Ingested discovered literature: `research/pear-benchmark-robustness.md` (planner-executor interface), `research/injecagent-tool-poisoning.md` (Indirect Prompt Injection benchmark), and `research/mast-agent-failure-taxonomy.md` (system design and coordination trace analysis).
- Updated existing concept files (`mcp-tool-poisoning.md`, `confused-deputy-delegation.md`, `clawdrain-cost-dos.md`) to integrate bidirectional cross-references.
- Expanded master navigation map `index.md` with new Section 5 cataloging Academic & Industry Literature.

## [2026-05-20] ingest | research bulk ingestion — 24 sources
- Ingestion of 24 new research sources organized into 4 subcategories: AI Red Teaming & Automated Jailbreaking (18 papers), Autonomous Pentesting Agents (1 paper), Agent Security & Vulnerability Taxonomies (7 papers), Multi-Turn Attacks & Benchmarks (4 papers).
- Key additions: AutoRedTeamer (ICLR 2025), J2 (Scale AI, arXiv:2502.09638), Capability-Based Scaling (ICLR 2026, arXiv:2505.20162), AJAR (arXiv:2601.10971), CoP (arXiv:2506.00781), xOffense (arXiv:2509.13021), LLM Agent Security framework (UC Berkeley, arXiv:2603.19469), Prompt Injection landscape survey (arXiv:2602.10453), IEEE S&P plugin study (arXiv:2511.05797), MCP privilege measurement (arXiv:2507.06250), ROME benchmark (arXiv:2605.03242).
- Updated `index.md` Section 5 with subcategory structure.
- Appended this log entry.



## [2026-05-20] Antigravity | Ingested 117 SOTA Pages to reach 150+ Page Goal
- Added 55 new Research papers from 2025-2026.
- Added 30 new Concepts (reasoning inflation, infinite thinking loops, asymmetric control).
- Added 12 new Systems (dynamic privilege firewalls, zero-trust orchestrators).
- Added 10 new Entities (benchmarks like MCPTox, ExploitGym, LlamaFirewall).
- Added 5 Architectural Decisions and 5 Timelines tracing safety evolution.
- Fully synchronized index.md with strict relative links.

## [2026-05-26] Antigravity | Ingested 12 Defense Research Papers — New defense/ subfolder
- Created `research/defense/` subfolder for defense-focused agentic security papers.
- Added 12 new research files covering agentic defense architectures:
  - `research/defense/usenix-security26-sok-agentic-defense-landscape.md` — USENIX Security 2026 SoK (128 papers, 51 attacks, 60 defenses)
  - `research/defense/stable-agentic-control-lean4-cyber-defense.md` — Lean 4-verified tool-mediated cyber defense (arXiv:2605.03034)
  - `research/defense/safeagent-runtime-protection-architecture.md` — Runtime governance architecture (arXiv:2604.17562)
  - `research/defense/agentsentry-temporal-causal-ipi-defense.md` — Temporal causal IPI defense (arXiv:2602.22724)
  - `research/defense/coopguard-cooperative-multiagent-defense.md` — Cooperative multi-agent defense, ICLR 2026 (arXiv:2604.04060)
  - `research/defense/aegisllm-multi-agent-self-reflective-defense.md` — Self-reflective multi-agent defense (arXiv:2504.20965)
  - `research/defense/rvb-red-blue-game-hardening.md` — Red-Blue game framework, ACL ARR 2026 (arXiv:2601.19726)
  - `research/defense/flowsteer-planning-time-vulnerabilities-mas.md` — Planning-time MAS attack + FlowGuard defense (arXiv:2605.11514)
  - `research/defense/constitutional-classifiers-v2-production-defense.md` — Anthropic production defense (arXiv:2601.04603)
  - `research/defense/shield-auto-healing-defense-dos.md` — Auto-healing DoS defense (arXiv:2601.19174)
  - `research/defense/dynatrust-dynamic-trust-sleeper-agent-defense.md` — Dynamic trust against sleeper agents (arXiv:2603.15661)
  - `research/defense/trajguard-decoding-time-jailbreak-defense.md` — Decoding-time jailbreak detection (arXiv:2604.07727)
- Updated `index.md` with new Section 4 cataloging defense research.
- Renumbered Wiki Management section from 5 → 6.

## [2026-05-20] Antigravity | Ingested 10 Research Papers — Batch 2
- Added 10 new research papers covering previously underrepresented areas:
  - `research/ai-content-provenance-detection-2025.md` — Provenance Detection via Perceptual Hashing and FHE (arXiv:2503.11195)
  - `research/ai-incident-reporting-framework-2026.md` — Designing Incident Reporting for General-Purpose AI (arXiv:2511.05914, AAAI 2026)
  - `research/frontier-ai-risk-management-framework-2025.md` — Frontier AI Risk Management Framework in Practice (arXiv:2507.16534)
  - `research/data-contamination-llm-survey-2025.md` — Survey on Data Contamination for LLMs (arXiv:2502.14425)
  - `research/benchmark-contamination-watermarking-2025.md` — Detecting Benchmark Contamination Through Watermarking (arXiv:2502.17259)
  - `research/security-degradation-iterative-codegen-2025.md` — Security Degradation in Iterative AI Code Generation (arXiv:2506.11022)
  - `research/strong-model-collapse-synthetic-data-2025.md` — Strong Model Collapse (ICLR 2025 Spotlight)
  - `research/llm-hallucination-comprehensive-survey-2025.md` — LLM Hallucination: A Comprehensive Survey (arXiv:2510.06265)
  - `research/ai-agent-autonomy-measurement-2026.md` — Measuring AI Agent Autonomy in Practice (Anthropic, 2026)
  - `research/ai-augmented-soc-operations-2025.md` — AI-Augmented SOC: A Survey of LLMs and Agents for Security Operations (arXiv, 2025)
- Updated `index.md` Section 3 with 10 new entries in alphabetical order.
