"use client"

import { motion, useInView, useMotionValue, useSpring, type MotionValue } from "framer-motion"
import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  decimals?: number
  className?: string
  suffix?: string
}

function formatNumber(value: number, decimals: number): string {
  return value.toFixed(decimals)
}

export function AnimatedCounter({
  from = 0,
  to,
  decimals = 0,
  className,
  suffix = "",
}: AnimatedCounterProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px" })

  const count = useMotionValue(from)
  const springCount = useSpring(count, { stiffness: 100, damping: 30 })

  useEffect(() => {
    if (inView && !reduce) {
      count.set(to)
    }
  }, [inView, to, count, reduce])

  return (
    <motion.span ref={ref} className={className}>
      {reduce ? `${to.toFixed(decimals)}${suffix}` : formatNumber(springCount.get(), decimals) + suffix}
    </motion.span>
  )
}