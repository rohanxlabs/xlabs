"use client"

import { motion } from "framer-motion"
import { Github, ArrowUpRight, Clock, Star } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { categoryHex } from "@/lib/projects"
import type { Project } from "@/lib/projects"

interface ProjectCardProps {
  project: Project
  viewMode: "grid" | "list"
  onProjectClick: (project: Project) => void
  matchedTech?: string[]
}

export function ProjectCard({ project, viewMode, onProjectClick, matchedTech = [] }: ProjectCardProps) {
  const isList = viewMode === "list"
  const accent = categoryHex(project.category)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="group cursor-pointer h-full"
      onClick={() => onProjectClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onProjectClick(project)
        }
      }}
      aria-label={`Open ${project.title} details`}
    >
      <div
        className={`relative h-full bg-[#0c0c10] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-colors ${
          isList ? "flex flex-col sm:flex-row" : "flex flex-col"
        }`}
      >
        {/* Category accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] z-20"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />

        <div className={`relative overflow-hidden ${isList ? "sm:w-60 sm:h-auto h-44 w-full" : "h-48 w-full"}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-[#0c0c10]/30 to-transparent z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            <span className="text-[11px] font-medium text-white/90" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}>
              {project.category}
            </span>
          </div>
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
            {project.featured && (
              <Badge className="bg-black/50 text-phthalo-300 border-phthalo-500/40 backdrop-blur">
                <Star className="w-3 h-3 mr-1 fill-phthalo-300" /> Featured
              </Badge>
            )}
            {project.status === "active" && (
              <Badge className="bg-black/50 text-green-400 border-green-500/40 backdrop-blur">
                <Clock className="w-3 h-3 mr-1" /> Active
              </Badge>
            )}
          </div>
        </div>

        <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-content-primary group-hover:text-white transition-colors leading-tight">
                {project.title}
              </h3>
              <span className="text-[11px] text-content-tertiary flex-shrink-0 mt-1">{project.year}</span>
            </div>
            <p className="text-sm text-content-secondary line-clamp-2 mt-2">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.technologies.slice(0, isList ? 5 : 4).map((tech) => {
                const hit = matchedTech.includes(tech)
                return (
                  <span
                    key={tech}
                    className={`px-2 py-0.5 text-[10px] rounded-full border transition-colors ${
                      hit
                        ? "bg-phthalo-600/30 text-phthalo-200 border-phthalo-500/40"
                        : "bg-white/[0.04] text-content-tertiary border-white/[0.06]"
                    }`}
                  >
                    {tech}
                  </span>
                )
              })}
              {project.technologies.length > (isList ? 5 : 4) && (
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.04] text-content-tertiary border border-white/[0.06]">
                  +{project.technologies.length - (isList ? 5 : 4)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-1.5 text-[11px] text-content-tertiary">
              <span className="capitalize px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
                {project.difficulty}
              </span>
              <span className="capitalize px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
                {project.deployment}
              </span>
            </div>
            <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
              {project.repoUrl && (
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-content-secondary hover:text-white transition-colors"
                  aria-label={`Open ${project.title} repository`}
                >
                  <Github className="w-4 h-4" />
                </Link>
              )}
              <span
                className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-phthalo-600/90 text-white text-xs font-medium"
                aria-hidden
              >
                Open <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
