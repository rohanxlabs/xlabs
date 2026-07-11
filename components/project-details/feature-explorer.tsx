"use client"

import { motion } from "framer-motion"
import { Sparkles, Cpu, Target, Wrench } from "lucide-react"
import type { Project } from "@/lib/projects"

interface FeatureExplorerProps {
  project: Project
}

export function FeatureExplorer({ project }: FeatureExplorerProps) {
  return (
    <div className="space-y-6">
      {/* Why it exists */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-phthalo-950/40 to-transparent border border-phthalo-700/30"
      >
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-phthalo-400" />
          <h4 className="text-sm font-semibold text-phthalo-300">Why this project exists</h4>
        </div>
        <p className="text-sm text-content-secondary leading-relaxed">{project.longDescription}</p>
      </motion.div>

      {/* Core features */}
      <div className="p-6 rounded-2xl bg-black/20 border border-white/[0.08]">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-phthalo-400" />
          <h4 className="text-sm font-semibold text-content-primary">Core Features</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.coreFeatures.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-2 text-sm text-content-secondary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-phthalo-500 flex-shrink-0" />
              {f}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interesting challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-black/20 border border-white/[0.08]">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-semibold text-content-primary">Interesting Challenge</h4>
          </div>
          <p className="text-sm text-content-secondary leading-relaxed">{project.challenges}</p>
        </div>
        <div className="p-6 rounded-2xl bg-black/20 border border-white/[0.08]">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-phthalo-400" />
            <h4 className="text-sm font-semibold text-content-primary">How It Was Solved</h4>
          </div>
          <p className="text-sm text-content-secondary leading-relaxed">{project.solutions}</p>
        </div>
      </div>

      {/* Engineering highlights */}
      {project.codeHighlights.length > 0 && (
        <div className="p-6 rounded-2xl bg-black/20 border border-white/[0.08]">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-phthalo-400" />
            <h4 className="text-sm font-semibold text-content-primary">Engineering Highlights</h4>
          </div>
          <div className="space-y-3">
            {project.codeHighlights.map((h, i) => (
              <div
                key={h.title}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <p className="text-sm font-medium text-content-primary">{h.title}</p>
                <p className="text-xs text-content-secondary mt-1 leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
