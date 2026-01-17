"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Github, Terminal, BookOpen, Shield, Bell, Activity } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
            style={{ background: 'var(--gradient-hero)' }}
        >
            <AnimatedBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap items-center gap-3 mb-6"
                        >
                            <span className="badge bg-white/10 text-white border-white/20 backdrop-blur-md">OpsSentinal</span>
                            <span className="badge bg-white/10 text-white border-white/20 backdrop-blur-md">Open-Source Command Center</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                        >
                            The command center for{" "}
                            <span className="text-white">incident response</span>, on-call, and status updates
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-lg sm:text-xl text-slate-300 mb-8 max-w-xl"
                        >
                            OpsSentinal merges detection, response, and communication into a
                            single self-hosted platform built for SRE and platform teams.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 mb-8"
                        >
                            <Link
                                href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                                target="_blank"
                                className="btn-primary inline-flex items-center justify-center gap-2 text-base bg-white text-slate-900 hover:bg-slate-200 border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            >
                                <Github className="w-4 h-4" />
                                View on GitHub
                            </Link>
                            <Link
                                href="/docs"
                                className="btn-secondary inline-flex items-center justify-center gap-2 text-base bg-transparent hover:bg-white/10 border-slate-600 text-white"
                            >
                                <BookOpen className="w-4 h-4" />
                                Read Documentation
                            </Link>
                        </motion.div>

                        {/* Highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.5 }}
                            className="grid sm:grid-cols-3 gap-4 mb-8"
                        >
                            {[
                                { label: "Incident Response", icon: Activity, detail: "Triage to resolution" },
                                { label: "Escalations & On-Call", icon: Bell, detail: "Own every handoff" },
                                { label: "Status Pages", icon: Shield, detail: "Communicate instantly" },
                            ].map((item) => (
                                <div key={item.label} className="surface-panel rounded-xl p-4 bg-slate-800/40 border-slate-700/50 backdrop-blur-md">
                                    <item.icon className="w-5 h-5 text-white mb-3" />
                                    <p className="text-sm font-semibold text-white">{item.label}</p>
                                    <p className="text-xs text-slate-400 mt-1">{item.detail}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Quick Start Command */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.5 }}
                            className="glass rounded-lg p-4 max-w-md bg-slate-950/80 border-slate-800/60"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Terminal className="w-4 h-4 text-white" />
                                <span className="text-sm text-slate-400">Quick Start</span>
                            </div>
                            <code className="text-sm font-mono text-slate-200">
                                <span className="text-white">$</span>{" "}
                                git clone https://github.com/Dushyant-rahangdale/OpsSentinal.git
                            </code>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-slate-400 text-sm"
                        >
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                                Self-Hosted
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                                AGPL-3.0
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                                Docker & Kubernetes
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content - Dashboard Preview */}
                    <div className="mt-10 lg:mt-0">
                        <div className="relative max-w-2xl mx-auto">
                            <div className="absolute -top-4 left-6 z-10">
                                <span className="badge bg-slate-800 text-white border-slate-600 shadow-lg">Command Center Preview</span>
                            </div>
                            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl shadow-black/50">
                                <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-white/5 text-[11px] text-slate-300">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                        <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Live</span>
                                    </div>
                                    <span>OpsSentinal Command Center</span>
                                    <span className="text-slate-500">Auto-refresh</span>
                                </div>
                                <div className="p-1 bg-slate-950">
                                    <Image
                                        src="/dashboard-command-center.png"
                                        alt="OpsSentinal command center dashboard"
                                        width={1200}
                                        height={640}
                                        priority
                                        className="rounded-xl opacity-90 transition-opacity hover:opacity-100 duration-700"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate-400">
                                {[
                                    { label: "Live incidents", value: "19 active" },
                                    { label: "Coverage", value: "On-call ready" },
                                    { label: "Updates", value: "Auto-refresh" },
                                ].map((stat) => (
                                    <div key={stat.label} className="surface-panel rounded-lg p-3 text-center bg-slate-900/40 border-slate-800/40">
                                        <p className="text-slate-200 font-semibold">{stat.value}</p>
                                        <p className="text-slate-500">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gradient Fade Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none" />
        </section>
    );
}
