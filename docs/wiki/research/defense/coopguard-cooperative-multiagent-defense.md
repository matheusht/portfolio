---
title: "CoopGuard: Stateful Cooperative Agents Safeguarding LLMs Against Evolving Multi-Round Attacks (ICLR 2026)"
type: research
status: active
summary: "Cooperative multi-agent defense (Deferring/Tempting/Forensic agents) achieving 78.9% ASR reduction over SOTA. Introduces EMRA benchmark with 5,200 escalating attack sequences."
source_of_truth:
  - "https://arxiv.org/abs/2604.04060"
  - "https://openreview.net/forum?id=1jqgFgokQC"
updated_by: "Antigravity"
updated_at: 2026-05-26
---

# CoopGuard: Cooperative Multi-Agent Defense

## Research Overview

- **Reference:** [arXiv:2604.04060](https://arxiv.org/abs/2604.04060). Under review at ICLR 2026. Authors: Siyuan Li, Xi Lin, Jun Wu, Zehao Liu, et al.
- **Context:** Existing defenses are reactive and struggle as adversaries refine strategies across multi-round interactions.
- **Key Contribution:** Stateful multi-round defense framework using four cooperative agents with an evolving defense state.

---

## Architecture

### Four Cooperative Agents
1. **Deferring Agent (DA):** Stalls via ambiguity — produces vague responses to raise attack costs
2. **Tempting Agent (TA):** Generates deceptive decoys to misdirect the attacker into honeypot interactions
3. **Forensic Agent (FA):** Logs and analyzes interactions to extract forensic evidence and attack patterns
4. **System Agent (SA):** Coordinates agents adaptively based on the evolving defense state

### Stateful Design
Maintains an internal defense state across rounds. Each round's decision depends explicitly on past interactions and prior defense actions — detection signals, deception outcomes, and forensic cues feed into the next round.

## Results

- **78.9% ASR reduction** over SOTA defenses
- **186% improvement** in deceptive rate (attacker falls for decoys)
- **167.9% reduction** in attack efficiency (attacker wastes resources)
- **EMRA benchmark:** 5,200 adversarial samples across 8 attack types

## Attack Implication

CoopGuard's deception-based defense is its most novel and vulnerable component. The Tempting Agent must maintain a convincing facade — if the attacker can detect they're being decoyed (e.g., by probing for inconsistent responses), the defense collapses. The Forensic Agent's logs are also a high-value target: if an attacker can poison or blind the forensic record, the adaptive closed loop breaks.

---

## Cross-References
- [[research/rvb-red-blue-game-hardening]] — Game-theoretic defense framework
- [[systems/multi-agent-collusion-monitor]] — Agent behavior monitoring
- [[concepts/goal-hierarchy-hijack]] — Subverting agent coordination
