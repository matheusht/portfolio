---
title: "A Framework for Formalizing LLM Agent Security"
type: research
status: active
summary: "Formal security framework (UC Berkeley/Dawn Song) defining 4 core properties: task alignment, action alignment, source authorization, and data isolation"
source_of_truth:
  - "https://arxiv.org/abs/2603.19469"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# A Framework for Formalizing LLM Agent Security

## Research Overview

This paper from UC Berkeley (Dawn Song's group) establishes formal security properties for LLM agents: task alignment, action alignment, source authorization, and data isolation. It reframes common attacks—indirect prompt injection (IPI), jailbreaks, task drift, and memory poisoning—as violations of these well-defined properties.

## Key Contributions

- Four formal security properties: task alignment, action alignment, source authorization, data isolation
- Reformalization of attacks as property violations (IPI → source authorization failure, jailbreak → task alignment violation)
- Compositional reasoning about agent security across multiple interaction turns
- Formal definitions enable provable guarantees rather than empirical heuristics
- Bridges the gap between traditional security principles and LLM agent architectures

## Relevance to AI Security

This formalization is foundational for building verifiable red team evaluations. Rather than ad-hoc attack taxonomies, it provides property-based testing targets—allowing defenders to certify whether an agent satisfies task alignment or data isolation under specified conditions.

## Source

[https://arxiv.org/abs/2603.19469](https://arxiv.org/abs/2603.19469)
