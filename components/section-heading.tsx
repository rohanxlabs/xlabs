"use client"

import { motion } from "framer-motion"
import { easings, durations, staggers } from "@/lib/motion-presets"

interface SectionHeadingProps {
  title: string
  subtitle: string
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, delay, ease: easings.smooth },
  }),
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.slow, ease: easings.smooth }}
        viewport={{ once: true, margin: "-40px" }}
      >
        <span className="inline-flex items-center rounded-full bg-phthalo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-phthalo-400 border border-phthalo-500/20">
          {subtitle}
        </span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold tracking-tight text-balance"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.slow, delay: staggers.default, ease: easings.smooth }}
        viewport={{ once: true, margin: "-40px" }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
          {title}
        </span>
      </motion.h2>

      <motion.div
        className="w-12 h-1 bg-gradient-to-r from-phthalo-600 to-phthalo-800 rounded-full mx-auto"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: durations.slow, delay: staggers.default * 2, ease: easings.smooth }}
        viewport={{ once: true, margin: "-40px" }}
      />
    </div>
  )
}