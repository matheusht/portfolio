---
title: "Constitutional Classifiers v2: Production-Grade Jailbreak Defense (Anthropic, 2026)"
type: research
status: active
summary: "Production deployment with 0.05% flag rate, 40x cost reduction, 8x cascade efficiency. No universal jailbreak found across 1,736 hours of red teaming (~198K attempts)."
source_of_truth:
  - "https://arxiv.org/abs/2601.04603"
updated_by: "Antigravity"
updated_at: 2026-05-26
---

# Constitutional Classifiers v2

## Research Overview

- **Reference:** [arXiv:2601.04603](https://arxiv.org/abs/2601.04603). Anthropic.
- **Context:** Extends Constitutional Classifiers (Sharma et al., 2025) to production-grade deployment with much lower overhead.
- **Key Contribution:** Weighted two-stage cascade using linear probes as first stage, probe-external classifier ensemble as second stage.

---

## Architecture

### Exchange Classifiers
Replace input/output-only classifiers with context-aware evaluation — outputs are assessed within their conversational context to prevent obfuscation attacks.

### Classifier Cascade
- **Stage 1:** Linear probe (activation-based) — lightweight, screens all traffic
- **Stage 2:** Probe-external classifier ensemble — triggered only for flagged content (~5.5% of traffic)

### Production Results
- **Flag rate:** 0.05% (vs 0.38% in Sharma et al., 2025)
- **Computational overhead:** 40x reduction vs single exchange classifier, 8x vs two-stage without probes
- **Red teaming:** ~1,736 hours, ~198K attempts
- **Universal jailbreak:** None found capable of answering all 8 target questions

## Attack Implication

No universal jailbreak was found, but this doesn't mean no jailbreak exists — only that none was discovered in ~198K attempts. The defense relies on:
1. The linear probe capturing activation patterns of known attack families
2. The ensemble covering edge cases the probe misses

Attackers should focus on attacks that produce activation patterns **orthogonal to the probe's training distribution** — e.g., entirely new attack families that don't resemble seen jailbreak patterns.

---

## Cross-References
- [[research/constitutional-classifiers-synthetic-safety-2025]] — Original CC paper
- [[research/trajguard-decoding-time-jailbreak-defense]] — Complementary decoding-time approach
- [[research/selfgrader-logit-jailbreak-detection]] — Alternative lightweight detection
