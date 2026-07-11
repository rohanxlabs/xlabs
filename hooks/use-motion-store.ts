"use client"

import { motion, useReducedMotion } from "framer-motion"
import { easings, durations, springs } from "@/lib/motion-presets"

export function useMotion() {
  const reduced = useReducedMotion()
  
  return {
    reduced,
    ease: easings.smooth,
    duration: durations.default,
    spring: springs.soft,
    fadeInUp: {
      hidden: { opacity: 0, y: reduced ? 0 : 20 },
      visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: reduced ? 1 : 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
  }
}