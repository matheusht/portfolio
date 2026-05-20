---
title: "Dialogue Injection Attack: Jailbreaking LLMs through Context Manipulation"
type: research
status: active
summary: "A novel jailbreak paradigm leveraging dialogue history with gray-box prefilling attacks and deferred responses, achieving SOTA ASR on Llama-3.1 and GPT-4o while bypassing 5 defense mechanisms."
source_of_truth:
  - "https://arxiv.org/abs/2503.08195"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# Dialogue Injection Attack: Jailbreaking LLMs through Context Manipulation

## Research Overview

This paper introduces Dialogue Injection Attack (DIA), a novel jailbreak paradigm that leverages dialogue history rather than individual prompt engineering to compromise LLM safety. The authors propose two methods—gray-box prefilling attacks that exploit token generation patterns and deferred responses that gradually escalate harmful content—achieving state-of-the-art attack success rates on Llama-3.1 and GPT-4o while bypassing five established defense mechanisms.

## Key Contributions

- Introduces dialogue history as an attack vector, shifting from single-turn to multi-turn context manipulation
- Gray-box prefilling attack exploits predictable token generation patterns to insert harmful content
- Deferred response method gradually escalates harmful requests across dialogue turns
- State-of-the-art ASR on Llama-3.1 and GPT-4o
- Successfully bypasses 5 defense mechanisms including PromptShield and Palisade

## Relevance to AI Security

DIA reveals that safety alignment can be eroded across turns by manipulating dialogue context—a critical finding for any multi-turn agentic system. For red teaming, this paper demands evaluation designs that test not just individual prompts but entire conversation trajectories, and for defense, it shows that per-turn safety filters are insufficient against context-level attacks.

## Source

[https://arxiv.org/abs/2503.08195](https://arxiv.org/abs/2503.08195)
