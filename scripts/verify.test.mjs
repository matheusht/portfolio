import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const DIST = "dist";

function read(rel) {
  return fs.readFileSync(path.join(DIST, rel), "utf8");
}
function exists(rel) {
  return fs.existsSync(path.join(DIST, rel));
}

test("markdown twins exist for all core pages", () => {
  for (const f of ["index.md", "experience.md", "blog/index.md"]) {
    assert.ok(exists(f), `missing ${f}`);
  }
});

test("markdown twin exists for every blog post source file", () => {
  const posts = fs.readdirSync("src/content/blog").filter((f) => f.endsWith(".md"));
  assert.ok(posts.length > 0, "no posts found");
  for (const p of posts) {
    const twin = path.join("blog", p);
    assert.ok(exists(twin), `missing dist/${twin}`);
  }
});

test("markdown twins start with an H1 and are non-trivial", () => {
  for (const f of ["index.md", "experience.md", "blog/index.md"]) {
    const md = read(f);
    assert.match(md, /^# /m, `${f} lacks H1`);
    assert.ok(md.length > 200, `${f} too short`);
  }
});

test("blog twins carry their post title as H1", () => {
  const raw = read("blog/index.md");
  const links = [...raw.matchAll(/\]\((?:https?:\/\/[^)]+)?(\/blog\/[^)]+\.md)\)/g)].map((m) => m[1]);
  assert.ok(links.length >= 5, `expected >=5 post links, got ${links.length}`);
  for (const link of new Set(links)) {
    const md = read(link.replace(/^\//, ""));
    assert.match(md, /^# .+/, `${link} lacks H1 title`);
  }
});

test("vercel.json negotiates markdown with correct headers", () => {
  const cfg = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
  const has = (r) => r.has?.some((h) => h.type === "header" && h.key === "accept" && /text\/markdown/i.test(h.value));
  const sources = cfg.rewrites.filter(has).map((r) => r.source);
  for (const s of ["/", "/experience", "/blog", "/blog/:slug"]) {
    assert.ok(sources.includes(s), `no markdown rewrite for ${s}`);
  }
  const vary = cfg.headers.find((h) => h.source === "/(.*)")?.headers.find((x) => x.key === "Vary");
  assert.ok(vary, "missing blanket Vary header");
  assert.match(vary.value, /\bAccept\b/);
  const ct = cfg.headers.find((h) => /\.md/.test(h.source))?.headers.find((x) => x.key === "Content-Type");
  assert.ok(ct && ct.value === "text/markdown; charset=utf-8", "missing text/markdown content-type override");
});

test("html pages advertise their markdown alternate", () => {
  const index = read("index.html");
  assert.match(index, /rel="alternate"\s+type="text\/markdown"\s+href="\/index\.md"/);
  const exp = read("experience/index.html");
  assert.match(exp, /rel="alternate"\s+type="text\/markdown"\s+href="\/experience\.md"/);
});
