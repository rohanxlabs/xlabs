"use client"

import { motion } from "framer-motion"

interface TechBadgeProps {
  name: string
  index?: number
}

export function TechBadge({ name, index = 0 }: TechBadgeProps) {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  return (
    <motion.span
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.2, 
        delay: prefersReducedMotion ? 0 : index * 0.05,
        ease: "easeOut"
      }}
      whileHover={prefersReducedMotion ? {} : { 
        scale: 1.05, 
        y: -2,
        transition: { duration: 0.15 }
      }}
      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-zinc-300 hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-400 transition-colors cursor-default"
    >
      {name}
    </motion.span>
  )
}