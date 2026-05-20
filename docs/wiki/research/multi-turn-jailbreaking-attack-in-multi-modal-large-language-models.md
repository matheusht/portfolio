---
title: "Multi-turn Jailbreaking Attack in Multi-Modal Large Language Models"
type: research
status: active
summary: "Novel multi-turn jailbreaking attack for MLLMs with a proposed FragGuard defense mechanism, tested across SOTA open-source and closed-source models."
source_of_truth:
  - "https://arxiv.org/abs/2601.05339"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# Multi-turn Jailbreaking Attack in Multi-Modal Large Language Models

## Research Overview

This paper introduces a novel multi-turn jailbreaking attack specifically designed for Multi-Modal Large Language Models (MLLMs), exploiting the iterative dialogue structure to progressively bypass safety alignment. The authors also propose FragGuard, a defense mechanism that detects and fragments multi-turn attack sequences. Evaluation spans both open-source and closed-source state-of-the-art MLLMs.

## Key Contributions

- Developed the first multi-turn jailbreaking attack tailored to the multi-modal context, leveraging cross-turn information leakage across text and image inputs.
- Proposed FragGuard, a lightweight defense that decomposes multi-turn exchanges into atomic fragments for independent safety screening.
- Demonstrated successful jailbreaks across multiple SOTA MLLMs including both open-source (LLaVA, Qwen-VL) and closed-source (GPT-4V, Gemini) families.
- Showed that multi-turn attacks achieve higher success rates than single-turn equivalents by distributing harmful content across turns.

## Relevance to AI Security

Multi-turn attacks represent a critical blind spot in current safety alignment, which typically evaluates single-turn refusal rates. For red teaming, this work provides a concrete attack template and highlights the need for turn-aware safety classifiers. FragGuard offers a practical reference architecture for defense deployment.

## Source

[https://arxiv.org/abs/2601.05339](https://arxiv.org/abs/2601.05339)
