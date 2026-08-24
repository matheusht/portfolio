# Autoresearch ledger — matheus.theodoro.dev agentic readiness

Model: karpathy/autoresearch loop applied to the Is Agentic score.
Metric: `npx -y is-agentic matheus.theodoro.dev --json` → `.score` (published model).
Secondary evidence: raw Ora scan via `GET https://is-agentic.com/api/scan/stream?target=<url>&force=1` (SSE, `scan_complete` event).
Baseline: **69/100** published (Essential 62.9/80, Recommended 4.4/20, bonus 1.7), scanned 2026-08-24T02:15:59Z.

| # | Check targeted | Hypothesis | Change | Verdict |
|---|----------------|------------|--------|---------|
| E1a | markdown-negotiation-vary (Essential, failed) | Conditional vercel.json rewrites on Accept header serve .md twins | `.md` twins for all pages + `rewrites` with `has` header conditions + Vary/content-type headers | **Partially reverted** — rewrites never fired: filesystem precedence beats `rewrites` when source is an existing file |
| E1b | markdown-negotiation-vary (Essential, failed) | Legacy `routes` array placed before `{handle: filesystem}` escapes FS precedence | 3 stacked has-variants per path (exact string / pre object / suf object) cover realistic Accept headers | **Kept** — live: `/` serves text/markdown; charset=utf-8 with Vary: Accept; browsers get HTML; raw checks markdown-negotiation, markdown-negotiation-vary, markdown-url-fallback, markdown-link-alternate all pass |
| E2 | agent-friendly-404 (Essential, partial) | Real 404 whose body carries recovery links earns full credit | `src/pages/404.astro` + 404.md twin; body links home, sitemap.xml, llms.txt, blog, experience | **Kept** — live: HTTP 404 + recovery links verified by curl |
| E3 | sitemap (Recommended, failed) | Valid XML sitemap at exact /sitemap.xml path + crawler policy | Hand-rolled sitemap generation from built pages (posts carry lastmod = pubDate) + public/robots.txt referencing it | **Kept** — live: /sitemap.xml valid, 11 URLs |
| E4 | agent-instruction (Recommended, failed) + llms-txt-exists | llmstxt.org v2 file with explicit "when to use this site" section + describedby link tags | Generated /llms.txt (H1, blockquote, when-to-use, pages, articles, machine-readable resources, optional profiles); `<link rel="describedby">` in BaseLayout | **Kept** — live |
| E5 | json-ld (Recommended, failed) | Person + WebSite graph with sameAs entity linking parses identity programmatically | schema.org @graph in BaseLayout head | **Kept** — live. Note: originally shipped with Avenza Organization node; removed after owner correction (see E7b) |
| E6 | metadata-completeness (Recommended, partial) | canonical + og:image + og:type complete the 4 metadata signals | Canonical per page, zero-dependency PNG writer generating og.png 1200x630 + favicon.ico, OG/Twitter meta | **Kept** — live |
| E7a | trust-anchors (Recommended, partial) | /about, /contact, /privacy with ≥500 chars verify legitimacy | Three new prose pages following WRITING_GUIDE voice + md twins + negotiation routes + sitemap inclusion + nav links | **Kept** — live |
| E7b | identity correction (owner input) | Owner corrected facts mid-run: works at Adapta now; Avenza founder role was 2024—2026, past | Homepage/blog bios point at Adapta + RedThread; experience data Adapta (2026—Present) + Avenza Security (2024—2026); JSON-LD worksFor=Adapta, Organization node removed; llms.txt/md twins updated | **Kept** — truth over score: org-schema-completeness check stays failed because fabricating employer contact/address would violate no-fabrication rule |
| E8 | developer-resource discoverability + emerging bonuses | Publish machine-readable surfaces at predictable URLs | ARD ai-catalog.json at /.well-known/ per spec (urn:ai identifiers, host envelope); YAML frontmatter on every md twin (markdown-frontmatter); Link: rel="describedby" response header; Article JSON-LD + og:type=article on posts; /blog/llms.txt section guide; robots.txt AI-bot allowlist sections | **Kept** — live except bot-UA serving below |
| E9 | agent-ua-markdown (emerging bonus) | Serve markdown to GPTBot/ClaudeBot/etc. UAs even without Accept header | Probed regex-string and {contains} has-value forms in legacy routes | **Reverted** — neither form matches; static hosting cannot negotiate on User-Agent. Requires edge middleware (@astrojs/vercel adapter). Documented ceiling unless adapter lands |
| E10 | ard-catalog, agent-discovery-file, robots-ai-policy-quality, schema-type-breadth | Fix catalog URN namespace; publish skills index; complete crawler policy; extend schema | urn:ai → urn:air identifiers (checker requires domain-anchored urn:air); /.well-known/agent-skills/index.json + SKILL.md with build-time sha256 digest; OAI-SearchBot allow + CCBot/ByteSpider disallow; BreadcrumbList + truthful Service node in JSON-LD graph | **Kept** — raw scan: ard-catalog pass, agent-discovery-file 2/2 pass, robots-ai-policy-quality 2/2 pass |
| E11 | schema-type-breadth (partial) | FAQPage lifts breadth from warning to full coverage | FAQPage JSON-LD with four questions whose answers mirror visible site content only (identity, RedThread, writing topics, contact); test tightened to allow past-tense Avenza mentions exclusively with explicit "(2024 — 2026)" marker | **Kept** — pending next raw scan |

