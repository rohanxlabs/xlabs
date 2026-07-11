// Shared type definitions for the Project Explorer experience.
// All fields are sourced from the real portfolio; no invented metrics.

export type ProjectStatus = "active" | "completed"
export type Difficulty = "intermediate" | "advanced" | "expert"
export type Deployment = "cloud" | "local"
export type ProjectType = "AI/ML" | "Robotics" | "MLOps"

export interface ArchitectureNode {
  name: string
  description: string
  connections: string[]
}

export interface TimelineStage {
  stage: string
  date: string
  status: "completed" | "in-progress" | "future"
}

export type TechLayer =
  | "Frontend"
  | "Backend"
  | "Database"
  | "AI/ML"
  | "Deployment"
  | "Infrastructure"

export interface RepositoryInsights {
  languages: Record<string, number>
  lastUpdate: string
  version: string
  documentation: boolean
  deploymentStatus: string
  recentUpdates?: string[]
}

export interface CodeHighlight {
  title: string
  description: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  image: string
  gallery: string[]
  repoUrl: string
  liveDemo?: string
  status: ProjectStatus
  category: string
  year: string
  difficulty: Difficulty
  deployment: Deployment
  openSource: boolean
  featured: boolean
  type: ProjectType
  technologies: string[]
  architecture: ArchitectureNode[]
  challenges: string
  solutions: string
  lessonsLearned: string
  futureImprovements: string
  coreFeatures: string[]
  technicalDecisions: string
  codeHighlights: CodeHighlight[]
  timeline: TimelineStage[]
  repositoryInsights: RepositoryInsights
}

export type SortKey =
  | "featured"
  | "recent"
  | "title"
  | "difficulty"

export interface ProjectFilters {
  category: string[]
  technology: string[]
  status: ProjectStatus[]
  year: string[]
  difficulty: Difficulty[]
  type: ProjectType[]
  deployment: Deployment[]
  openSource: boolean | null
  featured: boolean | null
  tag: string[]
}
