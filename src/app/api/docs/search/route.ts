import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllDocSlugs, getDocFilePath } from "@/lib/docs/content";

const cache = new Map<string, { data: SearchEntry[]; builtAt: number }>();

type SearchEntry = {
  title: string;
  href: string;
  text: string;
};

function stripMarkdown(text: string) {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[*_>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}



function buildIndex(version: string) {
  const slugs = getAllDocSlugs(version);
  const entries: SearchEntry[] = [];

  for (const slug of slugs) {
    const filePath = getDocFilePath(version, slug);
    if (!filePath) continue;
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const title =
      (typeof data.title === "string" && data.title) ||
      content.split("\n").find(line => line.startsWith("# "))?.replace(/^#\s+/, "") ||
      path.basename(filePath).replace(/\.mdx?$/, "");
    const text = stripMarkdown(content);
    const href = `/docs/${version}/${slug.join("/")}`.replace(/\/$/, "");
    entries.push({ title, href, text });
  }

  return entries;
}



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const version = searchParams.get("version") || "v1";
  const query = (searchParams.get("q") || "").toLowerCase().trim();

  if (!cache.has(version)) {
    cache.set(version, { data: buildIndex(version), builtAt: Date.now() });
  }

  const data = cache.get(version)?.data || [];
  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = data
    .filter(entry => entry.title.toLowerCase().includes(query) || entry.text.toLowerCase().includes(query))
    .slice(0, 12)
    .map(entry => ({
      title: entry.title,
      href: entry.href,
      excerpt: entry.text.slice(0, 140) + (entry.text.length > 140 ? "..." : ""),
    }));

  return NextResponse.json({ results });
}
