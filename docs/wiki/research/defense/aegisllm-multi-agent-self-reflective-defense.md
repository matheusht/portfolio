---
title: "AegisLLM: Scaling Agentic Systems for Self-Reflective Defense in LLM Security (2025)"
type: research
status: active
summary: "Cooperative multi-agent defense (orchestrator/deflector/responder/evaluator) with DSPy prompt optimization. Inference-time defense without model retraining."
source_of_truth:
  - "https://arxiv.org/abs/2504.20965"
updated_by: "Antigravity"
updated_at: 2026-05-26
---

# AegisLLM: Self-Reflective Multi-Agent Defense

## Research Overview

- **Reference:** [arXiv:2504.20965](https://arxiv.org/abs/2504.20965).
- **Context:** Existing defenses rely on model modifications (fine-tuning, representation engineering) that are expensive and can't adapt to evolving attacks in real time.
- **Key Contribution:** Inference-time defense via cooperative multi-agent system with Bayesian prompt optimization. Scales security by adding agent roles rather than retraining.

---

## Architecture

### Four Cooperative Agents
1. **Orchestrator:** Routes queries based on security assessment
2. **Deflector:** Handles potentially unsafe inputs with redirection strategies
3. **Responder:** Generates appropriate outputs for safe queries
4. **Evaluator:** Continuous safety verification of all outputs

### Self-Improvement
- **Bayesian prompt optimization** (MIPROv2) iteratively refines defense instructions
- Agents share a backbone LLM but have distinct system prompts
- Self-reflective loop: evaluator feedback drives prompt refinement

## Results
- Outperforms static defenses on WMDP unlearning benchmarks
- Improves robustness without compromising utility
- Adapts to evolving attacks without retraining

## Attack Implication

Since all four agents share a backbone LLM, a jailbreak that compromises the backbone affects all agents simultaneously. The modular prompt architecture is also a potential injection surface — if an attacker can reverse-engineer the system prompts (via prompt leakage), they can craft inputs that pass the Orchestrator, bypass the Deflector, and reach the Responder before the Evaluator can intervene.

---

## Cross-References
- [[research/coopguard-cooperative-multiagent-defense]] — Similar multi-agent defense approach
- [[research/safeagent-runtime-protection-architecture]] — Runtime governance alternative
- [[concepts/pair-algorithm]] — Automated jailbreak generation against this architecture
