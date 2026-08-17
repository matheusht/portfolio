---
title: "TrajGuard: Decoding-Time Jailbreak Defense via Hidden State Trajectories (2026)"
type: research
status: active
summary: "Training-free defense monitoring hidden-state trajectories during decoding. 95% detection rate, 5.2ms/token overhead, <1.5% FPR. First decoding-time jailbreak defense."
source_of_truth:
  - "https://arxiv.org/abs/2604.07727"
updated_by: "Antigravity"
updated_at: 2026-05-26
---

# TrajGuard: Decoding-Time Defense

## Research Overview

- **Reference:** [arXiv:2604.07727](https://arxiv.org/abs/2604.07727).
- **Context:** Jailbreak intent often remains camouflaged in static inputs, but decoding trajectories inevitably drift toward harmful regions.
- **Key Contribution:** Discovers the "unmasking effect" — hidden states during decoding expose jailbreak risk more reliably than static input analysis.

---

## Method

### Coarse-to-Fine Architecture
1. **Streaming Geometric Surveillance (SGS):** Continuously monitors hidden states in critical layers, tracks risk via geometric patterns in representation space
2. **PAIR-Judge:** Semantic-level review triggered only when SGS detects persistent anomaly — transforms high-dimensional internal signals into interpretable safety decisions

### Persistence Triggering
Genuine jailbreaks manifest as sustained residence in high-risk regions, not transient spikes.

## Results
- **Average defense rate:** 95% across 12 jailbreak attacks
- **Latency:** 5.2 ms/token
- **FPR:** Below 1.5%
- Outperforms all static guardrail baselines

## Attack Implication

Since TrajGuard monitors **internal representations** during decoding, not input text, traditional prompt obfuscation won't work. However, it requires access to hidden states — it's a white-box or gray-box defense. For black-box API access to the model, it's not applicable. Within a white-box setting, attackers would need to find jailbreaks that don't produce distinctive hidden-state trajectories — potentially through very gradual steering that stays within the "safe" region of the representation space.

---

## Cross-References
- [[research/constitutional-classifiers-v2-production-defense]] — Input/output guardrail approach
- [[research/selfgrader-logit-jailbreak-detection]] — Logit-based detection
- [[research/safeagent-runtime-protection-architecture]] — Runtime governance
