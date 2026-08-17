---
title: "SoK: Attack and Defense Landscape of Agentic AI Systems — USENIX Security 2026"
type: research
status: active
summary: "First comprehensive systematization of AI agent security: 128 papers, 51 attack methods, 60 defense methods, organized by design space, attack landscape, and defense-in-depth framework."
source_of_truth:
  - "https://www.usenix.org/conference/usenixsecurity26/presentation/kim-juhee-agentic"
  - "https://arxiv.org/abs/2603.11088"
updated_by: "Antigravity"
updated_at: 2026-05-26
---

# SoK: Attack and Defense Landscape of Agentic AI Systems

## Research Overview

- **Reference:** USENIX Security 2026. Authors: Juhee Kim (UC Berkeley & Seoul National University), Wenbo Guo (UC Santa Barbara), Dawn Song (UC Berkeley).
- **Context:** First comprehensive systematization of knowledge on AI agent security. Analyzes 128 papers (51 attack methods, 60 defense methods) published 2023–2025.
- **Key Contribution:** Introduces a unified risk taxonomy covering all agent components and their interactions, plus a defense-in-depth framework integrating both model-based and system-level defenses.

---

## Defense Landscape (Key Categories)

The survey organizes defenses into three categories:

### 1. Runtime Protection
- **Output Guardrails:** Detect harmful content, unsafe code, and unsafe tool actions.
- **Input Guardrails:** Filter malicious prompts at the boundary.
- **Contextual Security:** Ensures agent contexts stay aligned with user intent — governs which context elements (system prompts, user goals, tool descriptions, retrieved snippets) are admissible.
- **Real-time Monitoring:** Continuous auditing of agent behavior during execution.

### 2. Secure-by-Design
- **Privilege Separation:** AirGap, FIDES, IsolateGPT — architectural isolation between agent components.
- **Access Control:** Capability-based authorization for tool calls.
- **Information Flow Control (IFC):** Taint tracking through planning loops (FIDES).
- **Sandboxing:** Isolated execution environments for untrusted code/tools.

### 3. Component Hardening
- **Model Hardening:** Safety alignment, adversarial training, representation engineering.
- **Tool Security:** Input validation, output sanitization, least-privilege MCP gateways.
- **Memory Security:** Encryption, provenance tracking, isolation.

## Key Insight for Attackers

The survey reveals that **contextual security** is the least mature defense category — most systems still lack robust separation between user instructions and untrusted tool outputs. This is the seam most defenses miss.

---

## Cross-References
- [[research/constitutional-classifiers-synthetic-safety-2025]] — Foundational defense approach
- [[systems/zero-trust-agent-orchestrator]] — Architectural isolation
- [[systems/least-privilege-mcp-gateway]] — Capability scoping
- [[concepts/confused-deputy-delegation]] — Privilege laundering vectors
