"use client"

import { motion } from "framer-motion"
import { easings, durations, glowPulse } from "@/lib/motion-presets"

export function CreativeHero() {
  return (
    <motion.div
      className="w-full h-[400px] md:h-[500px] relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: durations.slow, ease: easings.smooth }}
    >
      <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
        <motion.div
          className="absolute inset-0 overflow-hidden"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-phthalo-500/20 rounded-full"
            variants={glowPulse}
            initial="initial"
            animate="animate"
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-24 h-24 bg-phthalo-600/30 rounded-full"
            variants={glowPulse}
            initial="initial"
            animate="animate"
            transition={{ ...glowPulse.animate.transition, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-phthalo-400/25 rounded-full"
            variants={glowPulse}
            initial="initial"
            animate="animate"
            transition={{ ...glowPulse.animate.transition, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-phthalo-700/20 rounded-full"
            variants={glowPulse}
            initial="initial"
            animate="animate"
            transition={{ ...glowPulse.animate.transition, delay: 1.5 }}
          />
        </motion.div>

        <div className="absolute inset-0" aria-hidden="true">
          <motion.div
            className="absolute top-20 left-20 w-4 h-4 bg-phthalo-500/60 rotate-45"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0.4, 1, 0.4], y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: easings.smooth }}
          />
          <motion.div
            className="absolute top-40 right-32 w-6 h-6 bg-phthalo-600/60 rounded-full"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0.4, 1, 0.4], y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: easings.smooth }}
          />
          <motion.div
            className="absolute bottom-32 left-16 w-3 h-3 bg-phthalo-400/60"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0.4, 1, 0.4], y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: easings.smooth }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-5 h-5 bg-phthalo-700/60 rotate-45"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0.4, 1, 0.4], y: [0, -12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: easings.smooth }}
          />
        </div>

        <div className="relative z-10">
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-phthalo-500/50 shadow-2xl shadow-phthalo-900/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: durations.page, ease: easings.gentle }}
          >
            <img
              src="/pfpicon.jpg"
              alt="Rohan"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-phthalo-900/20 via-transparent to-transparent"></div>
          </motion.div>

          <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
            <span className="text-xs font-medium text-white">Available</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}