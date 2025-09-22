import { createClient } from '@supabase/supabase-js';
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const parseFrontmatter = (content: string) => {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) throw new Error("No frontmatter found");

  const frontmatter = match[1]!;
  const title = frontmatter.match(/^title:\s*(.+)$/m)?.[1]?.trim();
  const slug = frontmatter.match(/^slug:\s*(.+)$/m)?.[1]?.trim();

  if (!title || !slug) throw new Error("Missing title or slug in frontmatter");

  const body = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "");

  return { title, slug, content: body };
};

const loadPosts = async () => {
  const postsDir = "./posts";
  const files = readdirSync(postsDir).filter(file => file.endsWith(".md"));

  for (const file of files) {
    try {
      const filePath = join(postsDir, file);
      const content = readFileSync(filePath, "utf-8");
      const { title, slug, content: body } = parseFrontmatter(content);

      // Check if post exists, then insert or update
      const { data: existingPost } = await supabase
        .from('posts')
        .select('id')
        .eq('slug', slug)
        .single();

      if (existingPost) {
        // Update existing post
        const { error } = await supabase
          .from('posts')
          .update({ title, content: body })
          .eq('slug', slug);

        if (error) {
          console.error(`Error updating ${file}:`, error);
        } else {
          console.log(`Updated: ${title} (${slug})`);
        }
      } else {
        // Insert new post
        const { error } = await supabase
          .from('posts')
          .insert({ slug, title, content: body });

        if (error) {
          console.error(`Error inserting ${file}:`, error);
        } else {
          console.log(`Inserted: ${title} (${slug})`);
        }
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  console.log("Posts loading completed!");
};

// Run the script
const main = async () => {
  await loadPosts();
};

await main();

