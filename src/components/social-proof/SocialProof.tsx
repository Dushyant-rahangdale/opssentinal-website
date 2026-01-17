"use client";

import { motion } from "framer-motion";
import { Github, Shield, Layers, Plug } from "lucide-react";
import Link from "next/link";

const pillars = [
    {
        icon: Shield,
        title: "Own your reliability stack",
        description: "Run OpsSentinal in your cloud with full control and privacy.",
    },
    {
        icon: Layers,
        title: "Built for platform teams",
        description: "Incident response, on-call, and analytics in one command center.",
    },
    {
        icon: Plug,
        title: "Integrations first",
        description: "Connect monitoring, APM, and uptime signals without rewiring workflows.",
    },
];

const stats = [
    { label: "Self-hosted", value: "100%" },
    { label: "Integrations", value: "20+" },
    { label: "License", value: "AGPL-3.0" },
];

export function SocialProof() {
    return (
        <section className="relative py-24 section-shell">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Open Source Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="surface-panel rounded-2xl p-8"
                >
                    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 badge mb-4">
                                <Github className="w-4 h-4" />
                                Built in the Open
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                                Open source, production-minded
                            </h2>
                            <p className="text-foreground-secondary max-w-xl mb-6">
                                OpsSentinal is a community-first platform. Review the code, ship
                                improvements, and self-host without vendor lock-in.
                            </p>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="surface-panel rounded-lg p-3 text-center">
                                        <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                                        <p className="text-xs text-foreground-muted">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                                target="_blank"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <Github className="w-4 h-4" />
                                View Source Code
                            </Link>
                        </div>
                        <div className="grid gap-4">
                            {pillars.map((pillar) => (
                                <div key={pillar.title} className="surface-panel rounded-xl p-4">
                                    <pillar.icon className="w-5 h-5 text-accent-blue mb-2" />
                                    <h3 className="text-sm font-semibold text-foreground mb-1">{pillar.title}</h3>
                                    <p className="text-xs text-foreground-muted">{pillar.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
