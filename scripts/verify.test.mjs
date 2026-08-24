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
  for (const f of ["index.md", "experience.md", "blog/index.md", "404.md"]) {
    assert.ok(exists(f), `missing ${f}`);
  }
});

test("404 page body carries markdown recovery links", () => {
  const html = read("404.html");
  assert.match(html, /href="\/sitemap\.xml"/);
  assert.match(html, /href="\/llms\.txt"/);
  assert.match(html, /href="\/"/);
  const md = read("404.md");
  assert.match(md, /^# 404/);
});

test("sitemap.xml lists every page with valid XML", () => {
  const xml = read("sitemap.xml");
  assert.match(xml, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  for (const loc of ["/", "/experience", "/blog", "/blog/adversarial-prediction-models"]) {
    assert.ok(xml.includes(`<loc>${loc}</loc>`) || xml.includes(`<loc>https://matheus.theodoro.dev${loc === "/" ? "/" : loc}</loc>`), `sitemap missing ${loc}`);
  }
  const postCount = fs.readdirSync("src/content/blog").filter((f) => f.endsWith(".md")).length;
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(locs.length, postCount + 3, `expected ${postCount + 3} urls, got ${locs.length}`);
  assert.match(xml, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/, "posts missing lastmod");
});

test("robots.txt allows crawlers and references the sitemap", () => {
  const robots = fs.readFileSync("public/robots.txt", "utf8");
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/matheus\.theodoro\.dev\/sitemap\.xml/);
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
  const routes = cfg.routes;
  assert.ok(Array.isArray(routes), "routes array missing");

  const varyRoute = routes.find((r) => r.headers?.Vary && r.continue);
  assert.ok(varyRoute, "missing blanket Vary route");
  assert.match(varyRoute.headers.Vary, /\bAccept\b/);

  const ctRoute = routes.find((r) => r.src?.includes("\\.md") && r.continue);
  assert.ok(ctRoute, "missing markdown content-type route");
  assert.equal(ctRoute.headers["Content-Type"], "text/markdown; charset=utf-8");

  const mdRoutes = routes.filter((r) => r.dest?.endsWith(".md"));
  const srcs = new Set(mdRoutes.map((r) => r.src));
  for (const s of ["^/$", "^/experience/?$", "^/blog/?$", "^/blog/([a-z0-9-]+)/?$"]) {
    assert.ok(srcs.has(s), `no markdown rewrite for ${s}`);
    for (const src of srcs) {
      if (src !== s) continue;
      const variants = mdRoutes.filter((r) => r.src === s);
      assert.ok(
        variants.some((r) => r.has[0].value === "text/markdown") &&
          variants.some((r) => typeof r.has[0].value === "object"),
        `${s} missing has-condition variants`
      );
    }
  }
  assert.ok(routes.some((r) => r.handle === "filesystem"), "filesystem fallback missing");
});

test("html pages advertise their markdown alternate", () => {
  const index = read("index.html");
  assert.match(index, /rel="alternate"\s+type="text\/markdown"\s+href="\/index\.md"/);
  const exp = read("experience/index.html");
  assert.match(exp, /rel="alternate"\s+type="text\/markdown"\s+href="\/experience\.md"/);
});
