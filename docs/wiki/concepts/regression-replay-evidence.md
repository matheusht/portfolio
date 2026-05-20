---
title: "Regression Replay Evidence"
type: concept
status: active
summary: "Regression Replay Evidence — bounded test suites that turn successful attack traces into deterministic validation gates for guardrail candidates."
source_of_truth:
  - "src/redthread/research/promotion.py"
  - "docs/DEFENSE_PIPELINE.md"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# Regression Replay Evidence

## Definition

Regression Replay Evidence is the security practice of capturing successful adversarial jailbreak or prompt-injection dialogue trajectories and turning them into static, repeatable regression tests. This ensures that any synthesized defensive guardrails can be proven to block the exact failure modes before they are promoted to production.

```text
       [Confirmed Failure Trace]
                  │
                  ▼
       [Extract Minimal Payload]
                  │
                  ▼
       [Propose Candidate Guardrail]
                  │
                  ▼
       [Replay Payload against Guardrail]
                  │
                  ▼
      ┌─────────────────────────┐
      │     Does Judge score    │
      │   a Complete Block (1)? │
      └───────────┬─────────────┘
            Yes   │   No
                  ▼       ▼
      [Promote Guardrail] [Reject Candidate]
```

## Why It Matters

- **Evidence-Based Security:** Eliminates "hope-based engineering" by verifying that a proposed guardrail actually stops the real-world attack that bypassed the system.
- **No Regression:** Prevents future model updates or prompt changes from re-introducing previously patched vulnerabilities.
- **Automated Validation:** Integrates into standard CI/CD pipelines as unit tests for LLM system safety.

## The Replay Workflow

1. **Trace Ingestion:** When a campaign execution scores a successful exploit (e.g., a 10/10 jailbreak score on G-Eval), the complete conversational trace is saved in JSON/YAML format.
2. **Payload Extraction:** The engine isolates the minimal triggering payload (e.g., the specific persuasion prompt or indirect prompt injection).
3. **Defense Synthesis:** The system's Defense Architect generates a candidate defensive guardrail (e.g., a system prompt extension, input filter, or declarative passport policy).
4. **Dry-Run Replay:** The isolated payload is replayed directly against the target system with the candidate guardrail active.
5. **Verification Gate:** The JudgeAgent evaluates the replay trace. If the score is high (exploit still succeeded), the candidate guardrail is rejected. If the score is low (exploit completely blocked), the guardrail passes and is compiled into the baseline registry.

## Related Pages

- [[prometheus-2-evaluator]] — The open-source judge used for evaluating blocks.
- [[open-agent-passport-oap]] — Deterministic, declarative authorization guardrails.
