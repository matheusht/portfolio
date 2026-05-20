---
title: "Automatic LLM Red Teaming"
type: research
status: active
summary: "Formalizes red teaming as a Markov Decision Process (MDP) using hierarchical RL to learn coherent multi-turn attack strategies."
source_of_truth:
  - "https://arxiv.org/abs/2508.04451"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# Automatic LLM Red Teaming

## Research Overview

This paper formalizes the red teaming of large language models as a Markov Decision Process (MDP), enabling the use of hierarchical reinforcement learning to discover multi-turn attack strategies. The approach learns coherent, adaptive attack trajectories rather than relying on single-turn prompt engineering, achieving state-of-the-art results across multiple target models.

## Key Contributions

- Reframes red teaming from static prompt crafting to a dynamic, trajectory-based optimization problem using MDP formalism
- Introduces hierarchical RL architecture that learns both high-level attack goals and low-level token/action selection
- Demonstrates coherent multi-turn attack strategies that adapt based on model responses
- Achieves state-of-the-art attack success rates across multiple frontier LLMs
- Provides a principled framework for automated, scalable red teaming without manual prompt engineering

## Relevance to AI Security

This work fundamentally reframes red teaming as a learnable, dynamic process rather than a static adversarial search. For agentic security, the MDP-based approach directly maps to how real adversaries operate—adapting strategies based on observed defenses—making it essential reading for building robust evaluation pipelines and automated red teaming infrastructure.

## Source

[https://arxiv.org/abs/2508.04451](https://arxiv.org/abs/2508.04451)
