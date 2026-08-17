---
title: "RvB: Automating AI System Hardening via Iterative Red-Blue Games (2026)"
type: research
status: active
summary: "Training-free, sequential imperfect-information game where Red Team exposes vulnerabilities and Blue Team learns defensive principles. 90% defense rate on code hardening, 45% on guardrail optimization."
source_of_truth:
  - "https://arxiv.org/abs/2601.19726"
  - "https://openreview.net/forum?id=ZDNLUU8Jl1"
updated_by: "Antigravity"
updated_at: 2026-05-26
---

# RvB: Red-Blue Game Hardening

## Research Overview

- **Reference:** [arXiv:2601.19726](https://arxiv.org/abs/2601.19726). Authors: Lige Huang, Zicheng Liu, Jie Zhang, Lewen Yan, Dongrui Liu, Jing Shao. ACL ARR 2026.
- **Context:** Offensive and defensive AI security research streams remain largely disjoint — no unified game-theoretic approach for iterative adversarial adaptation.
- **Key Contribution:** Formulates security hardening as a training-free, sequential, imperfect-information game between Red Team and Blue Team.

---

## Framework

### Game Dynamics
- **Red Team:** Multi-step exploit execution against target system
- **Blue Team:** Uses attack logs + autonomous interrogation to probe system state, pinpoint root cause, synthesize fix
- **Information Asymmetry:** Blue Team must infer vulnerability logic from incomplete evidence — forces inductive reasoning beyond pattern matching
- **Externalized Memory:** Agents are computationally stateless between rounds; belief updates are encoded in persistent system state transitions

### Theoretical Guarantees
- Epistemic uncertainty monotonically decreases: H(bₖ₊₁) ≤ H(bₖ)
- System drives from exploration (high entropy) to exploitation (low entropy)

## Results

- **Code Hardening:** 90% Defense Success Rate, near 0% FPR
- **Guardrail Optimization:** 45% DSR against jailbreaks
- Robust generalization to unseen attacks
- 18% token reduction vs. cooperative baselines

## Attack Implication

RvB explicitly models the **attack-defense loop**. The Blue Team learns from attack logs — if the Red Team can generate attack logs that are misleading or incomplete, the Blue Team's inductive reasoning produces ineffective patches. The game's information asymmetry also means the Blue Team may converge to local optima.

---

## Cross-References
- [[research/coopguard-cooperative-multiagent-defense]] — Agent-based defense
- [[research/flowsteer-planning-time-vulnerabilities-mas]] — Planning-time attacks RvB doesn't model
- [[systems/self-healing-alignment-pipeline]] — Automated defense pipeline
