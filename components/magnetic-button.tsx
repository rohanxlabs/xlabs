"use client"

import { motion } from "framer-motion"
import { springs } from "@/lib/motion-presets"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={springs.button}
    >
      {children}
    </motion.div>
  )
}