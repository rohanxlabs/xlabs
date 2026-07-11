"use client"

import { motion } from "framer-motion"
import { Code2 } from "lucide-react"
import type { CodeHighlight } from "@/lib/projects"

interface CodeHighlightsProps {
  highlights: CodeHighlight[]
}

export function CodeHighlights({ highlights }: CodeHighlightsProps) {
  if (highlights.length === 0) {
    return (
      <div className="p-10 text-center rounded-2xl bg-black/20 border border-white/[0.08]">
        <p className="text-content-secondary">No code highlights documented for this project.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-content-secondary text-sm mb-5">
        Summarized engineering ideas — not raw source. Each card explains a design decision worth knowing.
      </p>
      <div className="space-y-4">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl bg-black/20 border border-white/[0.08]"
          >
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-4 h-4 text-phthalo-400" />
              <h4 className="text-sm font-semibold text-content-primary">{h.title}</h4>
            </div>
            <p className="text-sm text-content-secondary leading-relaxed">{h.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
