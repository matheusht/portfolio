---
title: "Securing AI Agents Against Prompt Injection Attacks"
type: research
status: active
summary: "Benchmark with 847 adversarial test cases across 5 attack categories; multi-layered defense reduces attack success rate from 73.2% to 8.7%"
source_of_truth:
  - "https://arxiv.org/abs/2511.15759"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# Securing AI Agents Against Prompt Injection Attacks

## Research Overview

This paper presents a benchmark of 847 adversarial test cases spanning 5 attack categories for evaluating prompt injection defenses in AI agents. The proposed multi-layered defense system reduces attack success rate from 73.2% to 8.7% while maintaining 94.3% of original task performance.

## Key Contributions

- Large-scale benchmark with 847 test cases across 5 prompt injection attack categories
- Multi-layered defense architecture combining input sanitization, prompt monitoring, and output verification
- Attack success rate reduction from 73.2% (undefended) to 8.7% (defended)
- Task performance retention at 94.3%, demonstrating minimal trade-off between security and utility
- Reproducible evaluation framework for comparative defense benchmarking

## Relevance to AI Security

This provides a concrete empirical baseline for measuring prompt injection defense effectiveness. The 8.7% residual ASR and 94.3% task retention figures are reference points for evaluating RedThread's own defense layers, and the 847-case benchmark is a reusable test harness.

## Source

[https://arxiv.org/abs/2511.15759](https://arxiv.org/abs/2511.15759)
