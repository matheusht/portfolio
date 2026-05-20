---
title: "PEAR: Planner-Executor Agent Robustness Benchmark"
type: research
status: active
summary: "An analysis of the PEAR benchmark assessing functional utility and security vulnerabilities across the planner-executor interface in multi-agent systems."
source_of_truth:
  - "https://arxiv.org/abs/2510.02424"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# PEAR: Planner-Executor Agent Robustness Benchmark

## Research Overview

*   **Reference:** PEAR Benchmark (2025-2026) — *"Planner-Executor Agent Robustness Benchmark"*
*   **Focus:** Evaluation of Multi-Agent Systems (MAS) utilizing a **planner-executor** architecture (e.g., OS-Copilot, ADaPT).
*   **Key Insight:** Security boundaries in multi-agent systems are structurally distinct from single-agent setups. The benchmark systematically tests how vulnerability at the coordination boundary (planner-to-executor communication) impacts both overall task utility and susceptibility to hijacking.

---

## The Planner-Executor Attack Surface

In a standard planner-executor MAS, the **Planner** acts as the architect, decomposing user goals into a sequence of steps, while the **Executor** consumes those steps and invokes local tools.

```text
  [ User Goal ]
        │
        ▼
┌──────────────┐                  ┌──────────────┐
│  Planner     ├─► [Steps] ──────►│  Executor    ├─► [Tool Calls]
│  (Architect) │   ▲              │  (Worker)    │
└──────────────┘   │              └──────────────┘
                   │
             [ Injection ]
             (Adversary intercepts or injects steps)
```

PEAR defines three distinct attack surfaces at this interface:
1.  **Direct Planner Injection:** Hijacking the high-level planning instructions to force the generation of malicious step decompositions.
2.  **Inter-Agent Communication Poisoning:** Injecting adversarial instructions directly into the message queue sent from the Planner to the Executor.
3.  **Executor System Poisoning:** Manipulating tool outputs processed by the Executor to trick it into returning compromised variables back to the Planner's memory loop.

---

## Benchmark Composition & Metrics

PEAR evaluates multi-agent systems across three distinct dimensions using a total of **1,884 test cases**:

| Scenario Type | Number of Cases | Target Metric Evaluated |
| :--- | :--- | :--- |
| **User Tasks (Clean)** | 84 | Functional Utility & Planning Accuracy |
| **Base Attack Tasks** | 120 | Out-of-Context Jailbreak Resistance |
| **Injection Attacks** | 1,680 | Susceptibility to Indirect Prompt Injection (IPI) |

### Performance-Robustness Trade-Off

The benchmark mathematically highlights a clear trade-off between clean-task reasoning capability and adversarial robustness. Highly expressive planners that easily adapt plans to complex environments are structurally *more* vulnerable to prompt-guided hijacking:

$$\text{Robustness}(S) \propto \frac{1}{\text{Utility}(S)}$$

Where:
*   $\text{Utility}(S)$ measures the planner's entropy of action selection under clean tasks.
*   Highly flexible planners exhibit higher dynamic range, making them easier for external adversarial payloads to steer.

---

## Core Empirical Findings

1.  **Planner Vulnerability Dominates:** Hardening the executor is mostly irrelevant if the planner is compromised. A weak or compromised planner degrades overall system security and utility by over 80%.
2.  **Memory Paradox:** While a shared memory module is essential for the planner to maintain continuity, it acts as a primary storage vector for persistent injection payloads, allowing attacks to survive restarts.
3.  **Role of Isolation:** Inter-agent communication protocols require cryptographic validation and sanitization. Relying on raw natural language text transfer between agents allows trivial control-flow hijacking.

---

## Cross-References
*   **Poisoning Scenarios:** [[concepts/mcp-tool-poisoning]]
*   **Privilege Corruptions:** [[concepts/confused-deputy-delegation]]
*   **Defensive Audits:** [[concepts/regression-replay-evidence]]
