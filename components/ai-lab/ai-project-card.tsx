"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink, Eye, Clock, Calendar, CheckCircle2 } from "lucide-react"
import { AIProject } from "./types"
import { StatusBadge } from "./status-badge"
import { TechBadge } from "./tech-badge"
import { Button } from "@/components/ui/button"

interface AIProjectCardProps {
  project: AIProject
  onViewDetails: (project: AIProject) => void
  index: number
}

export function AIProjectCard({ project, onViewDetails, index }: AIProjectCardProps) {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: "easeOut"
      }
    },
    hover: prefersReducedMotion ? {} : {
      y: -8,
      rotateX: 1,
      rotateY: -1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    }
  }

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      className="group relative h-full"
    >
      {/* Card Container */}
      <div className="relative h-full backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-green-500/30 group-hover:shadow-2xl group-hover:shadow-green-500/10">
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <StatusBadge status={project.status} />
          </div>

          {/* Completion Badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm border border-white/10 text-zinc-300">
            {project.metadata.completionPercentage}%
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-zinc-400 text-sm mb-4 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 text-xs text-zinc-500 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {project.metadata.estimatedBuildTime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(project.metadata.lastUpdated)}
            </span>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.slice(0, 4).map((tech, i) => (
              <TechBadge key={tech.name} name={tech.name} index={i} />
            ))}
            {project.techStack.length > 4 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-zinc-500">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-zinc-400 hover:text-white transition-all text-sm font-medium"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="w-4 h-4" />
              Code
            </a>
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg text-green-400 hover:text-green-300 transition-all text-sm font-medium"
                aria-label={`View live demo for ${project.title}`}
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
            <button
              onClick={() => onViewDetails(project)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-white/[0.05] hover:bg-white/10 border border-white/10 rounded-lg text-zinc-400 hover:text-white transition-all text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label={`View details for ${project.title}`}
            >
              <Eye className="w-4 h-4" />
              Details
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}