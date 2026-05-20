---
title: "SearchAttack: Red-Teaming LLMs against Real-World Threats via Framing Unsafe Web Information-Seeking Tasks"
type: research
status: active
summary: "Outsources harmful semantics to the open web for intent obfuscation, testing search-augmented LLMs against real-world threats."
source_of_truth:
  - "https://arxiv.org/abs/2601.04093"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# SearchAttack: Red-Teaming LLMs against Real-World Threats via Framing Unsafe Web Information-Seeking Tasks

## Research Overview

SearchAttack introduces a novel red teaming approach that outsources harmful semantics to the open web, allowing adversaries to obfuscate malicious intent by framing attacks as benign web information-seeking tasks. The method specifically targets search-augmented LLMs and reveals that widely adopted joint defenses—combining safety prompts with safety injection—fail catastrophically against this attack paradigm.

## Key Contributions

- Proposes intent obfuscation by shifting harmful semantic content from the prompt to web search results
- Demonstrates high attack success rates against search-augmented frontier models
- Shows that combined safety prompt + safety injection defenses are jointly insufficient against SearchAttack
- Tests across multiple retrieval-augmented generation configurations
- Highlights a fundamental blind spot in current defense strategies for RAG-enabled systems

## Relevance to AI Security

SearchAttack exposes a critical vulnerability in retrieval-augmented language models: defenses that assume harm resides in the prompt fail when harm enters through search results. For red teaming practitioners, this paper is essential for designing evaluations that account for multi-vector attacks where context from external sources bypasses prompt-level filters.

## Source

[https://arxiv.org/abs/2601.04093](https://arxiv.org/abs/2601.04093)
