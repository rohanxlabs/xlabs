import { portfolioProjects } from "./data"
import type {
  Project,
  ProjectFilters,
  SortKey,
  TechLayer,
  Difficulty,
  ProjectStatus,
  Deployment,
  ProjectType,
} from "./types"

export { portfolioProjects }
export * from "./types"

// Category accent palette — used across cards, sidebar, and chips to give the
// explorer a platform feel while staying within the existing dark/phthalo theme.
export const CATEGORY_HEX: Record<string, string> = {
  AI: "#10b981",
  "Machine Learning": "#3b82f6",
  "Computer Vision": "#8b5cf6",
  Robotics: "#ef4444",
  LLMs: "#f59e0b",
  MLOps: "#06b6d4",
}

export function categoryHex(category: string): string {
  return CATEGORY_HEX[category] ?? "#339b5e"
}

export function getAggregateStats() {
  const categories = new Set(portfolioProjects.map((p) => p.category))
  const technologies = new Set(portfolioProjects.flatMap((p) => p.technologies))
  const years = new Set(portfolioProjects.map((p) => p.year))
  return {
    projects: portfolioProjects.length,
    categories: categories.size,
    technologies: technologies.size,
    years: years.size,
    featured: portfolioProjects.filter((p) => p.featured).length,
  }
}

export const emptyFilters: ProjectFilters = {
  category: [],
  technology: [],
  status: [],
  year: [],
  difficulty: [],
  type: [],
  deployment: [],
  openSource: null,
  featured: null,
  tag: [],
}

export function getCategories(): string[] {
  return [...new Set(portfolioProjects.map((p) => p.category))]
}

export function getTags(): string[] {
  return [...new Set(portfolioProjects.flatMap((p) => p.tags))].sort()
}

export function getTechnologies(): string[] {
  return [...new Set(portfolioProjects.flatMap((p) => p.technologies))].sort()
}

export function getYears(): string[] {
  return [...new Set(portfolioProjects.map((p) => p.year))].sort((a, b) => b.localeCompare(a))
}

export function getTypes(): ProjectType[] {
  return [...new Set(portfolioProjects.map((p) => p.type))]
}

export function getDifficulties(): Difficulty[] {
  const order: Difficulty[] = ["intermediate", "advanced", "expert"]
  return order.filter((d) => portfolioProjects.some((p) => p.difficulty === d))
}

export function getDeployments(): Deployment[] {
  return [...new Set(portfolioProjects.map((p) => p.deployment))]
}

export function getStatuses(): ProjectStatus[] {
  return [...new Set(portfolioProjects.map((p) => p.status))]
}

export function getFeaturedProjects(): Project[] {
  return portfolioProjects.filter((p) => p.featured)
}

export function countActiveFilters(filters: ProjectFilters): number {
  return (
    filters.category.length +
    filters.technology.length +
    filters.status.length +
    filters.year.length +
    filters.difficulty.length +
    filters.type.length +
    filters.deployment.length +
    filters.tag.length +
    (filters.openSource !== null ? 1 : 0) +
    (filters.featured !== null ? 1 : 0)
  )
}

// Maps a known technology to a logical layer for the tech-stack visualization.
// Only factual technology roles are encoded here; unknown entries fall back to "AI/ML".
const techLayerMap: Record<string, TechLayer> = {
  React: "Frontend",
  Streamlit: "Frontend",
  "Next.js": "Frontend",
  FastAPI: "Backend",
  "Node.js": "Backend",
  PostgreSQL: "Database",
  Pinecone: "Database",
  YOLOv8: "AI/ML",
  PyTorch: "AI/ML",
  Langchain: "AI/ML",
  HuggingFace: "AI/ML",
  Groq: "AI/ML",
  "Stable-Baselines3": "AI/ML",
  Gymnasium: "AI/ML",
  NumPy: "AI/ML",
  Pandas: "AI/ML",
  "Scikit-learn": "AI/ML",
  XGBoost: "AI/ML",
  MuJoCo: "AI/ML",
  Docker: "Deployment",
  Kubernetes: "Deployment",
  MLflow: "Infrastructure",
  Prometheus: "Infrastructure",
}

export function layerForTech(tech: string): TechLayer {
  return techLayerMap[tech] ?? "AI/ML"
}

export function buildTechStack(project: Project): Record<TechLayer, string[]> {
  const layers: Record<TechLayer, string[]> = {
    Frontend: [],
    Backend: [],
    Database: [],
    "AI/ML": [],
    Deployment: [],
    Infrastructure: [],
  }
  project.technologies.forEach((tech) => {
    layers[layerForTech(tech)].push(tech)
  })
  // Remove empty layers for a cleaner visualization.
  ;(Object.keys(layers) as TechLayer[]).forEach((key) => {
    if (layers[key].length === 0) delete layers[key]
  })
  return layers
}

