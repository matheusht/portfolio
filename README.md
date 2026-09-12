# portfolio

Personal site of Matheus Theodoro — Senior AI Security Engineer at [Toloka](https://toloka.ai). Astro 5 + Tailwind 4, deployed on Vercel at https://matheus.theodoro.dev (pushes to `main` auto-deploy).

## Agent-facing surfaces

Every page ships two representations. Browsers get HTML; agents get clean markdown.

| Resource | What it does |
|----------|--------------|
| `Accept: text/markdown` | Content negotiation on every page (`text/markdown; charset=utf-8`, `Vary: Accept`). Or append `.md` to any path. |
| `/llms.txt` | llmstxt.org v2 guide: identity, when-to-use-this-site, page map, machine-readable resources. Section copy at `/blog/llms.txt`. |
| `/404` body | Real HTTP 404 with recovery links (home, sitemap, llms.txt). |
| `/sitemap.xml` | All indexable URLs; posts carry `lastmod`. |
| `/robots.txt` | Allows answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot…); restricts training-only crawlers (CCBot, ByteSpider). |
| `/.well-known/ai-catalog.json` | ARD catalog with domain-anchored `urn:air:` entries. |
| `/.well-known/agent-skills/index.json` | Agent Skills discovery index; sha256 digest matches the SKILL.md bytes. |
| JSON-LD | Person (worksFor Toloka), WebSite, BreadcrumbList, Service, FAQPage sitewide; Article on posts. |
| OG metadata | Canonical URL, og:type, og:image (generated 1200×630 PNG), Twitter card. |

Markdown twins and `llms.txt` regenerate on every build via `scripts/generate-markdown.mjs`; og/favicon via `scripts/generate-images.mjs`. Routing lives in `vercel.json` legacy `routes` — conditional rewrites sit **before** `{ "handle": "filesystem" }` because filesystem precedence beats modern `rewrites`.

## Commands

```sh
npm run build        # astro build + md twins + images
npm run verify       # 22 assertions against dist/
npm run verify:live  # 8 production smoke checks against the deployed site
```

## Agentic-readiness loop

Scored by [Is Agentic](https://is-agentic.com/scan/matheus.theodoro.dev). Experiments follow the karpathy/autoresearch loop — one hypothesis, one metric, keep-or-revert — logged in [`docs/autoresearch/log.md`](docs/autoresearch/log.md). Raw Ora audit trajectory: 22 → 43 across E1–E11.

## Identity facts

Current: Senior AI Security Engineer at [Toloka](https://toloka.ai), since September 2026. Toloka copy stays brief: security benchmarks and AI coding-agent evaluation. Adapta remains a past five-month engagement in 2026. The current role in `src/data/experience.js` feeds the site, structured metadata, markdown twins and generated profile. Older career entries are retained; they have not been comprehensively reconciled with the new CV.

## LLM Wiki

The personal brief and research wiki are local-only agent context, excluded from Git and website publication. Existing copies stay on disk; a fresh clone does not contain them. Older committed versions remain in Git history.
