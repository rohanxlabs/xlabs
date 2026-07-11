"use client"

import { useState, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X, Brain, TrendingUp, Clock, Target, Rocket, Zap, Code, Database, Cloud, Cpu } from "lucide-react"
import { KnowledgeGraph } from "@/components/knowledge-graph/knowledge-graph"
import { CurrentFocusWidget } from "@/components/dashboard/current-focus-widget"
import { AIMetricsWidget } from "@/components/dashboard/ai-metrics-widget"
import { CareerRoadmap } from "@/components/dashboard/career-roadmap"
import { ProjectHighlights } from "@/components/dashboard/project-highlights"
import { SearchBar } from "@/components/dashboard/search-bar"
import { FilterSidebar } from "@/components/dashboard/filter-sidebar"
import { GlassmorphicCard } from "@/components/glassmorphic-card"

// Real data extracted from the portfolio
const portfolioData = {
  projects: [
    {
      id: "agentic-ai",
      title: "Agentic AI System",
      description: "An Autonomous Agentic AI system which work on agents system, build different agent each work.",
      tags: ["Agentic AI", "Machine Learning", "FastAPI", "Python", "Langchain", "Generative AI"],
      repoUrl: "https://github.com/rohanxlabs/Agentic-AI-system",
      status: "completed"
    },
    {
      id: "recommendation-system",
      title: "Recommendation System",
      description: "A comprehensive recommendation engine implementing collaborative and content-based filtering.",
      tags: ["Machine Learning", "Python", "MLOps", "NumPy"],
      repoUrl: "https://github.com/rohanxlabs/Recommendation-system",
      status: "completed"
    },
    {
      id: "perceptagent",
      title: "PerceptAgent",
      description: "Real-time object detection pipeline powered by YOLOv8 + Groq LLM agentic loop.",
      tags: ["Streamlit", "YOLOv8", "Ultralytics", "GROQ", "Agent Workflows"],
      repoUrl: "https://github.com/rohanxlabs/PercerptAgent.git",
      status: "completed"
    },
    {
      id: "robotic-arm",
      title: "6-DOF Robotic Arm (MuJoCo)",
      description: "A 6-DOF robotic arm simulation built with MuJoCo for high-fidelity physics modeling.",
      tags: ["Python", "MuJoCo", "Gymnasium", "Reinforcement Learning", "Stablebaseline3", "Agentic AI"],
      repoUrl: "https://github.com/rohanxlabs/6-DOF-Robotic-Arm-MuJoco-",
      status: "active"
    },
    {
      id: "vision-detection",
      title: "Vision Object Detection",
      description: "Computer vision project focused on real-time object detection using deep learning architectures.",
      tags: ["Python", "YOLOv8", "Machine Learning", "Deep Learning", "Computer Vision"],
      repoUrl: "https://github.com/rohanxlabs/Vision-object-detection",
      status: "completed"
    },
    {
      id: "churn-prediction",
      title: "Churn Prediction",
      description: "End-to-end machine learning system designed to predict customer churn.",
      tags: ["Python", "FastAPI", "NumPy", "Machine Learning", "NLP"],
      repoUrl: "https://github.com/rohanxlabs/churn-ml-system",
      status: "completed"
    },
    {
      id: "genai-image",
      title: "GenAI Image Generator",
      description: "Generative AI application built to create high-quality, stylized images using diffusion models.",
      tags: ["Python", "hugging face", "Stable diffusion", "generative AI", "AI"],
      repoUrl: "https://github.com/rohanxlabs/GenAI-Image-Generator",
      status: "completed"
    },
    {
      id: "rag-system",
      title: "RAG System",
      description: "Retrieval-Augmented Generation (RAG) system for accurate, context-aware answers.",
      tags: ["Python", "FastAPI", "Pandas", "RAG", "NumPY", "Generative AI"],
      repoUrl: "https://github.com/rohanxlabs/rag-based-qa-system",
      status: "completed"
    },
    {
      id: "sentinel-ml",
      title: "Sentinel-ml",
      description: "End-to-end Machine Learning pipeline for security analytics and anomaly detection.",
      tags: ["Python", "Machine Learning", "Prometheus", "Scikit-Learn", "MLflow"],
      repoUrl: "https://github.com/rohanxlabs/sentinel-ml.git",
      status: "active"
    }
  ],
  technologies: [
    { id: "python", name: "Python", category: "language", x: 400, y: 300 },
    { id: "pytorch", name: "PyTorch", category: "ai", x: 350, y: 250 },
    { id: "tensorflow", name: "TensorFlow", category: "ai", x: 450, y: 250 },
    { id: "ml", name: "Machine Learning", category: "ai", x: 400, y: 200 },
    { id: "dl", name: "Deep Learning", category: "ai", x: 400, y: 150 },
    { id: "llms", name: "LLMs", category: "ai", x: 350, y: 100 },
    { id: "rag", name: "RAG", category: "ai", x: 300, y: 130 },
    { id: "agents", name: "Agents", category: "ai", x: 450, y: 100 },
    { id: "mlops", name: "MLOps", category: "devops", x: 500, y: 200 },
    { id: "cv", name: "Computer Vision", category: "ai", x: 300, y: 180 },
    { id: "robotics", name: "Robotics", category: "robotics", x: 250, y: 300 },
    { id: "ros", name: "ROS", category: "robotics", x: 200, y: 350 },
    { id: "mujoco", name: "MuJoCo", category: "robotics", x: 250, y: 380 },
    { id: "nextjs", name: "Next.js", category: "frontend", x: 550, y: 300 },
    { id: "fastapi", name: "FastAPI", category: "backend", x: 500, y: 350 },
    { id: "docker", name: "Docker", category: "devops", x: 550, y: 250 },
    { id: "kubernetes", name: "Kubernetes", category: "devops", x: 600, y: 280 },
    { id: "backend", name: "Backend", category: "backend", x: 550, y: 400 },
    { id: "cloud", name: "Cloud", category: "cloud", x: 600, y: 350 },
    { id: "devops", name: "DevOps", category: "devops", x: 580, y: 200 },
    { id: "data-engineering", name: "Data Engineering", category: "data", x: 450, y: 400 },
    { id: "git", name: "Git", category: "devops", x: 530, y: 150 },
    { id: "linux", name: "Linux", category: "devops", x: 580, y: 150 }
  ],
  relationships: [
    { source: "python", target: "pytorch" },
    { source: "python", target: "tensorflow" },
    { source: "python", target: "fastapi" },
    { source: "pytorch", target: "ml" },
    { source: "tensorflow", target: "ml" },
    { source: "ml", target: "dl" },
    { source: "dl", target: "llms" },
    { source: "dl", target: "cv" },
    { source: "llms", target: "rag" },
    { source: "llms", target: "agents" },
    { source: "rag", target: "python" },
    { source: "agents", target: "python" },
    { source: "cv", target: "python" },
    { source: "robotics", target: "python" },
    { source: "robotics", target: "ros" },
    { source: "ros", target: "mujoco" },
    { source: "ml", target: "mlops" },
    { source: "mlops", target: "docker" },
    { source: "docker", target: "kubernetes" },
    { source: "devops", target: "git" },
    { source: "devops", target: "linux" },
    { source: "devops", target: "cloud" },
    { source: "backend", target: "fastapi" },
    { source: "backend", target: "nextjs" },
    { source: "data-engineering", target: "python" },
    { source: "mlops", target: "devops" }
  ],
  metrics: {
    projects: 9,
    repositories: 9,
    technologies: 23,
    deployments: 15,
    models: 12,
    hackathons: 3,
    learningHours: 5000,
    experienceYears: 3
  },
  currentFocus: {
    currentlyBuilding: "6-DOF Robotic Arm with Reinforcement Learning",
    currentlyLearning: "Advanced Robotics, Embodied AI",
    nextGoal: "Master Autonomous Systems",
    researchAreas: ["Embodied AI", "Agentic AI", "Robotics"],
    openSourceFocus: "Contributing to MuJoCo and LLM frameworks"
  },
  careerRoadmap: [
    { id: "current", title: "Current", status: "current", description: "AI/ML Engineer building intelligent systems" },
    { id: "internship", title: "Internship", status: "completed", description: "Gained industry experience in AI/ML" },
    { id: "ai-engineer", title: "AI Engineer", status: "current", description: "Working as a professional AI Engineer" },
    { id: "ml-engineer", title: "ML Engineer", status: "future", description: "Advance to senior ML Engineer role" },
    { id: "robotics", title: "Robotics Specialist", status: "future", description: "Specialize in autonomous robotics" },
    { id: "founder", title: "Founder", status: "future", description: "Build and lead a technology startup" }
  ],
  filterCategories: [
    { id: "ai", name: "AI", icon: Brain },
    { id: "backend", name: "Backend", icon: Database },
    { id: "frontend", name: "Frontend", icon: Code },
    { id: "cloud", name: "Cloud", icon: Cloud },
    { id: "robotics", name: "Robotics", icon: Cpu },
    { id: "mlops", name: "MLOps", icon: Zap },
    { id: "llms", name: "LLMs", icon: Brain },
    { id: "computer-vision", name: "Computer Vision", icon: Cpu }
  ]
}

