---
title: "When AI Meets the Web: Prompt Injection Risks in Third-Party AI Chatbot Plugins"
type: research
status: active
summary: "First large-scale study of 17 third-party chatbot plugins used by 10,000+ websites, finding 8/17 fail to enforce conversation history integrity and 15 introduce indirect prompt injection risk."
source_of_truth:
  - "https://arxiv.org/abs/2511.05797"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# When AI Meets the Web: Prompt Injection Risks in Third-Party AI Chatbot Plugins

## Research Overview

Published at IEEE S&P 2026, this paper presents the first large-scale measurement study of prompt injection risks in third-party AI chatbot plugins deployed across the web. The authors analyzed 17 commercially available chatbot plugins used by over 10,000 websites, systematically evaluating conversation history integrity and indirect prompt injection attack surfaces introduced by web-scraping capabilities. The study reveals systemic security failures across the plugin ecosystem.

## Key Contributions

- Discovered that 8 out of 17 chatbot plugins fail to enforce conversation history integrity, allowing attackers to manipulate prior turns and hijack ongoing sessions.
- Found that 15 out of 17 plugins introduce indirect prompt injection risk via integrated web-scraping tools that process untrusted external content.
- Conducted the first systematic, cross-plugin measurement of prompt injection vulnerabilities in production chatbot plugins at web scale.
- Demonstrated concrete attack chains combining history manipulation with indirect injection to achieve persistent compromise.

## Relevance to AI Security

This work directly quantifies the real-world attack surface introduced by third-party integrations in the AI chatbot supply chain. For red teaming, the findings provide a validated methodology for auditing plugin security and highlight that indirect prompt injection via web content is the norm, not the exception, in current deployments.

## Source

[https://arxiv.org/abs/2511.05797](https://arxiv.org/abs/2511.05797)
