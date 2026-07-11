"use client"

import { motion, AnimatePresence } from "framer-motion"
import { FolderOpen } from "lucide-react"
import type { Project } from "@/lib/projects"
import { ProjectCard } from "./project-card"

interface ProjectExplorerProps {
  projects: Project[]
  viewMode: "grid" | "list"
  onProjectClick: (project: Project) => void
  matchedTech?: Record<string, string[]>
}

export function ProjectExplorer({
  projects,
  viewMode,
  onProjectClick,
  matchedTech = {},
}: ProjectExplorerProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-24 rounded-2xl border border-dashed border-white/[0.1]">
        <FolderOpen className="w-10 h-10 text-content-tertiary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-content-primary mb-2">No projects found</h3>
        <p className="text-content-secondary max-w-md mx-auto">
          Try adjusting your search or clearing some filters to find what you&apos;re looking for.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      layout
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          : "flex flex-col gap-4"
      }
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            viewMode={viewMode}
            onProjectClick={onProjectClick}
            matchedTech={matchedTech[project.id] ?? []}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