## Raw score trajectory (same 124-check Ora audit)

22 (E0 baseline) → 36 (after E1–E8) → 43 (after E10/E11, schema-type-breadth 2/2 pass).

## Final measurement protocol (blocked on Is Agentic staleness gate)

The published API replaces its stored snapshot only once it is stale (>6h from publication at 2026-08-24T02:15:59Z, i.e., ≥ 08:15:59Z). Forced scans complete and archive immediately but do not republish. When the window opens:

1. `npx -y is-agentic matheus.theodoro.dev --json` (starts-and-waits if no report exists; otherwise retrieves — so trigger a rescan first via `POST /api/scan/refresh {"target":"https://matheus.theodoro.dev"}` or the Rescan button on https://is-agentic.com/scan/matheus.theodoro.dev).
2. Record published score vs 69 baseline in this ledger.

Do NOT run additional forced stream scans before the window opens: if their staleness clock tracks newest-completed-scan, extra scans postpone publication.

## Remaining items by category

- **Ceiling (static hosting):** agent-ua-markdown — requires @astrojs/vercel adapter + edge middleware; owner decision.
- **Product decision:** modular-llms-txt wants a second section guide; the honest candidate is publishing docs/wiki as a /wiki section — needs owner approval for content licensing/accuracy.
- **External SEO/time:** brand-search-accuracy, agentic-search-specific, wikipedia-presence — depend on third-party search indexing, backlinks, and Wikipedia presence; not achievable from this repository.
- **Not applicable (personal static portfolio):** public-api, openapi-spec, oauth-support, mcp-server, pricing-info/pages, cli-tool, chatgpt-app-listed, sandbox-environment, webmcp, a2a-agent-card — the published model excludes interfaces the product does not offer.

## Measurement notes

- The published report API replaces its snapshot only when stale (>6h) or via the UI Rescan flow; forced scans complete and archive immediately but publication lags. Raw Ora evidence used for keep/revert decisions between publications.
- Raw Ora score moved 22 → 36 across E1–E8 (same 124-check audit).
- Checks requiring credentials/product surface (public-api, oauth-support, mcp-server, openapi-spec, pricing-info, chatgpt-app-listed, wikipedia-presence, brand-search-accuracy off-page factors) are out of scope for a personal static portfolio; the published model excludes non-applicable interfaces rather than penalizing them.

## Next

1. At publication window (post-staleness), trigger refresh and record published score delta vs 69 baseline.
2. Optional: adopt @astrojs/vercel static adapter + root middleware.ts to unlock agent-ua-markdown (+406/q-value strictness if scored later).
