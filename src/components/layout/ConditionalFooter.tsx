"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

export function ConditionalFooter() {
    const pathname = usePathname();
    const isDocs = pathname?.startsWith("/docs");

    if (isDocs) return null;

    return <Footer />;
}
