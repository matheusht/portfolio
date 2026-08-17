---
title: "SafeAgent: A Runtime Protection Architecture for Agentic Systems (2026)"
type: research
status: active
summary: "Runtime security architecture separating execution governance from semantic risk reasoning. 0.0 ASR on InjecAgent data-stealing tasks. Stateful decision-making over evolving trajectories."
source_of_truth:
  - "https://arxiv.org/abs/2604.17562"
updated_by: "Antigravity"
updated_at: 2026-05-26
---

# SafeAgent: Runtime Protection Architecture

## Research Overview

- **Reference:** [arXiv:2604.17562](https://arxiv.org/abs/2604.17562). Authors: Hailin Liu, Eugene Ilyushin, Jie Ni, Min Zhu.
- **Context:** LLM agents are vulnerable to prompt-injection that propagates through multi-step workflows, tool interactions, and persistent context — input-output filtering alone is insufficient.
- **Key Contribution:** Treats agent safety as a **stateful decision problem over evolving trajectories**, not a single-turn filtering problem.

---

## Architecture

Two coordinated components:

### 1. Runtime Controller
Governed interface that mediates actions around the agent loop:
- Insulates privileged operations (tool use, memory update, side-effectful actions) from untrusted agent outputs
- Maintains session context across agent lifecycles
- Enables recovery routines: context repair, replanning, checkpoint rollback, session termination

### 2. SafeAgent Core (Context-Aware Decision Core)
Operators:
- **Risk Encoding** — represents risk as trackable state
- **Utility-Cost Evaluation** — evaluates safety benefit vs. usability cost
- **Consequence Modeling** — estimates outcomes of candidate actions via latent world model
- **Policy Arbitration** — configurable weighting of competing priorities (task completion, safety, continuity)
- **State Synchronization** — aligns safety state with session state

## Results

- **ASB:** Lowest ASR across DPI (0.2936), IPI (0.2936), Memory Poisoning (0.1858)
- **InjecAgent:** 0.0 ASR on data-stealing tasks (both extraction and transmission stages)
- Outperforms Llama Guard and LLM Guard baselines

## Attack Implication

SafeAgent's decision core operates at the **semantic level** — it evaluates whether a workflow should proceed based on risk. Since the Core is an LLM itself (gpt-oss-safeguard-20b), it's susceptible to the same adversarial inputs it's meant to detect. The separation of concerns is strong, but the Core's reliance on semantic reasoning means a sufficiently sophisticated multi-turn jailbreak that avoids triggering risk signals could bypass it.

---

## Cross-References
- [[research/agentsentry-temporal-causal-ipi-defense]] — Alternative runtime defense
- [[systems/dynamic-privilege-firewall]] — Related privilege enforcement
- [[concepts/infinite-thinking-loop]] — DoS vectors against the decision core
