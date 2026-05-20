---
title: "xOffense: An Autonomous Multi-Agent Framework for Penetration Testing with Domain-Adapted LLMs"
type: research
status: active
summary: "Multi-agent penetration testing framework using domain-adapted LLMs with 79.17% sub-task completion rate"
source_of_truth:
  - "https://arxiv.org/abs/2509.13021"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# xOffense: An Autonomous Multi-Agent Framework for Penetration Testing with Domain-Adapted LLMs

## Research Overview

xOffense introduces a multi-agent framework for autonomous penetration testing, leveraging fine-tuned Qwen3-32B models specialized for offensive security tasks. The framework employs distinct agents for reconnaissance, vulnerability scanning, and exploitation, coordinating through a structured pipeline to achieve end-to-end penetration testing automation.

## Key Contributions

- Multi-agent architecture with role-specialized LLMs for recon, vuln scanning, and exploitation phases
- Domain adaptation via fine-tuning Qwen3-32B on pentest-specific datasets
- Achieves 79.17% sub-task completion rate, outperforming GPT-4 and Llama 3-based agents
- Structured coordination protocol between specialized agents for sequential PT workflows
- Empirical validation across multiple CTF-style and real-world vulnerable environments

## Relevance to AI Security

xOffense demonstrates the ceiling of current LLM-driven offensive automation, providing a benchmark for red team tooling capability. Understanding its architecture informs defensive priorities—particularly where domain-adapted models outperform general-purpose LLMs in security tasks.

## Source

[https://arxiv.org/abs/2509.13021](https://arxiv.org/abs/2509.13021)
