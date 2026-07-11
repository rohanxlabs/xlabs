"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import { GlassmorphicCard } from "@/components/glassmorphic-card"

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  repoUrl: string
  status: "active" | "completed"
  image?: string
}

interface ProjectHighlightsProps {
  projects: Project[]
}

export function ProjectHighlights({ projects }: ProjectHighlightsProps) {
  const activeProjects = projects.filter(p => p.status === "active")
  const completedProjects = projects.filter(p => p.status === "completed").slice(0, 4)

  return (
    <GlassmorphicCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-content-primary">Project Highlights</h3>
        <Link 
          href="#projects" 
          className="text-sm text-phthalo-400 hover:text-phthalo-300 flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Active Projects */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-content-secondary mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Currently Active
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="p-4 rounded-xl bg-gradient-to-br from-phthalo-900/30 to-phthalo-800/10 border border-phthalo-500/20 hover:border-phthalo-500/40 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h5 className="font-semibold text-content-primary">{project.title}</h5>
                <Link 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                >
                  <Github className="w-4 h-4 text-content-secondary" />
                </Link>
              </div>
              <p className="text-sm text-content-secondary mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-md bg-phthalo-500/20 text-phthalo-300 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Completed Projects */}
      <div>
        <h4 className="text-sm font-medium text-content-secondary mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Recently Completed
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {completedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-content-primary text-sm truncate group-hover:text-phthalo-400 transition-colors">
                  {project.title}
                </h5>
                <p className="text-xs text-content-tertiary truncate">{project.tags.slice(0, 2).join(", ")}</p>
              </div>
              <Link 
                href={project.repoUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="w-4 h-4 text-content-secondary" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassmorphicCard>
  )
}