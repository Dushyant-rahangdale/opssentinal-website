"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";

export function ConditionalNavbar() {
    const pathname = usePathname();
    const isDocs = pathname?.startsWith("/docs");

    if (isDocs) return null;

    return <Navbar />;
}