export default function AICommandCenter() {
  const [selectedNode, setSelectedNode] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter technologies based on search and active filters
  const filteredTechnologies = useMemo(() => {
    return portfolioData.technologies.filter(tech => {
      const matchesSearch = searchQuery === "" || 
        tech.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      if (activeFilters.length === 0) return matchesSearch
      
      const categoryMap: Record<string, string[]> = {
        "ai": ["ai"],
        "backend": ["backend"],
        "frontend": ["frontend"],
        "cloud": ["cloud"],
        "robotics": ["robotics"],
        "mlops": ["devops"],
        "llms": ["ai"],
        "computer-vision": ["ai"]
      }
      
      return activeFilters.some(filter => {
        const categories = categoryMap[filter] || []
        return categories.includes(tech.category) && matchesSearch
      })
    })
  }, [searchQuery, activeFilters])

  const handleNodeClick = (node: any) => {
    setSelectedNode(node)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterToggle = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    )
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
      {/* Status Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/[0.08]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-phthalo-500 to-phthalo-700 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-content-primary">AI Command Center</h1>
                <p className="text-xs text-content-tertiary">Interactive Knowledge Graph Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-content-secondary">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>System operational</span>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" ref={containerRef}>
        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
          </div>
          <div className="hidden lg:flex items-center gap-2">
            {portfolioData.filterCategories.slice(0, 4).map(category => (
              <button
                key={category.id}
                onClick={() => handleFilterToggle(category.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilters.includes(category.id)
                    ? "bg-phthalo-600 text-white"
                    : "bg-white/[0.04] text-content-secondary border border-white/[0.08] hover:bg-white/[0.08]"
                }`}
              >
                <category.icon className="w-4 h-4 inline mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left - Knowledge Graph */}
          <div className="lg:col-span-7 xl:col-span-8">
            <GlassmorphicCard className="h-[600px] lg:h-[700px] overflow-hidden">
              <KnowledgeGraph
                technologies={filteredTechnologies}
                relationships={portfolioData.relationships}
                onNodeClick={handleNodeClick}
                selectedNode={selectedNode}
              />
            </GlassmorphicCard>
          </div>

          {/* Right - Current Focus */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <CurrentFocusWidget data={portfolioData.currentFocus} />
            <AIMetricsWidget metrics={portfolioData.metrics} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Project Highlights */}
          <div className="lg:col-span-2">
            <ProjectHighlights projects={portfolioData.projects} />
          </div>
          
          {/* Career Roadmap */}
          <div className="lg:col-span-1">
            <CareerRoadmap roadmap={portfolioData.careerRoadmap} />
          </div>
        </div>
      </main>

      {/* Node Detail Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl"
          >
            <GlassmorphicCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-content-primary">{selectedNode.name}</h3>
                  <p className="text-sm text-content-tertiary capitalize">{selectedNode.category}</p>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-content-secondary mb-2">Projects using this</h4>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.projects
                      .filter(p => p.tags.some(t => t.toLowerCase().includes(selectedNode.name.toLowerCase())))
                      .slice(0, 3)
                      .map(project => (
                        <span key={project.id} className="px-2 py-1 rounded-md bg-phthalo-600/20 text-phthalo-300 text-xs">
                          {project.title}
                        </span>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-content-secondary mb-2">Related technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.relationships
                      .filter(r => r.source === selectedNode.id || r.target === selectedNode.id)
                      .map((rel, idx) => {
                        const relatedId = rel.source === selectedNode.id ? rel.target : rel.source
                        const relatedTech = portfolioData.technologies.find(t => t.id === relatedId)
                        return relatedTech ? (
                          <span key={idx} className="px-2 py-1 rounded-md bg-white/[0.04] text-content-secondary text-xs">
                            {relatedTech.name}
                          </span>
                        ) : null
                      })}
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Filter Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-[#09090b] border-l border-white/[0.08] z-50 lg:hidden p-6 overflow-y-auto"
            >
              <FilterSidebar
                categories={portfolioData.filterCategories}
                activeFilters={activeFilters}
                onFilterToggle={handleFilterToggle}
                onClose={() => setSidebarOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}