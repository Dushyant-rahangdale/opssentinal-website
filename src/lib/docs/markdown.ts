import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

export async function renderMarkdown(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    // @ts-ignore
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    // @ts-ignore
    .use(rehypeHighlight)
    // @ts-ignore
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

export function extractHeadings(markdown: string) {
  const lines = markdown.split("\n");
  const headings: { depth: number; text: string; id: string }[] = [];

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.*)/.exec(line.trim());
    if (!match) continue;
    const depth = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    headings.push({ depth, text, id });
  }

  return headings;
}
