"use client";

import { motion } from "framer-motion";

function Aurora() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute -top-[50%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-500/20 blur-[120px] mix-blend-screen"
                animate={{
                    x: ["0%", "20%", "0%"],
                    y: ["0%", "10%", "0%"],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[100px] mix-blend-screen"
                animate={{
                    x: ["0%", "-10%", "0%"],
                    y: ["0%", "15%", "0%"],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />
            <motion.div
                className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-[100px] mix-blend-screen"
                animate={{
                    x: ["0%", "15%", "0%"],
                    y: ["0%", "-10%", "0%"],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />
        </div>
    );
}

function Stars() {
    // Generate static stars to avoid hydration mismatch, or use simple distinct positions
    // Using a few manual stars for stability + performance
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-20 animate-pulse" />
            <div className="absolute top-1/3 left-2/3 w-0.5 h-0.5 bg-white rounded-full opacity-40 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-sky-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />
            <div className="absolute bottom-1/4 right-1/4 w-0.5 h-0.5 bg-white rounded-full opacity-30 animate-pulse" style={{ animationDelay: "3s" }} />
            <div className="absolute top-10 right-20 w-1 h-1 bg-emerald-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: "4s" }} />
        </div>
    )
}

function Grid() {
    return (
        <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
                backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                backgroundSize: '4rem 4rem',
                maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
            }}
        />
    )
}

export function AnimatedBackground() {
    return (
        <div className="absolute inset-0 bg-slate-950">
            <Aurora />
            <Grid />
            <Stars />
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-80" />
        </div>
    );
}
