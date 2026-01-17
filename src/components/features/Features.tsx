"use client";

import { motion } from "framer-motion";
import {
    AlertTriangle,
    Calendar,
    Globe,
    Bell,
    BarChart3,
    Users,
    FileText,
    Shield,
    List,
    Plug,
    Package,
    ChevronRight,
} from "lucide-react";

const flowSteps = [
    {
        title: "Detect",
        description: "Ingest alerts from monitoring, APM, and uptime sources.",
        color: "from-rose-500 to-rose-600",
        bgGlow: "bg-rose-500/20",
    },
    {
        title: "Coordinate",
        description: "Route incidents, trigger on-call, and track ownership.",
        color: "from-amber-500 to-amber-600",
        bgGlow: "bg-amber-500/20",
    },
    {
        title: "Communicate",
        description: "Update status pages and notify stakeholders instantly.",
        color: "from-blue-500 to-blue-600",
        bgGlow: "bg-blue-500/20",
    },
    {
        title: "Learn",
        description: "Capture postmortems, SLA performance, and insights.",
        color: "from-emerald-500 to-emerald-600",
        bgGlow: "bg-emerald-500/20",
    },
];

// Real features from the codebase
const features = [
    {
        icon: AlertTriangle,
        title: "Incident Command",
        description:
            "Run the full incident lifecycle from trigger to resolution with timelines, assignments, and audit trails.",
        color: "text-accent-rose",
        bgColor: "bg-accent-rose/10",
    },
    {
        icon: Calendar,
        title: "On-Call Scheduling",
        description:
            "Design layered rotations, overrides, and handoffs to keep coverage reliable across teams.",
        color: "text-accent-blue",
        bgColor: "bg-accent-blue/10",
    },
    {
        icon: Bell,
        title: "Escalations & Routing",
        description:
            "Automate escalation paths, urgency mapping, and multi-channel alert routing.",
        color: "text-accent-amber",
        bgColor: "bg-accent-amber/10",
    },
    {
        icon: Globe,
        title: "Status Pages",
        description:
            "Publish branded status pages and keep customers updated with incident timelines.",
        color: "text-accent-emerald",
        bgColor: "bg-accent-emerald/10",
    },
    {
        icon: Shield,
        title: "Service Reliability",
        description:
            "Track service health, apply SLOs, and surface risk before the breach.",
        color: "text-accent-blue",
        bgColor: "bg-accent-blue/10",
    },
    {
        icon: BarChart3,
        title: "Analytics & SLA",
        description:
            "Measure MTTA, MTTR, SLA compliance, and trends across incidents and services.",
        color: "text-accent-blue",
        bgColor: "bg-accent-blue/10",
    },
    {
        icon: Plug,
        title: "Integrations & Webhooks",
        description:
            "Connect monitoring, DevOps, and custom systems with secure webhooks.",
        color: "text-accent-emerald",
        bgColor: "bg-accent-emerald/10",
    },
];

const additionalFeatures = [
    { icon: Users, title: "Teams & RBAC", description: "Role-based access and teams" },
    { icon: FileText, title: "Postmortems", description: "Capture learnings and action items" },
    { icon: List, title: "Event Logs", description: "Trace every change" },
    { icon: Shield, title: "Security", description: "API keys, audit logs, SSO" },
    { icon: Package, title: "Helm Deployments", description: "Repeatable Kubernetes installs" },
];

function FeatureCard({
    feature,
    index,
}: {
    feature: (typeof features)[0];
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
        >
            {/* Glow effect on hover */}
            <div className={`absolute -inset-1 ${feature.bgColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

            <div className="relative surface-panel rounded-2xl p-6 overflow-hidden transition-all duration-300 border border-transparent group-hover:border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div
                    className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 relative z-10">{feature.title}</h3>
                <p className="text-foreground-secondary text-sm leading-relaxed relative z-10">
                    {feature.description}
                </p>
            </div>
        </motion.div>
    );
}

function MiniFeature({ feature, index }: { feature: (typeof additionalFeatures)[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
            whileHover={{ x: 4 }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all cursor-default group"
        >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <feature.icon className="w-4 h-4 text-accent-emerald" />
            </div>
            <div>
                <h4 className="text-foreground font-medium text-sm">{feature.title}</h4>
                <p className="text-foreground-muted text-xs">{feature.description}</p>
            </div>
        </motion.div>
    );
}

export function Features() {
    return (
        <section id="features" className="relative py-24 section-shell">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-accent-blue text-sm font-medium uppercase tracking-wide">
                        Features
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
                        Everything you need for{" "}
                        <span className="gradient-text">incident response</span>
                    </h2>
                    <p className="text-foreground-secondary max-w-2xl mx-auto">
                        A complete platform to manage incidents, on-call schedules,
                        and keep your services running smoothly.
                    </p>
                </motion.div>

                {/* Ops Flow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative mb-16"
                >
                    {/* Connection line */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500/30 via-amber-500/30 via-blue-500/30 to-emerald-500/30 -translate-y-1/2 z-0" />

                    <div className="grid md:grid-cols-4 gap-4 relative z-10">
                        {flowSteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, y: -4 }}
                                className="relative group"
                            >
                                <div className={`absolute -inset-2 ${step.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="relative surface-panel rounded-xl p-5 border-t-2 border-t-transparent bg-clip-padding hover:border-t-white/20 transition-all">
                                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} text-white text-sm font-bold mb-3`}>
                                        {index + 1}
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                                    <p className="text-sm text-foreground-muted">{step.description}</p>
                                </div>
                                {/* Arrow connector */}
                                {index < flowSteps.length - 1 && (
                                    <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20">
                                        <ChevronRight className="w-4 h-4 text-slate-500" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Main Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                </div>

                {/* Additional Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/10 rounded-3xl blur-xl opacity-50" />
                    <div className="relative surface-panel rounded-2xl p-8 border border-white/5">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-500/50" />
                            <h3 className="text-xl font-semibold text-foreground">
                                Plus more...
                            </h3>
                            <div className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-500/50" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {additionalFeatures.map((feature, index) => (
                                <MiniFeature key={feature.title} feature={feature} index={index} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
