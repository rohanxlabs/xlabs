"use client"

import { motion } from "framer-motion"
import { Github, ArrowUpRight, Clock, Calendar, Gauge, Cloud, Boxes, GitBranch } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/projects"

interface ProjectOverviewProps {
  project: Project
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      <div className="text-phthalo-400">{icon}</div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-content-tertiary">{label}</p>
        <p className="text-sm font-medium text-content-primary truncate capitalize">{value}</p>
      </div>
    </div>
  )
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-video bg-black/30"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {project.featured && (
            <Badge className="absolute top-3 right-3 bg-phthalo-500/20 text-phthalo-300 border-phthalo-500/30">
              Featured
            </Badge>
          )}
        </motion.div>

        {/* Summary + actions */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-white/[0.04] text-content-secondary border-white/[0.08]">
              {project.category}
            </Badge>
            <Badge className="bg-white/[0.04] text-content-secondary border-white/[0.08]">
              {project.type}
            </Badge>
            <Badge
              className={
                project.status === "active"
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-blue-500/20 text-blue-400 border-blue-500/30"
              }
            >
              {project.status === "active" ? "In Progress" : "Completed"}
            </Badge>
          </div>
          <p className="text-sm text-content-secondary leading-relaxed">{project.longDescription}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-content-secondary hover:text-white hover:bg-white/[0.08] transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                View Code
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            )}
            {project.liveDemo && (
              <Link
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-phthalo-600 text-white hover:bg-phthalo-700 transition-colors text-sm"
              >
                Live Demo
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-phthalo-900/30 text-phthalo-300 border border-phthalo-700/30 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick facts */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Fact icon={<Calendar className="w-4 h-4" />} label="Year" value={project.year} />
        <Fact icon={<Gauge className="w-4 h-4" />} label="Difficulty" value={project.difficulty} />
        <Fact
          icon={project.deployment === "cloud" ? <Cloud className="w-4 h-4" /> : <Boxes className="w-4 h-4" />}
          label="Deployment"
          value={project.deployment}
        />
        <Fact
          icon={<GitBranch className="w-4 h-4" />}
          label="Open Source"
          value={project.openSource ? "Yes" : "No"}
        />
        <Fact icon={<Clock className="w-4 h-4" />} label="Version" value={project.repositoryInsights.version} />
        <Fact
          icon={<Boxes className="w-4 h-4" />}
          label="Status"
          value={project.repositoryInsights.deploymentStatus}
        />
      </div>
    </div>
  )
}
