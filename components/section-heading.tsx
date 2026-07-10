"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true, margin: "-40px" }}
      >
        <span className="inline-flex items-center rounded-full bg-phthalo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-phthalo-400 border border-phthalo-500/20">
          {subtitle}
        </span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold tracking-tight text-balance"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
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
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-40px" }}
      />
    </div>
  )
}