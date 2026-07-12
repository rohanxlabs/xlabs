"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { springs } from "@/lib/motion-presets"
import { useEffect, useRef } from "react"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className, strength = 0.4 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springX = useSpring(x, springs.magnetic)
  const springY = useSpring(y, springs.magnetic)

  useEffect(() => {
    if (!ref.current) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current!.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      
      x.set(deltaX)
      y.set(deltaY)
    }
    
    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    const element = ref.current
    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)
    
    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength, x, y])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={springs.button}
    >
      {children}
    </motion.div>
  )
}