export function matchesFilters(project: Project, filters: ProjectFilters): boolean {
  if (filters.category.length && !filters.category.includes(project.category)) return false
  if (filters.type.length && !filters.type.includes(project.type)) return false
  if (filters.status.length && !filters.status.includes(project.status)) return false
  if (filters.year.length && !filters.year.includes(project.year)) return false
  if (filters.difficulty.length && !filters.difficulty.includes(project.difficulty)) return false
  if (filters.deployment.length && !filters.deployment.includes(project.deployment)) return false
  if (filters.openSource !== null && project.openSource !== filters.openSource) return false
  if (filters.featured !== null && project.featured !== filters.featured) return false
  if (
    filters.technology.length &&
    !project.technologies.some((t) => filters.technology.includes(t))
  )
    return false
  if (filters.tag.length && !project.tags.some((t) => filters.tag.includes(t))) return false
  return true
}

export function matchesSearch(
  project: Project,
  query: string,
): { hit: boolean; matchedTech: string[] } {
  const q = query.trim().toLowerCase()
  if (!q) return { hit: true, matchedTech: [] }
  const matchedTech = project.technologies.filter((t) => t.toLowerCase().includes(q))
  const hit =
    project.title.toLowerCase().includes(q) ||
    project.description.toLowerCase().includes(q) ||
    project.longDescription.toLowerCase().includes(q) ||
    project.tags.some((t) => t.toLowerCase().includes(q)) ||
    matchedTech.length > 0 ||
    project.technologies.some((t) => t.toLowerCase().includes(q)) ||
    project.architecture.some(
      (n) => n.name.toLowerCase().includes(q) || n.description.toLowerCase().includes(q),
    )
  return { hit, matchedTech }
}

const difficultyRank: Record<Difficulty, number> = {
  intermediate: 1,
  advanced: 2,
  expert: 3,
}

export function sortProjects(projects: Project[], sort: SortKey): Project[] {
  const copy = [...projects]
  switch (sort) {
    case "recent":
      return copy.sort((a, b) => b.year.localeCompare(a.year))
    case "title":
      return copy.sort((a, b) => a.title.localeCompare(b.title))
    case "difficulty":
      return copy.sort((a, b) => difficultyRank[b.difficulty] - difficultyRank[a.difficulty])
    case "featured":
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured))
  }
}

export function filterAndSort(
  query: string,
  filters: ProjectFilters,
  sort: SortKey,
): { projects: Project[]; matchedTechByProject: Record<string, string[]> } {
  const matchedTechByProject: Record<string, string[]> = {}
  const filtered = portfolioProjects.filter((project) => {
    if (!matchesFilters(project, filters)) return false
    const { hit, matchedTech } = matchesSearch(project, query)
    if (hit && matchedTech.length) matchedTechByProject[project.id] = matchedTech
    return hit
  })
  return { projects: sortProjects(filtered, sort), matchedTechByProject }
}

export function getRelatedProjects(project: Project, all: Project[] = portfolioProjects): Project[] {
  return all
    .filter(
      (p) =>
        p.id !== project.id &&
        (p.category === project.category ||
          p.technologies.some((t) => project.technologies.includes(t))),
    )
    .sort((a, b) => {
      const sharedA = a.technologies.filter((t) => project.technologies.includes(t)).length
      const sharedB = b.technologies.filter((t) => project.technologies.includes(t)).length
      return sharedB - sharedA
    })
    .slice(0, 4)
}

// Builds cross-project technology relationships for the Knowledge Graph integration.
export interface TechGraphNode {
  id: string
  name: string
  category: string
}

export interface TechGraphLink {
  source: string
  target: string
}

export function buildTechGraph(): { nodes: TechGraphNode[]; links: TechGraphLink[] } {
  const techIds = new Set<string>()
  portfolioProjects.forEach((p) => p.technologies.forEach((t) => techIds.add(t)))

  const nodes: TechGraphNode[] = [...techIds].map((t) => ({
    id: t,
    name: t,
    category: layerForTech(t).toLowerCase(),
  }))

  const links: TechGraphLink[] = []
  const seen = new Set<string>()
  portfolioProjects.forEach((p) => {
    const techs = p.technologies
    for (let i = 0; i < techs.length; i++) {
      for (let j = i + 1; j < techs.length; j++) {
        const key = [techs[i], techs[j]].sort().join("::")
        if (!seen.has(key)) {
          seen.add(key)
          links.push({ source: techs[i], target: techs[j] })
        }
      }
    }
  })

  return { nodes, links }
}

// Returns the projects that use a given technology — used by interactive search.
export function projectsUsingTech(tech: string): Project[] {
  const q = tech.toLowerCase()
  return portfolioProjects.filter((p) => p.technologies.some((t) => t.toLowerCase() === q))
}
