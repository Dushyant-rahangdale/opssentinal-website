"use client";

import { usePathname } from "next/navigation";
import { DOC_VERSIONS } from "@/lib/docs/versions";

export function DocsVersionSwitcher({ currentVersion }: { currentVersion: string }) {
  const pathname = usePathname();

  const handleChange = (value: string) => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] !== "docs") return;
    const rest = parts.slice(2);
    const next = ["/docs", value, ...rest].join("/");
    window.location.href = next;
  };

  return (
    <select
      className="rounded-lg px-3 py-2 text-sm docs-select"
      value={currentVersion}
      onChange={event => handleChange(event.target.value)}
    >
      {DOC_VERSIONS.map(version => (
        <option key={version.id} value={version.id}>
          {version.label}
        </option>
      ))}
    </select>
  );
}
