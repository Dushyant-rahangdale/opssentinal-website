"use client";


import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type SearchResult = {
  title: string;
  href: string;
  excerpt: string;
};

export function DocsSearch({ version }: { version: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch index once per version
    const fetchIndex = async () => {
      try {
        const res = await fetch(`/api/docs/${version}/search`);
        if (!res.ok) return;
        const data = await res.json();
        // data.results has full list. Logic needs to filter this list based on query.
        // Storing full index in a ref or state to avoid re-fetching would be ideal, 
        // but for simplicity let's store it in a state and filter derived.
        // Actually, let's keep it simple: fetch full list, store in a 'fullIndex' state.
      } catch (e) { console.error(e); }
    };
    // Implementing filtering logic below in a better way.
  }, [version]);

  // Rethinking the implementation:
  // We want to fetch the index *once* when the component mounts or version changes.
  // Then filter `results` based on `query`.

  const [fullIndex, setFullIndex] = useState<SearchResult[]>([]);

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        const res = await fetch(`/api/docs/${version}/search`);
        if (res.ok) {
          const data = await res.json();
          setFullIndex(data.results || []);
        }
      } catch (e) {
        console.error("Failed to load search index", e);
      }
    };
    fetchIndex();
  }, [version]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = fullIndex
      .filter(entry =>
        entry.title.toLowerCase().includes(lowerQuery) ||
        (entry.excerpt && entry.excerpt.toLowerCase().includes(lowerQuery)) ||
        // The index builder returns 'text', we should check that too.
        // Wait, the client type uses 'excerpt'. The API returns 'text'.
        // I need to adapt the type or the API. The API I wrote returns `text` (full content).
        // That's heavy for client. But I copied the buildIndex logic which included 'text'.
        // Client side filtering needs 'text' to be effective?
        // Or I should fix the API to return text and client slices it.
        // Let's assume the API returns { title, href, text }.
        (entry as any).text?.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 12)
      .map(entry => ({
        title: entry.title,
        href: entry.href,
        excerpt: (entry as any).text ? (entry as any).text.slice(0, 100) + "..." : entry.excerpt || ""
      }));

    setResults(filtered);
    setIsOpen(true);
    setSelectedIndex(-1);

  }, [query, fullIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        router.push(results[selectedIndex].href);
        setIsOpen(false);
        inputRef.current?.blur();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const hasResults = useMemo(() => results.length > 0, [results]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          ref={inputRef}
          value={query}
          onChange={event => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search documentation..."
          className="w-full rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all docs-search-input"
          onFocus={() => query && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
      </div>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg shadow-xl border border-white/10 overflow-hidden docs-search-panel backdrop-blur-xl">
          {hasResults ? (
            <ul className="max-h-[300px] overflow-auto py-2">
              {results.map((result, index) => (
                <li key={result.href}>
                  <Link
                    href={result.href}
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`block px-4 py-3 text-sm transition-colors ${index === selectedIndex ? "bg-white/10" : "hover:bg-white/5"
                      }`}
                  >
                    <p className={`font-medium ${index === selectedIndex ? "text-white" : "text-slate-200"}`}>
                      {result.title}
                    </p>
                    {result.excerpt && (
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{result.excerpt}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-slate-400">No results found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

