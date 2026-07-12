"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink, Calendar, Clock, CheckCircle2, Rocket, AlertCircle, MapPin } from "lucide-react"
import { AIProject, statusConfig } from "./types"
import { StatusBadge } from "./status-badge"
import { TechBadge } from "./tech-badge"
import { Button } from "@/components/ui/button"

interface ProjectModalProps {
  project: AIProject | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  if (!project) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Close project details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
              
              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <StatusBadge status={project.status} />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 -mt-20 relative">
              {/* Header */}
              <div className="mb-8">
                <h2 id="project-modal-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {project.title}
                </h2>
                
                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {project.metadata.estimatedBuildTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Updated {formatDate(project.metadata.lastUpdated)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {project.metadata.completionPercentage}% complete
                  </span>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, index) => (
                    <TechBadge key={tech.name} name={tech.name} index={index} />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Details Sections */}
              <div className="space-y-8">
                {/* Overview */}
                <section>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-green-500" />
                    Overview
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">{project.fullDescription.overview}</p>
                </section>

                {/* Problem */}
                <section>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    Problem
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">{project.fullDescription.problem}</p>
                </section>

                {/* Solution */}
                <section>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-blue-500" />
                    Solution
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">{project.fullDescription.solution}</p>
                </section>

                {/* Challenges */}
                <section>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    Challenges
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">{project.fullDescription.challenges}</p>
                </section>

                {/* Features */}
                <section>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Future Roadmap */}
                <section>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    Future Roadmap
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.futureRoadmap.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}