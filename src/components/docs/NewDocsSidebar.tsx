"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Component, Terminal } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { SidebarItem } from "@/lib/docs/sidebar"
import { DocsVersionSwitcher } from "@/components/docs/DocsVersionSwitcher"
import { DocsSearch } from "@/components/docs/DocsSearch"

// Helper to render recursive items
function renderSidebarItems(items: SidebarItem[], pathname: string, activePath: string) {
    return items.map((item) => {
        const isActive = item.href ? activePath === item.href : false

        // Group Header (Level 0 with children)
        if (item.children && item.children.length > 0) {
            return (
                <SidebarGroup key={item.title}>
                    <SidebarGroupLabel className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                        {item.title}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {item.children.map((child) => (
                                <SidebarMenuItem key={child.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={child.href === activePath}
                                        className="data-[active=true]:bg-white/10 data-[active=true]:text-white data-[active=true]:font-medium text-slate-400 hover:text-white hover:bg-white/5"
                                    >
                                        {child.href ? (
                                            <Link href={child.href}>
                                                {child.title}
                                            </Link>
                                        ) : (
                                            <span>{child.title}</span>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            )
        }

        // Standalone Item
        return (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="text-slate-400 hover:text-white hover:bg-white/5 data-[active=true]:bg-white/10 data-[active=true]:text-white"
                >
                    {item.href ? (
                        <Link href={item.href}>{item.title}</Link>
                    ) : (
                        <span>{item.title}</span>
                    )}
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    })
}

export function NewDocsSidebar({ items, version }: { items: SidebarItem[], version: string }) {
    const pathname = usePathname()
    const activePath = pathname?.split("#")[0] ?? ""

    return (
        <Sidebar className="border-r border-white/10 bg-slate-900/95 backdrop-blur">
            <SidebarHeader className="border-b border-white/5 pb-4">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2 hover:opacity-80 transition-opacity">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 shrink-0">
                        <Terminal className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none transition-all group-data-[collapsible=icon]:hidden">
                        <span className="font-bold text-white">OpsSentinal</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">Docs</span>
                    </div>
                </Link>
                <div className="mt-4 px-2">
                    <DocsVersionSwitcher currentVersion={version} />
                </div>
                <div className="mt-2 px-2">
                    <DocsSearch version={version} />
                </div>
            </SidebarHeader>

            <SidebarContent className="custom-scrollbar">
                {renderSidebarItems(items, pathname || "", activePath)}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
