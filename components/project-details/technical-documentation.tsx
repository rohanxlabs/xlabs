"use client"

import { motion } from "framer-motion"
import { Lightbulb, Rocket, Code2 } from "lucide-react"

interface TechnicalDocumentationProps {
  lessonsLearned: string
  futureImprovements: string
  technicalDecisions: string
  technologies: string[]
}

export function TechnicalDocumentation({
  lessonsLearned,
  futureImprovements,
  technicalDecisions,
  technologies,
}: TechnicalDocumentationProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-black/20 border border-white/[0.08]"
      >
        <div className="flex items-center gap-2 mb-3">
          <Code2 className="w-4 h-4 text-phthalo-400" />
          <h4 className="text-sm font-semibold text-content-primary">Technical Decisions</h4>
        </div>
        <p className="text-sm text-content-secondary leading-relaxed">{technicalDecisions}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-lg bg-phthalo-900/30 text-phthalo-300 border border-phthalo-700/30 text-xs"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-6 rounded-2xl bg-black/20 border border-white/[0.08]"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-semibold text-content-primary">Lessons Learned</h4>
          </div>
          <p className="text-sm text-content-secondary leading-relaxed">{lessonsLearned}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-black/20 border border-white/[0.08]"
        >
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="w-4 h-4 text-phthalo-400" />
            <h4 className="text-sm font-semibold text-content-primary">Future Improvements</h4>
          </div>
          <p className="text-sm text-content-secondary leading-relaxed">{futureImprovements}</p>
        </motion.div>
      </div>
    </div>
  )
}
