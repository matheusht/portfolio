---
title: "AegisAgent: An Autonomous Defense Agent Against Prompt Injection Attacks in LLM-HARs"
type: research
status: active
summary: "Autonomous defense agent protecting LLM-powered human activity recognition systems against prompt injection attacks"
source_of_truth:
  - "https://arxiv.org/abs/2512.20986"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# AegisAgent: An Autonomous Defense Agent Against Prompt Injection Attacks in LLM-HARs

## Research Overview

AegisAgent is an autonomous defense agent designed to protect LLM-powered Human Activity Recognition (HAR) systems against prompt injection attacks. It operates as a standalone monitoring layer that detects and mitigates injection attempts in real-time without requiring modifications to the underlying HAR model.

## Key Contributions

- Autonomous defense agent architecture for real-time prompt injection detection in HAR pipelines
- Operates as an external monitoring layer with zero modification to underlying LLM-HAR models
- Detection and mitigation strategies tailored to sensor-grounded agent contexts
- Addresses the unique attack surface where physical sensor data intersects with LLM prompt processing
- Evaluation on HAR-specific injection scenarios demonstrating defense effectiveness

## Relevance to AI Security

AegisAgent represents an agent-defending-agent paradigm that is directly relevant to RedThread's defensive architecture goals. Its external monitoring approach—separating defense from the target model—aligns with modular defense strategies for agentic systems.

## Source

[https://arxiv.org/abs/2512.20986](https://arxiv.org/abs/2512.20986)
