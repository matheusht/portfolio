---
title: "ROME: Red-team Orchestrated Multi-agent Evolution for Agent Safety Judgment"
type: research
status: active
summary: "Controlled benchmark-rewriting pipeline that transforms 100 unsafe trajectories into 300 deceptive evaluation instances covering contextual ambiguity, implicit risks, and shortcut decision-making."
source_of_truth:
  - "https://arxiv.org/abs/2605.03242"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# ROME: Red-team Orchestrated Multi-agent Evolution for Agent Safety Judgment

## Research Overview

ROME introduces a controlled benchmark-rewriting pipeline that uses multi-agent orchestration to generate adversarial evaluation instances for agent safety judgment. Starting from 100 unsafe agent trajectories, ROME evolves them into 300 deceptive test cases designed to probe subtle safety reasoning failures in LLM-based agents.

## Key Contributions

- Designed a multi-agent evolution framework that systematically mutates unsafe trajectories into diverse adversarial evaluation instances.
- Generated 300 deceptive test cases covering three failure modes: contextual ambiguity, implicit risk detection, and shortcut decision-making.
- Demonstrated that current safety judges (LLM-as-judge, reward models) perform significantly worse on ROME-evolved instances than on original trajectories.
- Provided a taxonomy of deceptive safety evaluation patterns applicable to automated red teaming pipelines.

## Relevance to AI Security

ROME directly addresses the problem of evaluation saturation, where safety benchmarks become too easy over time. The benchmark-rewriting approach enables continuous generation of fresh, challenging test cases. For red teaming, the multi-agent evolution methodology is directly applicable to automated safety evaluation at scale.

## Source

[https://arxiv.org/abs/2605.03242](https://arxiv.org/abs/2605.03242)
