---
title: "Open Agent Passport (OAP)"
type: entity
status: active
summary: "Open Agent Passport (OAP) — an open specification for deterministic cryptographically signed capability verification in tool calls."
source_of_truth:
  - "docs/wiki/entities/open-agent-passport.md"
  - "docs/AGENTIC_SECURITY_RUNTIME.md"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# Open Agent Passport (OAP)

## What It Is

The **Open Agent Passport (OAP)** is an open, cryptographic specification designed to enforce least-privilege access control on autonomous agent tools. Rather than trusting the LLM to decide whether it has permission to execute a tool, OAP intercepts tool calls at the runtime boundary and evaluates a cryptographically signed, declarative capability passport.

```text
┌─────────────────┐
│  LLM Orchestrator│
└────────┬────────┘
         │
         │ Dispatches Tool Call: init_project(path="/var/www")
         ▼
┌──────────────────┐      Cryptographic Verification
│  OAP Middleware  │ ◄───────────────────────────────── [Checks Passport Signatures]
└────────┬─────────┘
         ├──────────────────────┐
         ▼                      ▼
  [Passes Policy]        [Fails Policy]
  Dispatches to Tool     Blocks & Returns Refusal
```

## Core Responsibilities

- **Origin Verification:** Verifies that a tool call was authorized by a chain of trust originating from the user session, not synthesized entirely by an injected LLM context.
- **Declarative Limit Enforcement:** Enforces strict execution boundaries (e.g., maximum spend limits, allowed directory ranges, read-only permissions, destination IP whitelisting).
- **Latency Optimization:** Intercepts and validates authorizations with a median latency of **53 ms**, ensuring safety without degrading system performance.

## The OAP Schema

An OAP passport is typically structured as a JSON Web Token (JWT) or a signed JWS containing claims:

```json
{
  "iss": "auth.avenzacloud.com",
  "sub": "user_session_928174",
  "aud": "redthread.agent.runtime",
  "exp": 1779283740,
  "capabilities": {
    "file_system": {
      "allowed_roots": ["/Users/matheusvsky/Documents/personal/portfolio"],
      "allow_write": true
    },
    "database": {
      "allowed_tables": ["public_projects", "contact_info"],
      "max_rows_limit": 100
    },
    "network": {
      "allowed_domains": ["api.github.com", "api.avenza.co"]
    }
  },
  "signature": "MEQCIFm93u..."
}
```

## Why It Matters

In an agentic environment, safety prompts (e.g., *"You must never access files outside the workspace"* ) are probabilistic and easily defeated by simple jailbreaks.

OAP shifts security from **probabilistic prompt enforcement** to **deterministic system enforcement**. If an agent is jailbroken and attempts to execute a tool that exceeds the signed boundaries defined in its passport, the OAP middleware blocks the invocation at the system gateway, entirely bypassing the LLM.

## Related Pages

- [[kill-chain-canaries]] — Non-semantic data tracing.
- [[mcp-tool-poisoning]] — The attack surface OAP secures.
