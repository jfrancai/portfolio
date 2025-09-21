import { Hono } from "hono";
import { renderMarkdown } from "./renderer";
import { serveStatic } from "hono/bun";
import { join } from "path";
import { existsSync } from "fs";

const app = new Hono();

app.use("/public/*", serveStatic({ root: "./" }));

const styles = `
* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #333;
  max-width: 65ch;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: #fff;
}

h1, h2, h3, h4, h5, h6 {
  margin: 2rem 0 1rem 0;
  line-height: 1.3;
  color: #222;
}

h1 { font-size: 2.25rem; }
h2 { font-size: 1.75rem; }
h3 { font-size: 1.5rem; }

p { margin: 1rem 0; }

a {
  color: #0066cc;
  text-decoration: none;
}

a:hover { text-decoration: underline; }

ul, ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

li { margin: 0.5rem 0; }

code {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 1rem;
}

pre {
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

pre code {
  background: none;
  padding: 0;
}

blockquote {
  border-left: 3px solid #ddd;
  margin: 1.5rem 0;
  padding-left: 1rem;
  color: #666;
  font-style: italic;
}

body > a[href="/"] {
  display: inline-block;
  margin-bottom: 2rem;
  color: #666;
  font-size: 1rem;
}

@media (max-width: 600px) {
  body {
    padding: 1rem 0.75rem;
    font-size: 1rem;
  }
  
  h1 { font-size: 2rem; }
  h2 { font-size: 1.6rem; }
}
`;

const htmlTemplate = (title: string, content: string) => `<!DOCTYPE html>
<html>
<head>

<meta charset="utf-8">
<title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
<style>${styles}</style>
</head>
<body>${content}</body>
</html>`;

app.get("/", async (c) => {
  const files = existsSync("./posts") ? await Array.fromAsync(new Bun.Glob("posts/*.md").scan()) : [];

  const links = await Promise.all(files.map(async (file) => {
    const filename = file.replace(/^posts\//, "").replace(/\.md$/, "");
    const content = await Bun.file(`./posts/${filename}.md`).text();

    let date = "No date", title = "No title";
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);

    if (frontmatterMatch) {
      const titleMatch = frontmatterMatch[0].match(/^title:\s*(.+)$/m);
      const dateMatch = frontmatterMatch[1].match(/^date:\s*(.+)$/m);
      if (titleMatch) title = titleMatch[1].trim();
      if (dateMatch) date = new Date(dateMatch[1]).toLocaleDateString();
    }

    return `<li><a href="posts/${filename}">${title}</a> <span style="color: #666; font-size: 0.9em;">(${date})</span></li>`;
  }));

  return c.html(htmlTemplate("My Hono Blog", `<h1>My Blog</h1><ul>${links.join("")}</ul>`));
});

app.get("/posts/:slug", async (c) => {
  const slug = c.req.param("slug");

  if (!slug || slug.includes("..") || slug.includes("/")) return c.notFound();

  const file = Bun.file(join("./posts", `${slug}.md`));

  if (!(await file.exists())) return c.notFound();

  const content = await file.text();
  const contentWithoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  const html = await renderMarkdown(contentWithoutFrontmatter);

  return c.html(htmlTemplate(slug, `<a href="/">← Back</a>${html}`));
});

export default app;
