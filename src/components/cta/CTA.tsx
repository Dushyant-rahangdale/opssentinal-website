"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Terminal, Copy, Rocket } from "lucide-react";

export function CTA() {
    return (
        <section className="relative py-24 section-shell overflow-hidden">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
                    >
                        <Rocket className="w-4 h-4" />
                        Ready to deploy
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                        Launch OpsSentinal in your{" "}
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">own infrastructure</span>
                    </h2>

                    <p className="text-lg text-foreground-secondary mb-10 max-w-2xl mx-auto">
                        Clone the repository, spin up Docker, and start routing incidents in minutes.
                    </p>

                    {/* Quick Start */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative max-w-xl mx-auto mb-10"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-emerald-500/20 rounded-2xl blur-lg opacity-50" />
                        <div className="relative surface-panel rounded-xl p-6 border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                        <Terminal className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-foreground font-medium">Quick Start</span>
                                </div>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white text-xs transition-all">
                                    <Copy className="w-3 h-3" />
                                    Copy
                                </button>
                            </div>
                            <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-left overflow-x-auto border border-slate-800/50">
                                <div className="flex items-center">
                                    <span className="text-emerald-400 mr-2">$</span>
                                    <span className="text-slate-300">git clone https://github.com/Dushyant-rahangdale/OpsSentinal.git</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <span className="text-emerald-400 mr-2">$</span>
                                    <span className="text-slate-300">cd OpsSentinal && docker-compose up -d</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link
                            href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                            target="_blank"
                            className="inline-flex items-center gap-2 text-base px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
                        >
                            <Github className="w-5 h-5" />
                            View on GitHub
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
