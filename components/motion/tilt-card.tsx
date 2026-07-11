"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import type { ReactNode } from "react"
import { useReducedMotion } from "framer-motion"

interface TiltCardProps {
  children: ReactNode
  className?: string
  tiltMaxAngle?: number
  scale?: number
}

/** 3D tilt + spotlight effect for interactive cards. */
export function TiltCard({
  children,
  className,
  tiltMaxAngle = 8,
  scale = 1.02,
}: TiltCardProps) {
  const reduce = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scaleVal = useMotionValue(1)

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })
  const springScale = useSpring(scaleVal, { stiffness: 200, damping: 15 })

  // Spotlight follows cursor
  const spotlightX = useTransform(rotateY, [-tiltMaxAngle, tiltMaxAngle], [0, 100])
  const spotlightY = useTransform(rotateX, [-tiltMaxAngle, tiltMaxAngle], [0, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * tiltMaxAngle * 2)
    rotateX.set(py * tiltMaxAngle * -2)
    scaleVal.set(scale)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    scaleVal.set(1)
  }

  return (
    <motion.div
      className={className}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: springScale,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(255,255,255,0.15) 0%, transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  )
}