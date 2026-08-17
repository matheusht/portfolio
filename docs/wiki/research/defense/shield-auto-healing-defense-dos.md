---
title: "SHIELD: Auto-Healing Multi-Agent Defense Framework for LLM Resource DoS (2026)"
type: research
status: active
summary: "First auto-healing agentic defense against sponge/DoS attacks. Multi-agent closed loop with Defense Agent, Knowledge Updater Agent, and Prompt Optimization Agent. No model retraining."
source_of_truth:
  - "https://arxiv.org/abs/2601.19174"
updated_by: "Antigravity"
updated_at: 2026-05-26
---

# SHIELD: Auto-Healing DoS Defense

## Research Overview

- **Reference:** [arXiv:2601.19174](https://arxiv.org/abs/2601.19174) (SHIELD: Self-Healing Intelligent Evolving LLM Defense).
- **Context:** LLM sponge attacks induce excessive computation and DoS. Existing defenses use statistical filters that fail on semantic attacks or static LLM detectors that can't adapt.
- **Key Contribution:** Training-free, self-healing multi-agent defense with a closed feedback loop.

---

## Architecture

### Defense Pipeline (3 stages)
1. **Semantic Similarity Retrieval** — matches against known sponge patterns
2. **Substring-Level Detection** — efficient pattern matching
3. **LLM-Based Reasoning** — semantic judgment for ambiguous cases

### Knowledge Updating Pipeline
- **Knowledge Updater Agent (KUA):** Triggered when attack bypasses detection. Retrieves related patterns, isolates malicious segments via controlled probing, expands attack knowledgebase
- **Prompt Optimization Agent (POA):** Refines defense instructions via evolutionary prompt search when attack cache is updated

## Attack Implication

SHIELD's auto-healing loop is its strength and weakness. When an attack bypasses detection, the system learns and adapts — but the adaptation is **prompt-level, not model-level**. If the attacker can generate variants faster than the prompt optimization loop converges, they can stay ahead. The KUA uses controlled probing to isolate attack segments — if the attack is designed to be indistinguishable from benign traffic in isolated segments, the KUA can't learn effectively.

---

## Cross-References
- [[concepts/clawdrain-cost-dos]] — Cost-based DoS attacks
- [[concepts/infinite-thinking-loop]] — Reasoning loop exhaustion
- [[systems/self-healing-alignment-pipeline]] — Complementary self-healing approach
