"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { buildTechStack, projectsUsingTech, type TechLayer } from "@/lib/projects"
import type { Project } from "@/lib/projects"

const LAYER_META: Record<TechLayer, { icon: string; tint: string }> = {
  Frontend: { icon: "🖥️", tint: "from-sky-500/20 to-sky-500/5" },
  Backend: { icon: "⚙️", tint: "from-emerald-500/20 to-emerald-500/5" },
  Database: { icon: "🗄️", tint: "from-amber-500/20 to-amber-500/5" },
  "AI/ML": { icon: "🧠", tint: "from-violet-500/20 to-violet-500/5" },
  Deployment: { icon: "🚀", tint: "from-rose-500/20 to-rose-500/5" },
  Infrastructure: { icon: "🛠️", tint: "from-cyan-500/20 to-cyan-500/5" },
}

interface TechStackVizProps {
  project: Project
  onTechSelect?: (tech: string) => void
}

export function TechStackViz({ project, onTechSelect }: TechStackVizProps) {
  const stack = buildTechStack(project)
  const layers = Object.entries(stack) as [TechLayer, string[]][]
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="h-full bg-black/20 rounded-2xl border border-white/[0.08] p-6 md:p-8 overflow-auto">
      <h3 className="text-2xl font-bold text-content-primary mb-1">Technology Stack</h3>
      <p className="text-content-secondary text-sm mb-8">
        Technologies grouped by role. Select one to see where it is used.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {layers.map(([layer, techs], i) => {
          const meta = LAYER_META[layer]
          return (
            <motion.div
              key={layer}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border border-white/[0.06] bg-gradient-to-br ${meta.tint} p-4`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{meta.icon}</span>
                <h4 className="text-sm font-semibold text-content-primary tracking-wide uppercase">
                  {layer}
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => {
                  const used = projectsUsingTech(tech)
                  const isSel = selected === tech
                  return (
                    <button
                      key={tech}
                      onClick={() => {
                        setSelected(isSel ? null : tech)
                        onTechSelect?.(isSel ? "" : tech)
                      }}
                      className={`group px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        isSel
                          ? "bg-phthalo-600 text-white border-phthalo-500"
                          : "bg-white/[0.04] text-content-secondary border-white/[0.08] hover:bg-white/[0.08] hover:text-content-primary"
                      }`}
                      title={`Used in ${used.length} project${used.length === 1 ? "" : "s"}`}
                    >
                      {tech}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-phthalo-950/40 border border-phthalo-700/40">
              <p className="text-sm font-medium text-phthalo-300 mb-2">
                {selected} is used across:
              </p>
              <div className="flex flex-wrap gap-2">
                {projectsUsingTech(selected).map((p) => (
                  <span
                    key={p.id}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-content-secondary border border-white/[0.08]"
                  >
                    {p.title}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
