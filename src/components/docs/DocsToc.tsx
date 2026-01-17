import Link from "next/link";

export type TocItem = {
  depth: number;
  text: string;
  id: string;
};

export function DocsToc({ headings }: { headings: TocItem[] }) {
  if (!headings.length) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 shadow-sm backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">On this page</p>
      <ul className="mt-3 space-y-2 text-sm">
        {headings.map(item => (
          <li key={item.id} className={item.depth === 3 ? "ml-3" : ""}>
            <Link href={`#${item.id}`} className="text-slate-400 hover:text-white transition-colors block py-0.5">
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
