"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  X,
  ArrowUpRight,
  Github,
  LayoutDashboard,
  GitBranch,
  Boxes,
  Image as ImageIcon,
  Calendar,
  BarChart3,
  Sparkles,
  Users,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArchitectureDiagram } from "@/components/architecture/architecture-diagram"
import { TechStackViz } from "@/components/architecture/tech-stack-viz"
import { ImageGallery } from "@/components/gallery/image-gallery"
import { DevelopmentTimeline } from "./development-timeline"
import { RepositoryInsights } from "./repository-insights"
import { TechnicalDocumentation } from "./technical-documentation"
import { RelatedProjects } from "./related-projects"
import { FeatureExplorer } from "./feature-explorer"
import { ProjectOverview } from "./project-overview"
import { getRelatedProjects } from "@/lib/projects"
import type { Project } from "@/lib/projects"

type TabId =
  | "overview"
  | "architecture"
  | "techstack"
  | "gallery"
  | "timeline"
  | "insights"
  | "features"
  | "related"

interface ProjectDetailWorkspaceProps {
  project: Project
  allProjects: Project[]
  onClose: () => void
  onSelectProject: (project: Project) => void
  searchTerm?: string
}

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "architecture", label: "Architecture", icon: GitBranch },
  { id: "techstack", label: "Tech Stack", icon: Boxes },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "timeline", label: "Timeline", icon: Calendar },
  { id: "insights", label: "Insights", icon: BarChart3 },
  { id: "features", label: "Features", icon: Sparkles },
  { id: "related", label: "Related", icon: Users },
]

export function ProjectDetailWorkspace({
  project,
  allProjects,
  onClose,
  onSelectProject,
  searchTerm,
}: ProjectDetailWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview")
  const reduce = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const related = getRelatedProjects(project, allProjects)

  // Lock body scroll + focus management while open.
  useEffect(() => {
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  // Trap focus within the dialog.
  useEffect(() => {
    const node = dialogRef.current
    if (!node) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key !== "Tab") return
      const focusables = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    node.addEventListener("keydown", onKey)
    return () => node.removeEventListener("keydown", onKey)
  }, [onClose])

  const transition = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
      }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        ref={dialogRef}
        initial={reduce ? { opacity: 0 } : { scale: 0.96, opacity: 0, y: 20 }}
        animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { scale: 0.96, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="w-[96vw] h-[94vh] sm:w-[95vw] sm:h-[90vh] bg-[#0f0f15] border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} project details`}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-5 sm:px-8 py-5 border-b border-white/[0.08] gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-black/40 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl font-bold text-content-primary truncate">{project.title}</h2>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge className="bg-white/[0.04] text-content-secondary border-white/[0.08]">
                  {project.category}
                </Badge>
                <span className="text-xs text-content-tertiary">v{project.repositoryInsights.version}</span>
                <span className="text-xs text-content-tertiary hidden sm:inline">
                  Updated {project.repositoryInsights.lastUpdate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-content-secondary hover:text-white hover:bg-white/[0.08] transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                View Code
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            )}
            <button
              ref={closeRef}
              onClick={onClose}
              className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              aria-label="Close project details"
            >
              <X className="w-5 h-5 text-content-secondary" />
            </button>
          </div>
        </header>

        {/* Body: vertical nav rail + content */}
        <div className="flex-1 flex min-h-0">
          {/* Vertical nav rail (desktop) */}
          <nav
            aria-label="Project sections"
            className="hidden sm:flex flex-col w-56 flex-shrink-0 border-r border-white/[0.08] p-3 gap-1 overflow-y-auto"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                    isActive
                      ? "bg-phthalo-600/15 text-phthalo-300 border border-phthalo-600/30"
                      : "text-content-secondary border border-transparent hover:bg-white/[0.04] hover:text-content-primary"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {tab.label}
                </button>
              )
            })}
          </nav>

          {/* Mobile tab bar */}
          <div className="sm:hidden flex w-full overflow-x-auto border-b border-white/[0.08] custom-scrollbar-phthalo">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    isActive
                      ? "border-phthalo-500 text-phthalo-400"
                      : "border-transparent text-content-secondary"
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Content */}
          <main className="flex-1 overflow-auto p-4 sm:p-8 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${project.id}-${activeTab}`}
                initial={transition.initial}
                animate={transition.animate}
                exit={transition.exit}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                {activeTab === "overview" && <ProjectOverview project={project} />}
                {activeTab === "architecture" && (
                  <ArchitectureDiagram
                    architecture={project.architecture}
                    projectName={project.title}
                    highlightTerm={searchTerm}
                  />
                )}
                {activeTab === "techstack" && (
                  <TechStackViz project={project} onTechSelect={() => {}} />
                )}
                {activeTab === "gallery" && (
                  <div className="h-full">
                    <div className="mb-5">
                      <h3 className="text-2xl font-bold text-content-primary mb-1">Screenshots</h3>
                      <p className="text-content-secondary text-sm">
                        Click any image to open the viewer — zoom, fullscreen, and keyboard navigation included.
                      </p>
                    </div>
                    <ImageGallery images={project.gallery} alt={project.title} />
                  </div>
                )}
                {activeTab === "timeline" && <DevelopmentTimeline timeline={project.timeline} />}
                {activeTab === "insights" && (
                  <RepositoryInsights
                    insights={project.repositoryInsights}
                    coreFeatures={project.coreFeatures}
                    challenges={project.challenges}
                    solutions={project.solutions}
                  />
                )}
                {activeTab === "features" && (
                  <div className="space-y-6">
                    <FeatureExplorer project={project} />
                    <TechnicalDocumentation
                      lessonsLearned={project.lessonsLearned}
                      futureImprovements={project.futureImprovements}
                      technicalDecisions={project.technicalDecisions}
                      technologies={project.technologies}
                    />
                  </div>
                )}
                {activeTab === "related" && (
                  <div className="h-full">
                    <div className="mb-5">
                      <h3 className="text-2xl font-bold text-content-primary mb-1">Cross-Project Relationships</h3>
                      <p className="text-content-secondary text-sm">
                        Projects connected through shared technologies and problem domains.
                      </p>
                    </div>
                    <RelatedProjects projects={related} onProjectClick={onSelectProject} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </motion.div>
    </motion.div>
  )
}
