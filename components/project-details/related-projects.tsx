"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/projects"

interface RelatedProjectsProps {
  projects: Project[]
  onProjectClick: (project: Project) => void
}

export function RelatedProjects({ projects, onProjectClick }: RelatedProjectsProps) {
  if (projects.length === 0) {
    return (
      <div className="p-10 text-center rounded-2xl bg-black/20 border border-white/[0.08]">
        <p className="text-content-secondary">No related projects found.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-content-secondary text-sm mb-5">
        Projects linked by shared category or technologies. Select one to open it instantly.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onProjectClick(p)}
            className="group text-left p-5 rounded-2xl bg-black/20 border border-white/[0.08] hover:border-phthalo-500/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-phthalo-500"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/40 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-content-primary truncate group-hover:text-phthalo-300 transition-colors">
                    {p.title}
                  </h4>
                  <ArrowUpRight className="w-4 h-4 text-content-tertiary group-hover:text-phthalo-300 transition-colors flex-shrink-0" />
                </div>
                <p className="text-xs text-content-tertiary mt-0.5 line-clamp-2">{p.description}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge className="bg-white/[0.04] text-content-secondary border-white/[0.08] text-[10px]">
                    {p.category}
                  </Badge>
                  {p.technologies.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-content-tertiary border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-5 text-center">
        <Link
          href="/command-center"
          className="inline-flex items-center gap-2 text-xs text-content-tertiary hover:text-phthalo-300 transition-colors"
        >
          Explore the full technology knowledge graph
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
