"use client"

import { motion } from "framer-motion"
import { easings, durations, springs } from "@/lib/motion-presets"

interface SkillBadgeProps {
  name: string
  level: number
}

export function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: durations.slow, ease: easings.smooth }}
      viewport={{ once: true, margin: "-20px" }}
      whileHover={{ y: -4 }}
      className="w-40 shrink-0"
    >
      <div className="card card-hover p-5 h-full">
        <div className="relative">
          <div className="text-center mb-4 font-semibold text-sm text-content-secondary">{name}</div>

          <div className="relative h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-phthalo-600 to-phthalo-800 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              transition={{ duration: durations.slower, delay: 0.2, ease: easings.emphasized }}
              viewport={{ once: true }}
            />
          </div>

          <div className="mt-2 text-right text-xs text-content-tertiary font-medium tabular-nums">{level}%</div>
        </div>
      </div>
    </motion.div>
  )
}