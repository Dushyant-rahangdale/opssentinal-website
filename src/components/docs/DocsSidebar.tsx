"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItem } from "@/lib/docs/sidebar";
import { cn } from "@/lib/utils";

function SidebarNode({
  item,
  depth = 0,
  activePath,
}: {
  item: SidebarItem;
  depth?: number;
  activePath: string;
}) {
  const isActive = item.href ? activePath === item.href : false;
  const hasChildren = item.children && item.children.length > 0;

  // Level 0 with children = Section Header
  if (depth === 0 && hasChildren) {
    return (
      <div className="mb-6">
        <h4 className="mb-2 px-2 text-xs font-bold uppercase tracking-widest text-slate-500 select-none">
          {item.title}
        </h4>
        <div className="space-y-0.5">
          {item.children?.map(child => (
            <SidebarNode key={child.title} item={child} depth={depth + 1} activePath={activePath} />
          ))}
        </div>
      </div>
    );
  }

  // Links (Level 1+ or Level 0 without children)
  return (
    <div>
      {item.href ? (
        <Link
          href={item.href}
          className={cn(
            "block py-1.5 px-3 text-sm transition-all duration-200 border-l-2",
            isActive
              ? "border-white text-white bg-white/5 font-medium rounded-r-md"
              : "border-transparent text-slate-400 hover:text-white hover:border-slate-700 hover:bg-white/5 rounded-r-md"
          )}
        >
          {item.title}
        </Link>
      ) : (
        // Non-clickable label (rare case for nested group without href)
        <p className="px-3 py-1.5 text-sm font-semibold text-slate-400">{item.title}</p>
      )}

      {/* Recursion for deeper levels (if any) */}
      {hasChildren && (
        <div className="mt-1 ml-3 space-y-0.5 border-l border-white/5 pl-3">
          {item.children?.map(child => (
            <SidebarNode key={child.title} item={child} depth={depth + 1} activePath={activePath} />
          ))}
        </div>
      )}
    </div>
  );
}

export function DocsSidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();
  const activePath = pathname?.split("#")[0] ?? "";

  return (
    <nav className="pb-10">
      {items.map(item => (
        <SidebarNode key={item.title} item={item} activePath={activePath} />
      ))}
    </nav>
  );
}
