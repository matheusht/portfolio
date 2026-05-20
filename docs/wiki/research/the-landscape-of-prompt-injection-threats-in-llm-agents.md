---
title: "The Landscape of Prompt Injection Threats in LLM Agents: From Taxonomy to Analysis"
type: research
status: active
summary: "Comprehensive taxonomy of prompt injection vectors in agent contexts, covering direct, indirect, memory-based, and tool-based injection"
source_of_truth:
  - "https://arxiv.org/abs/2602.10453"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# The Landscape of Prompt Injection Threats in LLM Agents: From Taxonomy to Analysis

## Research Overview

This paper develops a detailed taxonomy of prompt injection attacks specifically within LLM agent contexts, categorizing vectors into direct, indirect, memory-based, and tool-based injection classes. It further analyzes existing defense mechanisms mapped against each injection category.

## Key Contributions

- Four-category injection taxonomy: direct, indirect, memory-based, and tool-based prompt injection
- Systematic analysis of injection mechanisms exploiting agent-specific features (tool calls, memory retrieval, multi-step reasoning)
- Defense mapping showing coverage gaps, particularly for memory-based and tool-based vectors
- Categorization of attack severity based on agent capability exposure (read, write, execute)
- Identifies prompt injection as the primary vulnerability class distinguishing agents from standalone LLMs

## Relevance to AI Security

This taxonomy directly informs red team playbook construction for agentic systems—each injection category maps to distinct testing techniques and tooling requirements. The identified defense gaps (especially memory-based injection) highlight priority areas for evaluation and mitigation development.

## Source

[https://arxiv.org/abs/2602.10453](https://arxiv.org/abs/2602.10453)
