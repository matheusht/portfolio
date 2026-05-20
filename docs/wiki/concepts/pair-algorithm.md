---
title: "PAIR Algorithm"
type: concept
status: active
summary: "Prompt Automatic Iterative Refinement (PAIR) — a closed-loop query-efficient baseline red-teaming algorithm."
source_of_truth:
  - "src/redthread/core/pair.py"
  - "docs/algorithms.md"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# PAIR (Prompt Automatic Iterative Refinement)

## Definition

PAIR is an adversarial red-teaming algorithm that automates the generation of semantic jailbreaks targeting LLMs through a closed-loop, iterative refinement process. Rather than relying on brute-force or token-level optimization, PAIR operates entirely in natural language space.

```text
  ┌──────────────────────────────────────────────────────────┐
  │                                                          │
  ▼                                                          │
┌──────────────┐      ┌──────────────┐      ┌──────────────┐ │
│ Attacker LLM │ ───> │  Target LLM  │ ───> │Evaluator LLM │ │ (Feedback)
│ (Generates   │      │ (Generates   │      │ (Scores      │ │
│ Persuasion)  │      │ Response)    │      │ Output 1-10) │ │
└──────────────┘      └──────────────┘      └──────────────┘ │
                                              │              │
                                              └──────────────┘
```

## Why It Matters

- **Query Efficiency:** Minimizes API cost by finding vulnerabilities in relatively few turns (typically under 20 queries).
- **Semantically Coherent:** Produces jailbreaks that are readable, realistic, and highly persuasive, simulating real-world human social engineering.
- **Closed-Loop Refinement:** Attacker LLM analyzes the refusal or score to recursively adapt its narrative angle using Chain-of-Thought (CoT).

## Core Mechanism

The PAIR process iterates as follows:

1. **System Prompt Formulation:** The Attacker LLM is given an objective (e.g., generate a prompt to extract sensitive personal info).
2. **Generation:** The Attacker LLM outputs a candidate adversarial prompt (persuasion layer).
3. **Execution:** The Target LLM executes the prompt.
4. **Evaluation:** An Evaluator LLM scores the target output against a predefined safety rubric (1 to 10 scale).
5. **Chain-of-Thought Feedback:** The Attacker LLM receives the score and the Target's exact output. It uses this feedback to reason about *why* the attack failed and how to modify its strategy for the next turn.

## Limitations

- **Linear Traversal:** Traverses a single line of persuasion. If the initial angle is completely rejected by the Target's alignment constraints, PAIR can get trapped in local optima and fail to recover.
- **No Branching:** Unlike TAP, PAIR does not maintain multiple alternate paths, making it more query-efficient but less thorough.

## References & Related Pages

- [[tap-algorithm]] — Horizontal expansion tree search that addresses PAIR's linear limitations.
- [[g-eval-scoring]] — Mathematical grading stack for more accurate scoring.
