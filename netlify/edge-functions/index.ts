/// <reference types="https://deno.land/x/deno/lib/deno.ns.d.ts" />
import { Hono } from 'hono'
import { handle } from 'hono/netlify'
import { marked, type Tokens } from 'marked'
import hljs from 'highlight.js'
import { createClient } from '@supabase/supabase-js'

const app = new Hono()

const supabaseUrl = process.env.SUPABASE_URL || Deno.env.get('SUPABASE_URL') || 'http://localhost:4242'
const supabaseKey = process.env.SUPABASE_ANON_KEY || Deno.env.get('SUPABASE_ANON_KEY') || 'nope'

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing required environment variables: SUPABASE_URL and SUPABASE_ANON_KEY')
}

const supabase = createClient(supabaseUrl, supabaseKey)

const renderer = new marked.Renderer()
renderer.code = ({ text, lang }: Tokens.Code) => {
  const result = lang && hljs.getLanguage(lang)
    ? hljs.highlight(text, { language: lang }).value
    : hljs.highlightAuto(text).value

  return `<pre><code class="hljs language-${lang || 'plaintext'}">${result}</code></pre>`
}

marked.use({ renderer })

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

 .hidden { display: none; }

 @media (max-width: 600px) {
   body {
     padding: 1rem 0.75rem;
     font-size: 1rem;
   }

   h1 { font-size: 2rem; }
   h2 { font-size: 1.6rem; }
 }
`

const clientScript = `
<script>
const cache = new Map();
let isNavigating = false;

async function navigate(url) {
  if (isNavigating) return;
  isNavigating = true;

  try {
    if (cache.has(url)) {
      updateContent(cache.get(url));
    } else {
      const response = await fetch(url);
      const html = await response.text();
      const content = extractContent(html);
      cache.set(url, content);
      updateContent(content);
    }
    
    history.pushState(null, '', url);
  } catch (error) {
    console.error('Navigation failed:', error);
    window.location.href = url;
  } finally {
    isNavigating = false;
  }
}

function extractContent(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return {
    title: doc.title,
    body: doc.body.innerHTML
  };
}

function updateContent({ title, body }) {
  document.title = title;
  document.body.innerHTML = body;
  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(link.href);
    });
  });
}

window.addEventListener('popstate', () => {
  navigate(location.pathname);
});


document.addEventListener('DOMContentLoaded', () => {
  attachEventListeners();
  cache.set(location.pathname, {
    title: document.title,
    body: document.body.innerHTML
  });
});
</script>
`

const html = (title: string, content: string) => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
<style>${styles}</style>
</head>
<body>${content}${clientScript}</body>

</html>`

const parseFrontmatter = (content: string) => {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  if (!match) return { title: 'No title', date: 'No date', content }

  const title = match[1]!.match(/^title:\s*(.+)$/m)?.[1]?.trim() || 'No title'
  const dateStr = match[1]!.match(/^date:\s*(.+)$/m)?.[1]?.trim()
  const date = dateStr ? new Date(dateStr).toLocaleDateString() : 'No date'

  return { title, date, content: content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '') }
}

app.get("/", async (c) => {
  const { data: posts, error } = await supabase.from('posts').select('*')

  if (error) return c.json({ error: error.message }, 500)

  const links = posts.map(post => {
    const date = new Date(post.created_at).toLocaleDateString()
    return `<li><a href="/posts/${post.slug}">${post.title}</a> <span style="color: #666; font-size: 0.9em;">(${date})</span></li>`
  }).join("")

  return c.html(html("My Hono Blog", `<h1>My Blog</h1><ul>${links}</ul>`))
})

app.get("/posts/:slug", async (c) => {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', c.req.param("slug"))
    .single()

  if (error || !post) return c.notFound()

  const { title, content } = parseFrontmatter(post.content)

  return c.html(html(title, `
    <nav><a href="/">← Back to posts</a></nav>
    <article><div>${marked.parse(content)}</div></article>
  `))
})

export default handle(app)

