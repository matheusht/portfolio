import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

const BASE = process.env.LIVE_BASE_URL || "https://matheus.theodoro.dev";

async function head(path, headers = {}) {
  const res = await fetch(BASE + path, { method: "HEAD", headers, redirect: "manual" });
  return res;
}
async function get(path, headers = {}) {
  const res = await fetch(BASE + path, { headers });
  return { res, body: await res.text() };
}

test("root serves HTML to browsers and markdown to agents with Vary", async () => {
  const html = await head("/");
  assert.equal(html.status, 200);
  assert.match(html.headers.get("content-type") || "", /text\/html/);
  assert.match(html.headers.get("vary") || "", /Accept/i);

  const md = await get("/", { Accept: "text/markdown" });
  assert.equal(md.res.status, 200);
  assert.match(md.res.headers.get("content-type") || "", /text\/markdown/);
  assert.match(md.body, /^---\ntitle: /m);
});

test("blog posts negotiate markdown", async () => {
  const list = await get("/blog/index.md");
  const slugs = [...list.body.matchAll(/\/blog\/([a-z0-9-]+)\.md/g)].map((m) => m[1]);
  assert.ok(slugs.length >= 5);
  for (const slug of slugs.slice(0, 3)) {
    const neg = await get(`/blog/${slug}`, { Accept: "text/markdown;q=1.0, text/html;q=0.5" });
    assert.match(neg.res.headers.get("content-type") || "", /text\/markdown/, `${slug} did not negotiate`);
  }
});

test("404s stay real with recovery links", async () => {
  const { res, body } = await get(`/no-such-path-${Date.now()}`);
  assert.equal(res.status, 404);
  assert.match(body, /sitemap\.xml/);
  assert.match(body, /llms\.txt/);
});

test("sitemap.xml lists pages incl. trust pages, robots references it", async () => {
  const { body } = await get("/sitemap.xml");
  assert.match(body, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  for (const p of ["/", "/experience", "/privacy"]) {
    assert.ok(body.includes(`<loc>${BASE}${p === "/" ? "/" : p}</loc>`), `sitemap missing ${p}`);
  }
  const robots = await get("/robots.txt");
  assert.match(robots.body, /Sitemap: https:\/\/matheus\.theodoro\.dev\/sitemap\.xml/);
});

test("llms.txt resolves every link it advertises", async () => {
  const { body } = await get("/llms.txt");
  assert.match(body, /^# Matheus Theodoro/m);
  const links = [...body.matchAll(/\]\((https?:[^)]+)\)/g)].map((m) => m[1]).filter((u) => u.startsWith(BASE));
  assert.ok(links.length >= 8);
  for (const url of new Set(links)) {
    const res = await fetch(url, { method: "HEAD" });
    assert.equal(res.status, 200, `llms.txt link broken: ${url}`);
  }
});

test("ai-catalog entries use domain-anchored urn:air identifiers", async () => {
  const { body } = await get("/.well-known/ai-catalog.json");
  const cat = JSON.parse(body);
  assert.equal(cat.specVersion, "1.0");
  for (const e of cat.entries) {
    assert.match(e.identifier, /^urn:air:matheus\.theodoro\.dev:/);
    const res = await fetch(e.url, { method: "HEAD" });
    assert.equal(res.status, 200, `catalog entry url dead: ${e.url}`);
  }
});

test("agent-skills digest matches live SKILL.md bytes", async () => {
  const idx = JSON.parse((await get("/.well-known/agent-skills/index.json")).body);
  const skill = idx.skills[0];
  const { body } = await get(new URL(skill.url).pathname);
  const expected = "sha256:" + crypto.createHash("sha256").update(body).digest("hex");
  assert.equal(skill.digest, expected, "published digest does not match live SKILL.md");
});

test("homepage JSON-LD parses with Person@Adapta and full metadata", async () => {
  const { body } = await get("/");
  const match = body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  const ld = JSON.parse(match[1]);
  const person = ld["@graph"].find((n) => n["@type"] === "Person");
  assert.equal(person.worksFor.name, "Adapta");
  for (const prop of ['property="og:type"', 'property="og:image"', 'rel="canonical"', 'rel="describedby"', 'rel="alternate" type="text/markdown"']) {
    assert.ok(body.includes(prop), `missing ${prop}`);
  }
  const img = await head("/og.png");
  assert.equal(img.status, 200);
  assert.match(img.headers.get("content-type") || "", /image\/png/);
});
