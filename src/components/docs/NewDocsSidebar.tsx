"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Component } from "lucide-react"

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
import { cn } from "@/lib/utils"

const SECTION_STYLES: Record<string, { label: string; active: string }> = {
    "getting-started": {
        label: "text-amber-300",
        active: "data-[active=true]:border-amber-300 data-[active=true]:text-amber-100",
    },
    "core-concepts": {
        label: "text-cyan-300",
        active: "data-[active=true]:border-cyan-300 data-[active=true]:text-cyan-100",
    },
    administration: {
        label: "text-emerald-300",
        active: "data-[active=true]:border-emerald-300 data-[active=true]:text-emerald-100",
    },
    integrations: {
        label: "text-sky-300",
        active: "data-[active=true]:border-sky-300 data-[active=true]:text-sky-100",
    },
    api: {
        label: "text-rose-300",
        active: "data-[active=true]:border-rose-300 data-[active=true]:text-rose-100",
    },
    deployment: {
        label: "text-lime-300",
        active: "data-[active=true]:border-lime-300 data-[active=true]:text-lime-100",
    },
    security: {
        label: "text-red-300",
        active: "data-[active=true]:border-red-300 data-[active=true]:text-red-100",
    },
    architecture: {
        label: "text-indigo-300",
        active: "data-[active=true]:border-indigo-300 data-[active=true]:text-indigo-100",
    },
    mobile: {
        label: "text-teal-300",
        active: "data-[active=true]:border-teal-300 data-[active=true]:text-teal-100",
    },
}

function getSectionKeyFromHref(href?: string) {
    if (!href) return undefined
    const parts = href.split("/").filter(Boolean)
    if (parts.length < 3) return undefined
    return parts[2]
}

function getSectionStyles(sectionKey?: string) {
    if (!sectionKey) return undefined
    return SECTION_STYLES[sectionKey]
}

// Helper to render recursive items
function renderSidebarItems(items: SidebarItem[], pathname: string, activePath: string) {
    return items.map((item) => {
        const isActive = item.href ? activePath === item.href : false
        const sectionKey = getSectionKeyFromHref(item.href)
        const sectionStyles = getSectionStyles(sectionKey)

        // Group Header (Level 0 with children)
        if (item.children && item.children.length > 0) {
            const groupStyles = sectionStyles ?? getSectionStyles(getSectionKeyFromHref(item.children[0]?.href))
            return (
                <SidebarGroup key={item.title}>
                    <SidebarGroupLabel
                        className={cn(
                            "text-xs font-bold uppercase tracking-widest text-slate-500 mb-2",
                            groupStyles?.label
                        )}
                    >
                        {item.title}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {item.children.map((child) => (
                                <SidebarMenuItem key={child.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={child.href === activePath}
                                        className={cn(
                                            "border-l-2 border-transparent data-[active=true]:bg-white/10 data-[active=true]:text-white data-[active=true]:font-medium text-slate-400 hover:text-white hover:bg-white/5",
                                            groupStyles?.active
                                        )}
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
                    className={cn(
                        "border-l-2 border-transparent text-slate-400 hover:text-white hover:bg-white/5 data-[active=true]:bg-white/10 data-[active=true]:text-white",
                        sectionStyles?.active
                    )}
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
                    <div className="flex h-8 w-8 items-center justify-center shrink-0">
                        <Image
                            src="/logo-compressed.png"
                            alt="OpsSentinal Logo"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                        />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none transition-all group-data-[collapsible=icon]:hidden">
                        <span className="font-bold text-white">OpsSentinal</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">Documentation</span>
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
