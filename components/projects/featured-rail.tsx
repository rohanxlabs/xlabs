"use client"

import { motion } from "framer-motion"
import { Star, ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/projects"

interface FeaturedRailProps {
  projects: Project[]
  onProjectClick: (project: Project) => void
}

export function FeaturedRail({ projects, onProjectClick }: FeaturedRailProps) {
  if (projects.length === 0) return null
  return (
    <section aria-label="Featured projects" className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-4 h-4 text-phthalo-400" />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-content-secondary">
          Featured Projects
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3 snap-x custom-scrollbar-phthalo">
        {projects.map((project, i) => (
          <motion.button
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onProjectClick(project)}
            className="group relative flex-shrink-0 w-72 snap-start text-left rounded-2xl overflow-hidden border border-white/[0.08] bg-black/20 hover:border-phthalo-500/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-phthalo-500"
          >
            <div className="h-32 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-content-primary truncate">{project.title}</h3>
                <ArrowUpRight className="w-4 h-4 text-content-tertiary group-hover:text-phthalo-300 transition-colors" />
              </div>
              <p className="text-xs text-content-tertiary mt-1 line-clamp-2">{project.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
