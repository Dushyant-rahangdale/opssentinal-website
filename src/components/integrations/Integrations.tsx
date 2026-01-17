"use client";

import { motion } from "framer-motion";
import { integrationIcons, IntegrationKey } from "../icons/IntegrationIcons";

// Real integrations from the codebase
const integrations: { name: string; key: IntegrationKey; category: string }[] = [
    { name: "CloudWatch", key: "cloudwatch", category: "AWS" },
    { name: "Azure Monitor", key: "azure", category: "Cloud" },
    { name: "Google Cloud Monitoring", key: "googlecloud", category: "Cloud" },
    { name: "Datadog", key: "datadog", category: "Monitoring" },
    { name: "Prometheus", key: "prometheus", category: "Monitoring" },
    { name: "Grafana", key: "grafana", category: "Monitoring" },
    { name: "Splunk On-Call", key: "splunk", category: "Monitoring" },
    { name: "Splunk Observability", key: "splunk", category: "Monitoring" },
    { name: "Dynatrace", key: "dynatrace", category: "APM" },
    { name: "AppDynamics", key: "appdynamics", category: "APM" },
    { name: "New Relic", key: "newrelic", category: "APM" },
    { name: "Sentry", key: "sentry", category: "Error Tracking" },
    { name: "Elastic", key: "elastic", category: "Observability" },
    { name: "Honeycomb", key: "honeycomb", category: "Observability" },
    { name: "GitHub", key: "github", category: "DevOps" },
    { name: "Bitbucket", key: "bitbucket", category: "DevOps" },
    { name: "UptimeRobot", key: "uptimerobot", category: "Uptime" },
    { name: "Pingdom", key: "pingdom", category: "Uptime" },
    { name: "Better Uptime", key: "betterstack", category: "Uptime" },
    { name: "Uptime Kuma", key: "uptimekuma", category: "Uptime" },
    { name: "Webhook", key: "webhook", category: "Custom" },
];

// Real notification channels
const notifications = [
    { name: "Email", providers: "Resend, SendGrid, SMTP, AWS SES" },
    { name: "SMS", providers: "Twilio, AWS SNS" },
    { name: "Push", providers: "Firebase, OneSignal, Web Push" },
];

function IntegrationCard({ integration, index }: { integration: typeof integrations[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="surface-panel rounded-xl p-4 flex flex-col items-center gap-3 hover:border-accent-blue/50 transition-all cursor-pointer group"
        >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                {integrationIcons[integration.key]}
            </div>
            <div className="text-center">
                <p className="text-foreground font-medium text-sm">{integration.name}</p>
                <span className="mt-1 inline-flex items-center rounded-full bg-accent-blue/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-blue">
                    {integration.category}
                </span>
            </div>
        </motion.div>
    );
}

export function Integrations() {
    return (
        <section id="integrations" className="relative py-24 section-alt">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-accent-blue text-sm font-medium uppercase tracking-wide">
                        Integrations
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
                        Connect the tools you already trust
                    </h2>
                    <p className="text-foreground-secondary max-w-2xl mx-auto">
                        Route monitoring signals into OpsSentinal and fan out alerts across every channel.
                    </p>
                </motion.div>

                {/* Alert Sources */}
                <div className="mb-12">
                    <h3 className="text-lg font-semibold text-foreground mb-6 text-center">Signal Sources</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {integrations.map((integration, index) => (
                            <IntegrationCard key={integration.name} integration={integration} index={index} />
                        ))}
                    </div>
                </div>

                {/* Notification Channels */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="surface-panel rounded-2xl p-8"
                >
                    <h3 className="text-lg font-semibold text-foreground mb-6 text-center">Notification Routes</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {notifications.map((channel) => (
                            <div key={channel.name} className="text-center">
                                <p className="text-foreground font-semibold mb-2">{channel.name}</p>
                                <p className="text-foreground-muted text-sm">{channel.providers}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
