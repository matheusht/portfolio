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
| E11 | schema-type-breadth (partial) | FAQPage lifts breadth from warning to full coverage | FAQPage JSON-LD with four questions whose answers mirror visible site content only (identity, RedThread, writing topics, contact); test tightened to allow past-tense Avenza mentions exclusively with explicit "(2024 — 2026)" marker | **Kept** |
| E12 | agent-friendly-404 (Essential, partial) | Checker wants literal markdown to parse in the 404 contract | Visible `<pre>` markdown block on 404 page + post-filesystem catch-all routes serving `/404.md` with `status: 404` for `Accept: text/markdown` agents | **Kept** — raw scan: 2/2, "the strongest 404 contract"; live: 404 status + text/markdown for agents, HTML 404 unchanged for browsers |
| E13 | agent-instruction (Recommended, partial) | Checker reads /.well-known/agent-skills/ for explicit when-to-use guidance | SKILL.md gained "When to use this skill" + "When NOT to use" sections; index.json description leads with When-to-use/How-to-call | **Kept** — raw scan: 3/3 |
| E14 | org-schema-completeness (Recommended, partial) | Organization needs contactPoint + address; no-fabrication rule limits sources | Used ONLY publicly-published employer data from adapta.org legal pages (parcerias@adapta.org, registered Berrini One address, São Paulo/SP) inside Person.worksFor Organization node | **Kept** — raw scan: 2/2 |
| E15 | owner instruction: remove /about and /contact | Owner trimmed site scope during review | Pages, nav links, md twins, vercel routes, sitemap entries removed; Service schema url repointed home; tests updated | **Kept** — trust-anchors drops to 1/2 ("missing Contact"): accepted cost of owner decision, not reverted |

## Raw score trajectory (same 124-check Ora audit)

22 (E0 baseline) → 36 (after E1–E8) → 43 (after E10/E11) → **45 (after E12–E15; pass 38 / warn 3)**.
Published model trajectory: **69 → 94** ("Strong technical baseline": Essential 74.3/80, Recommended 14.3/20, bonus +5 from 21 signals).

## Remaining items — documented ceiling

Every unresolved check now falls in one category:

1. **External SEO/indexing (outside repository control):**
   - `brand-search-accuracy` — needs third-party search engines to rank matheus.theodoro.dev for "Matheus Theodoro"; requires backlinks/press/time.
   - `agentic-search-specific` — same indexing dependency for name-based resource search.
2. **Owner product decisions:**
   - `trust-anchors` 1/2 — restore a /contact page if wanted (was removed by owner instruction).
   - `modular-llms-txt` warning — second section llms.txt would require publishing docs/wiki as a section.
3. **Hosting architecture decision:**
   - `agent-ua-markdown` — static hosting cannot negotiate on User-Agent; needs @astrojs/vercel adapter + edge middleware.
4. **Not applicable (excluded from scoring):** API/OAuth/MCP/pricing surfaces a personal portfolio does not offer.

## Measurement notes

- The published report API serves the stored snapshot; after a forced scan completes and archives, their pipeline promotes it on its own schedule (observed lag: minutes to ~40 min). Raw Ora evidence from the `scan/stream` SSE is used for keep/revert decisions between publications.
- Canonical test command per owner: `npx is-agentic matheus.theodoro.dev`.

## Optional follow-ups

1. Adopt @astrojs/vercel static adapter + root middleware.ts to unlock agent-ua-markdown (bot-UA markdown serving).
2. Restore a /contact page if trust-anchors full credit matters more than the trimmed scope.
3. Publish docs/wiki as /wiki section with its own llms.txt for modular-llms-txt bonus.
