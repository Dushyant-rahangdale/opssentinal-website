import fs from "fs";
import path from "path";
import { getDocFilePath } from "./content";

export type SidebarItem = {
  title: string;
  href?: string;
  children?: SidebarItem[];
};

const DOCS_ROOT = path.join(process.cwd(), "content", "docs");

function readTitle(filePath: string) {
  const content = fs.readFileSync(filePath, "utf8");
  const titleLine = content.split("\n").find(line => line.startsWith("# "));
  if (titleLine) return titleLine.replace(/^#\s+/, "").trim();
  return path.basename(filePath).replace(/\.mdx?$/, "");
}

function buildTree(dirPath: string, baseHref: string[], version: string): SidebarItem[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const items: SidebarItem[] = [];

  const sorted = entries.sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of sorted) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const children = buildTree(fullPath, [...baseHref, entry.name], version);
      if (!children.length) continue;
      const indexPath = getDocFilePath(version, [...baseHref, entry.name]);
      const title = indexPath ? readTitle(indexPath) : entry.name.replace(/-/g, " ");
      items.push({
        title,
        href: indexPath ? `/docs/${version}/${[...baseHref, entry.name].join("/")}` : undefined,
        children,
      });
    } else if (entry.isFile() && entry.name.match(/\.mdx?$/)) {
      const slug = entry.name.replace(/\.mdx?$/, "");
      if (slug.toLowerCase() === "readme") {
        continue;
      }
      const href = `/docs/${version}/${[...baseHref, slug].join("/")}`;
      const title = readTitle(fullPath);
      items.push({ title, href });
    }
  }

  return items;
}

export function getSidebar(version: string): SidebarItem[] {
  const root = path.join(DOCS_ROOT, version);
  return buildTree(root, [], version);
}
