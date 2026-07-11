"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

/** Custom spotlight cursor — only visible on desktop, hidden on touch. */
export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 500, damping: 50, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 500, damping: 50, mass: 0.5 })

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    setIsDesktop(!isTouch)

    if (isTouch) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const enter = () => setVisible(true)
    const leave = () => setVisible(false)

    document.addEventListener("mousemove", move)
    document.addEventListener("mouseenter", enter)
    document.addEventListener("mouseleave", leave)

    return () => {
      document.removeEventListener("mousemove", move)
      document.removeEventListener("mouseenter", enter)
      document.removeEventListener("mouseleave", leave)
    }
  }, [x, y])

  if (!isDesktop) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-64 h-64 rounded-full pointer-events-none z-[9999] mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.5 }}
      transition={{ duration: 0.2 }}
    />
  )
}