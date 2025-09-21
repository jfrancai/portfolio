import { marked, Tokens } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

// Create a custom renderer
const renderer = new marked.Renderer();

renderer.code = function ({ text, lang, escaped }: Tokens.Code): string {
  let highlighted: string;

  if (lang && hljs.getLanguage(lang)) {
    try {
      highlighted = hljs.highlight(text, { language: lang }).value;
    } catch (err) {
      highlighted = hljs.highlightAuto(text).value;
    }
  } else {
    highlighted = hljs.highlightAuto(text).value;
  }

  return `<pre><code class="hljs language-${lang || 'plaintext'}">${highlighted}</code></pre>`;
};

// Use the custom renderer
marked.use({ renderer });

export async function renderMarkdown(content: string): Promise<string> {
  return await marked.parse(content);
}
