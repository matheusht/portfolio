---
title: "Stable Agentic Control: Tool-Mediated LLM Architecture for Autonomous Cyber Defense (2026)"
type: research
status: active
summary: "First Lean 4-verified closed-loop stability certificate for LLM-in-the-loop cyber defense. Tool-mediated architecture reduces attacker payoff by 59% with zero variance across 40 runs."
source_of_truth:
  - "https://arxiv.org/abs/2605.03034"
updated_by: "Antigravity"
updated_at: 2026-05-26
---

# Stable Agentic Control

## Research Overview

- **Reference:** [arXiv:2605.03034](https://arxiv.org/abs/2605.03034). Authors: Kerri Prinos, Lilianne Brush, Cameron Denton, Zhanqi Wang, Joshua Knox, Snehal Antani, Anton Foltz, Amy Villaseñor.
- **Context:** Tool-mediated architecture for LLM-in-the-loop adversarial control in SOCs configuring EDR policies under adversarial pressure.
- **Key Contribution:** First mechanically-verified (Lean 4, zero `sorry`) closed-loop stability certificate for a tool-mediated LLM controller.

---

## Architecture

The system constrains LLM agents to compose **deterministic tools** (Stackelberg best-response solvers, Bayesian observers, attack-graph primitives) and enforces **finite action catalogs** at the tool-output interface.

### Formal Verification

A composite Lyapunov function V(k) = S(k) + λθ(k) certifies:
- **Controllability** — system state can be driven to desired setpoints
- **Input-to-State Stability (ISS)** — robustness under intelligent adversarial disturbance
- **Observability** — state estimation from asymmetric sensor data

Two corollaries extend the certificate to any controller and any adversary drawn from the catalogs.

### Empirical Results

- **282 real enterprise attack graphs** (161 orgs, 25 industries) — claims hold with margin
- **Claude Sonnet 4** reduces attacker expected payoff by **59%** vs deterministic greedy baseline
- **Zero variance** across 40 runs at four temperatures
- **Claude Haiku 4.5** converges to suboptimal values but stays catalog-bounded — stability is architectural, not capability-dependent

## Attack Implication

The key constraint is the **finite action catalog** at the tool-output interface. If an attacker can force the controller to select an action *outside* the verified catalog (e.g., via prompt injection that bypasses the tool boundary), the formal guarantees no longer hold. The attack surface is the interface between LLM reasoning and tool selection.

---

## Cross-References
- [[research/fides-information-flow-control-agent-planners]] — IFC-based defense
- [[systems/dynamic-privilege-firewall]] — Runtime authorization
- [[concepts/asymmetric-control-problem]] — Related control-theoretic framing
