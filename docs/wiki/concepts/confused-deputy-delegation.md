---
title: "Confused Deputy Delegation"
type: concept
status: active
summary: "Confused Deputy Delegation — privilege laundering across multi-agent systems where lower-privilege workers trick higher-privilege orchestrators."
source_of_truth:
  - "docs/AGENTIC_SECURITY_THREAT_MODEL.md"
  - "docs/PRD_PHASE8_AGENTIC_SECURITY.md"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# Confused Deputy Delegation (Multi-Agent Privilege Laundering)

## Definition

Confused Deputy Delegation is a multi-agent vulnerability where a lower-privilege agent (e.g., a simple web scraper or email reader) is poisoned to write malicious state modifications. A higher-privilege agent (e.g., a database administrator or deployment manager) reads this shared state and executes unauthorized actions, acting as a "confused deputy" without verifying the origin of the instructions.

```text
┌──────────────────┐     Reads Poisoned Source
│  Scraper Agent   │ ───────────────────────────────> (Data contains inject)
│ (Low Privilege)  │
└────────┬─────────┘
         │
         │ Writes task/state updates
         ▼
┌──────────────────┐
│ Shared State /   │ ◄─────────────────────────────── [Orchestrator directs handoff]
│ LangGraph State  │
└────────┬─────────┘
         │
         │ Reads state as internal instructions
         ▼
┌──────────────────┐
│ DB Admin Agent   │ ───> Executes Unauthorized Action
│ (High Privilege) │      (e.g., Writes/Deletes DB)
└──────────────────┘
```

## How It Appears in Multi-Agent Graphs

In modern LangGraph or multi-agent architectures, agents coordinate by writing to a shared state object or database:

1. **The Ingestion Seam:** The *Scraper Agent* ingests untrusted text. It writes a summary to the shared state: `{"task_status": "Complete. Source requested database backup validation."}`.
2. **Context Laundering:** The *Orchestrator* reads this state. Because the text originates from an internal worker agent, the orchestrator trusts the request.
3. **Execution Command:** The orchestrator routes the flow to the *DB Admin Agent*, commanding it: `"Proceed with database backup validation"`.
4. **Privilege Abuse:** The DB Admin executes a high-risk tool call, completing an action that the external attacker had no direct privilege to execute. The privilege boundary was completely laundered through the low-privilege worker's context update.

## The Architectural Flaw

The vulnerability stems from **cosmetic role separation**. Developers assume that separating prompts (e.g., "You are a web researcher" and "You are a secure DB admin") creates security boundaries. However, natural language is porous; without deterministic, cryptographic token tracking or declarative access control at the execution layer, a high-privilege agent cannot verify *who* initiated the current instructions in the state path.

## Mitigations

- **Least Privilege Execution:** The database tool must require cryptographic authentication tied to the user session, not the LLM's state.
- **State Origin Tracking (Provenance):** Mark all fields written by low-privilege agents as "untrusted." High-privilege agents must be restricted from reading untrusted state keys.
- **Cryptographic Capability Passports:** Enforcing OAP-style pre-action checks to verify that the execution chain has valid permission signatures.

## Related Pages

- [[open-agent-passport-oap]] — Cryptographically signed declarative limits.
- [[mcp-tool-poisoning]] — Tool return hijack mechanisms.
- [[research/agents-of-chaos]] — Live study documenting compliance with non-owners and partial takeover.
- [[research/pear-benchmark-robustness]] — Standardized planner-executor coordination injection testing.
- [[research/mast-agent-failure-taxonomy]] — Categorizing inter-agent synchronization and alignment failures.
