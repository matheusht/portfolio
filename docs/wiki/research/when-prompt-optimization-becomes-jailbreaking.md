---
title: "When Prompt Optimization Becomes Jailbreaking: Adaptive Red-Teaming of LLMs"
type: research
status: active
summary: "Uses DSPy black-box prompt optimizers to systematically search for safety failures; Qwen 3 8B danger score jumps from 0.09 to 0.79 after optimization"
source_of_truth:
  - "https://arxiv.org/abs/2603.19247"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# When Prompt Optimization Becomes Jailbreaking: Adaptive Red-Teaming of LLMs

## Research Overview

This paper applies DSPy black-box prompt optimizers to systematically probe LLM safety boundaries, treating prompt optimization as an adversarial search process. The method drives Qwen 3 8B's danger score from 0.09 to 0.79, demonstrating how automated optimization exposes severe safety failures.

## Key Contributions

- Frames prompt optimization as a principled jailbreaking search over the prompt space
- Leverages DSPy's black-box optimizers to conduct adaptive red teaming at scale
- Demonstrates a large danger score delta (0.09 to 0.79) on Qwen 3 8B
- Identifies that gradient-free prompt optimization is sufficient to bypass existing safety guardrails

## Relevance to AI Security

This work reveals that standard safety alignment is insufficient against structured prompt optimization. It provides a methodology for continuous, automated safety probing that can be integrated into CI/CD pipelines for model evaluation.

## Source

[https://arxiv.org/abs/2603.19247](https://arxiv.org/abs/2603.19247)
