---
title: "DynaTrust: Dynamic Trust-Driven Defense Against Sleeper Agents in Multi-Agent Systems (2026)"
type: research
status: active
summary: "Dynamic trust graph defense against sleeper agents. 92.4% defense success rate vs 48.7% AgentShield. Bayesian trust evolution with inertia and autonomous graph recovery."
source_of_truth:
  - "https://arxiv.org/abs/2603.15661"
updated_by: "Antigravity"
updated_at: 2026-05-26
---

# DynaTrust: Sleeper Agent Defense

## Research Overview

- **Reference:** [arXiv:2603.15661](https://arxiv.org/abs/2603.15661).
- **Context:** Sleeper agents behave benignly during routine operation, gradually accumulate trust, then reveal malicious behavior. Existing defenses rely on fixed security policies.
- **Key Contribution:** Dynamic trust as a continuous, evolving process rather than static attribute. Combines Bayesian trust evolution, trust-confidence weighted consensus, and autonomous graph recovery.

---

## Architecture

### Dynamic Trust Graph (DTG)
- Each agent's trust is continuously updated based on historical behavior
- Bayesian trust evolution with inertia prevents rapid trust manipulation
- Trust-confidence weighted consensus: agents with low trust have reduced influence

### Autonomous Graph Recovery
- Agents below trust threshold are automatically isolated
- Replica agents activated to restore task connectivity
- Communication graph restructured to maintain system function

## Results

- **92.4% DSR** vs 48.7% AgentShield
- DSR above **86%** across all MAS frameworks and LLM backends
- Significant FPR reduction (15.3% → controlled)

## Attack Implication

DynaTrust's Bayesian inertia makes rapid trust manipulation difficult. However, the inertia also means slow, consistent trust-building over many rounds could work. The attacker needs to be patient — compromise a low-sensitivity agent first, use it to build trust through benign behavior over many rounds, then exploit the accumulated trust. The graph recovery mechanism also reveals the system's backup agents — targeting these before they are activated could leave the system without recovery options.

---

## Cross-References
- [[research/groupguard-collusive-attack-defense-mas]] — Collusive attack detection
- [[research/propguard-propagation-aware-mas-defense]] — Propagation tracking
- [[concepts/inter-agent-trust-degradation]] — Trust-based attack vectors
