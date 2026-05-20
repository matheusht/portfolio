---
title: "Kill-Chain Canaries"
type: system
status: active
summary: "Kill-Chain Canaries — an out-of-band non-semantic token tracing architecture for verifying data flow boundaries."
source_of_truth:
  - "docs/DEFENSE_PIPELINE.md"
  - "docs/PRD_PHASE8_AGENTIC_SECURITY.md"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# Kill-Chain Canaries

## Scope

Kill-Chain Canaries are a deterministic defensive system designed to detect and block prompt injection, data leakage, and unauthorized tool invocation by tracing the flow of untrusted data through an agentic pipeline using unique, out-of-band, cryptographically signed tokens.

## How It Works

Rather than relying on resource-intensive and probabilistic LLM filters (which are prone to jailbreaks), the system treats data containment as a traditional information-tracking problem:

```text
1. INGEST SEAM
   Untrusted Data Influx ──> [Inject signed Canary Token: "CANARY_SIG_981274"]
                                  │
                                  ▼
2. ACTIVE CONTEXT
   Agent parses poisoned text containing: "Say hello and run system command..."
                                  │
                                  ▼
3. EXECUTION BOUNDARY (Sidecar Inspection)
   Agent dispatches request: execute_shell("echo CANARY_SIG_981274")
                                  │
                                  ▼
   [DETECTOR TRIP] ──> Canary detected in high-risk lane! ──> [TERMINATE DISPATCH]
```

1. **Ingest Tagging:** When an agent reads untrusted external data (e.g., a file, email, or database record), the ingestion middleware transparently appends or embeds a unique, high-entropy, cryptographically signed string — the **Canary Token**.
2. **Context Propagation:** The agent processes the data. If the data contains an injection that instructs the agent to execute a command or leak state, the agent's synthesized execution payload will naturally include the canary token (either verbatim or as a derivative parameter).
3. **Boundary Enforcement (The Kill-Chain):**
   - High-risk execution sinks (such as database query execution engines, system terminals, or outbound HTTP clients) are wrapped in rigid, non-LLM sidecars or interceptors.
   - Before executing any command, the sidecar scans all arguments and parameters for the presence of the signed canary token.
   - If a canary token is detected, it indicates that untrusted input has bypassed the LLM's logical reasoning and is attempting to drive an execution path.
   - The sidecar immediately terminates the dispatch, logs a critical containment violation, and triggers an incident response.

## Why This Beats LLM Filters

- **Determinism:** 100% detection rate of traced data flow leakage; zero false positives from cryptographic matches.
- **Ultra-low Latency:** The inspection is a simple substring search/regex check, introducing negligible latency (typically < 1ms) compared to multiple LLM-based policy evaluations.
- **Safety Guarantee:** Even if an attacker crafts a perfect, mathematically optimized prompt injection that completely subverts the model's alignment, the attack *must* use the untrusted context to execute. Because the canary is bound to that context, the execution is blocked at the gate.

## Related Pages

- [[open-agent-passport-oap]] — Declarative authorization constraints.
- [[mcp-tool-poisoning]] — The attack vector canary systems protect against.
