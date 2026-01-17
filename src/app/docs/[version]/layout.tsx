import Link from "next/link";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { getSidebar } from "@/lib/docs/sidebar";
import { NewDocsSidebar } from "@/components/docs/NewDocsSidebar";
import { DOC_VERSIONS } from "@/lib/docs/versions";
import { notFound } from "next/navigation";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import "highlight.js/styles/atom-one-dark.css";

export default async function DocsLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ version: string }> }>) {
  const { version } = await params;
  if (!DOC_VERSIONS.some(v => v.id === version)) {
    notFound();
  }
  const sidebar = getSidebar(version);

  return (
    <SidebarProvider defaultOpen>
      <NewDocsSidebar items={sidebar} version={version} />
      <SidebarInset className="bg-[#0f172a] min-h-screen">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/5 px-4 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
          <SidebarTrigger className="-ml-1 text-slate-400 hover:text-white" />
          <div className="h-4 w-px bg-white/10" />
          <nav className="flex items-center gap-2 text-sm">
            <span className="font-medium text-white">Documentation</span>
          </nav>
        </header>
        <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
