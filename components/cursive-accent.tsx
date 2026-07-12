"use client"

import { motion } from "framer-motion"

interface CursiveAccentProps {
  text: string
  className?: string
}

export function CursiveAccent({ text, className }: CursiveAccentProps) {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  return (
    <motion.span
      className={`font-cursive italic ${className || ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
    >
      {text}
    </motion.span>
  )
}