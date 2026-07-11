"use client"

import { motion, useMotionValue, useSpring, type SpringOptions } from "framer-motion"
import type { ReactNode } from "react"
import { useReducedMotion } from "framer-motion"

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
  spring?: SpringOptions
}

/** Magnetic hover wrapper — pulls child toward cursor with spring motion. */
export function Magnetic({
  children,
  className,
  strength = 0.25,
  spring = { stiffness: 200, damping: 15 },
}: MagneticProps) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useMotionValue(1)

  const springX = useSpring(x, spring)
  const springY = useSpring(y, spring)
  const springScale = useSpring(scale, spring)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength
    x.set(dx)
    y.set(dy)
    scale.set(1.03)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    scale.set(1)
  }

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, scale: springScale }}
    >
      {children}
    </motion.div>
  )
}
