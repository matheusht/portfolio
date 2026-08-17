---
title: "FlowSteer/FlowGuard: Prompt-Only Workflow Steering and Planning-Time Defense in Multi-Agent LLM Systems (2026)"
type: research
status: active
summary: "Prompt-only attack that steers planner-executor MAS at planning-time, bypassing post-hoc defenses. +55% malicious success rate. FlowGuard defense reduces by 34% at input boundary."
source_of_truth:
  - "https://arxiv.org/abs/2605.11514"
updated_by: "Antigravity"
updated_at: 2026-05-26
---

# FlowSteer/FlowGuard: Planning-Time MAS Vulnerabilities

## Research Overview

- **Reference:** [arXiv:2605.11514](https://arxiv.org/abs/2605.11514).
- **Context:** Multi-agent systems with planner–executor architectures convert prompts into subtasks, roles, dependencies, and routing paths. This flexibility exposes an attack surface in workflow formation itself.
- **Key Contribution:** Identifies that workflow position can amplify malicious signals and sycophantic framing propagates them. Introduces both attack (FlowSteer) and defense (FlowGuard).

---

## FlowSteer Attack

A prompt-only attack with two components:
1. **Task-Aware Sycophantic Argument:** Aligns malicious signal with a high-influence subtask using framing cues
2. **Dependency-Guided Workflow Steering:** Expresses propagation-favorable patterns as natural-language guidance to bias replanning

### Results
- **+55% MASR** over naive malicious prompting
- Transfers across model families and planner-executor configurations
- Effective even with black-box topology inference
- **Existing MAS defenses (ARGUS, G-Safeguard) provide limited protection** — they inspect generated workflows, not the planning signals

## FlowGuard Defense

Acts at the **input boundary** before the planner generates the workflow:
1. **Intent Triage:** Separates task, methodological, and argument intent
2. **Intent Decontamination:** Rewrites prompt to soften rigid structural mandates, rephrase assertions as evaluable evidence, remove compliance cues

### Results
- **Reduces MASR by up to 34%** while preserving prompt utility

## Attack Implication

This is critical: **current MAS defenses inspect generated workflows, not the planning signals that create them**. FlowSteer contaminates prompt signals that guide task decomposition, role assignment, and dependency construction — by the time the workflow exists, the damage is done. Defenses must act at the input boundary (like FlowGuard), which is still imperfect (34% reduction).

---

## Cross-References
- [[research/rvb-red-blue-game-hardening]] — Game-theoretic defense (complementary)
- [[research/infa-guard-infection-aware-mas-defense]] — Infection-aware MAS defense
- [[concepts/goal-hierarchy-hijack]] — Goal manipulation at planning level
