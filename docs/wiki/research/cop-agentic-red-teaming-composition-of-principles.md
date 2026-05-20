---
title: "CoP: Agentic Red-teaming for Large Language Models using Composition of Principles"
type: research
status: active
summary: "An agentic framework that composes jailbreak principles, achieving 4.8x faster attacks than PAIR and 9.4x faster than TAP with 88.75% ASR against GPT-4."
source_of_truth:
  - "https://arxiv.org/abs/2506.00781"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# CoP: Agentic Red-teaming for Large Language Models using Composition of Principles

## Research Overview

CoP introduces an agentic red teaming framework that composes known jailbreak principles into novel attack strategies, dramatically improving efficiency over prior methods. The framework achieves 4.8x faster attacks than PAIR and 9.4x faster than TAP against Gemini, while reaching an 88.75% attack success rate against GPT-4.

## Key Contributions

- Agentic framework that dynamically composes jailbreak principles into novel attack strategies
- 4.8x faster than PAIR and 9.4x faster than TAP against Gemini Pro
- 88.75% attack success rate against GPT-4
- Modular principle-based attack composition enables combinatorial coverage of attack surface
- Significant reduction in API calls and runtime compared to evolutionary and tree-based methods

## Relevance to AI Security

CoP demonstrates that composing existing jailbreak principles yields dramatically more efficient attacks than generating strategies from scratch, with major implications for defense evaluation timelines. For agentic security, the compositional approach mirrors how real adversaries combine known techniques, making this essential for building fast, scalable red teaming loops and prioritizing defense hardening.

## Source

[https://arxiv.org/abs/2506.00781](https://arxiv.org/abs/2506.00781)
