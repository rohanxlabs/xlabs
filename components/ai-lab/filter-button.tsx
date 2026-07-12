"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FilterButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  return (
    <motion.button
      onClick={onClick}
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      className={cn(
        "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
        isActive 
          ? "bg-green-500/20 border-green-500/40 text-green-400" 
          : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="activeFilter"
          className="absolute inset-0 rounded-full bg-green-500/10"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  )
}