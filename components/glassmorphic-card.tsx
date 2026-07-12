"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { durations, easings } from "@/lib/motion-presets"

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
}

export function GlassmorphicCard({ children, className }: GlassmorphicCardProps) {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: durations.default, ease: easings.smooth }
    },
    hover: prefersReducedMotion ? {} : {
      y: -6,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  }

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      variants={cardVariants}
      viewport={{ once: true, margin: "-40px" }}
      className={cn("group relative", className)}
    >
      <div className="relative h-full backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-green-500/20 group-hover:shadow-xl group-hover:shadow-green-500/5">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        </div>
        <div className="relative">{children}</div>
      </div>
    </motion.article>
  )
}