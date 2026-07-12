"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { AIProject, ProjectCategory, SortOption, projects, allCategories } from "./types"
import { SearchInput } from "./search-input"
import { SortDropdown } from "./sort-dropdown"
import { FilterButton } from "./filter-button"
import { EmptyState } from "./empty-state"
import { ProjectModal } from "./project-modal"
import { AIProjectCard } from "./ai-project-card"
import { SectionHeading } from "@/components/section-heading"
import { CursiveAccent } from "@/components/cursive-accent"

export function AILab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [selectedProject, setSelectedProject] = useState<AIProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = [{ value: "all", label: "All" }, ...allCategories]

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = [...projects]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.techStack.some(tech => tech.name.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(project => project.category === activeCategory)
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.metadata.lastUpdated).getTime() - new Date(a.metadata.lastUpdated).getTime())
        break
      case "production-ready":
        filtered.sort((a, b) => b.metadata.completionPercentage - a.metadata.completionPercentage)
        break
      case "most-complex":
        filtered.sort((a, b) => b.techStack.length - a.techStack.length)
        break
      case "ai":
        const aiCategories: ProjectCategory[] = ["ai", "machine-learning", "generative-ai", "agentic-ai", "computer-vision"]
        filtered.sort((a, b) => {
          const aIsAI = aiCategories.includes(a.category) ? 0 : 1
          const bIsAI = aiCategories.includes(b.category) ? 0 : 1
          return aIsAI - bIsAI
        })
        break
      case "web":
        filtered.sort((a, b) => {
          const aIsFullStack = a.category === "full-stack" ? 0 : 1
          const bIsFullStack = b.category === "full-stack" ? 0 : 1
          return aIsFullStack - bIsFullStack
        })
        break
    }

    return filtered
  }, [searchQuery, activeCategory, sortBy])

  const handleViewDetails = (project: AIProject) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <section className="section-py relative" id="ai-lab">
      {/* Background effects */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionHeading 
            title="AI Lab" 
            subtitle="Where ideas become intelligent systems" 
          />
          <CursiveAccent 
            text="exploring the boundaries of artificial intelligence" 
            className="block mt-6 text-2xl md:text-3xl text-green-400/80"
          />
        </div>

        {/* Search, Filter, Sort Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 space-y-6"
        >
          {/* Search and Sort row */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchInput 
                value={searchQuery} 
                onChange={setSearchQuery}
                placeholder="Search projects by name, technology, or description..."
              />
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <FilterButton
                key={category.value}
                label={category.label}
                isActive={activeCategory === category.value}
                onClick={() => setActiveCategory(category.value as ProjectCategory | "all")}
              />
            ))}
          </div>

          {/* Results count */}
          <div className="text-sm text-zinc-500">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <AIProjectCard
                key={project.id}
                project={project}
                onViewDetails={handleViewDetails}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}