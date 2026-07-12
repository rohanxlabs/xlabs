"use client"

export type ProjectStatus = "active" | "production" | "research" | "experimental" | "archived"
export type ProjectCategory = "ai" | "machine-learning" | "generative-ai" | "agentic-ai" | "computer-vision" | "full-stack" | "robotics" | "mlops"
export type SortOption = "newest" | "most-complex" | "ai" | "web" | "production-ready"

export interface ProjectTech {
  name: string
  icon?: string
}

export interface ProjectMetadata {
  estimatedBuildTime: string
  lastUpdated: string
  completionPercentage: number
}

export interface ProjectLinks {
  live?: string
  github: string
}

export interface AIProject {
  id: string
  title: string
  shortDescription: string
  fullDescription: {
    overview: string
    problem: string
    solution: string
    challenges: string
  }
  status: ProjectStatus
  category: ProjectCategory
  techStack: ProjectTech[]
  metadata: ProjectMetadata
  links: ProjectLinks
  thumbnail: string
  images?: string[]
  videos?: string[]
  features: string[]
  futureRoadmap: string[]
}

export const statusConfig: Record<ProjectStatus, { label: string; color: string; dotColor: string }> = {
  active: { 
    label: "Active Development", 
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20", 
    dotColor: "bg-blue-500" 
  },
  production: { 
    label: "Production Ready", 
    color: "bg-green-500/10 text-green-400 border-green-500/20", 
    dotColor: "bg-green-500" 
  },
  research: { 
    label: "Research", 
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20", 
    dotColor: "bg-purple-500" 
  },
  experimental: { 
    label: "Experimental", 
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", 
    dotColor: "bg-yellow-500" 
  },
  archived: { 
    label: "Archived", 
    color: "bg-gray-500/10 text-gray-400 border-gray-500/20", 
    dotColor: "bg-gray-500" 
  },
}

export const categoryConfig: Record<ProjectCategory, { label: string }> = {
  "ai": { label: "AI" },
  "machine-learning": { label: "Machine Learning" },
  "generative-ai": { label: "Generative AI" },
  "agentic-ai": { label: "Agentic AI" },
  "computer-vision": { label: "Computer Vision" },
  "full-stack": { label: "Full Stack" },
  "robotics": { label: "Robotics" },
  "mlops": { label: "MLOps" },
}

export const allCategories: { value: ProjectCategory; label: string }[] = Object.entries(categoryConfig).map(([value, { label }]) => ({
  value: value as ProjectCategory,
  label
}))

export const projects: AIProject[] = [
  {
    id: "agentic-ai-system",
    title: "Agentic AI System",
    shortDescription: "An Autonomous Agentic AI system which work on agents system, build different agent each work.",
    fullDescription: {
      overview: "A comprehensive multi-agent AI system where specialized intelligent agents collaborate to solve complex tasks autonomously.",
      problem: "Traditional AI systems struggle with complex, multi-step problems that require specialized knowledge across different domains.",
      solution: "Built a modular agent architecture where each agent specializes in a specific task, with a central orchestrator coordinating their interactions.",
      challenges: "Implementing effective communication between agents while preventing conflicts and ensuring optimal task allocation."
    },
    status: "active",
    category: "agentic-ai",
    techStack: [
      { name: "Python" },
      { name: "Langchain" },
      { name: "FastAPI" },
      { name: "Generative AI" }
    ],
    metadata: {
      estimatedBuildTime: "3 months",
      lastUpdated: "2024-01-15",
      completionPercentage: 85
    },
    links: {
      github: "https://github.com/rohanxlabs/Agentic-AI-system"
    },
    thumbnail: "/p4.png?height=400&width=600",
    features: ["Multi-agent coordination", "Autonomous task planning", "Natural language communication"],
    futureRoadmap: ["Add more specialized agents", "Improve orchestration logic", "Add web interface for monitoring"]
  },
  {
    id: "recommendation-system",
    title: "Recommendation System",
    shortDescription: "A research-style project which work on recommend system.A comprehensive recommendation engine.",
    fullDescription: {
      overview: "A comprehensive recommendation engine implementing collaborative and content-based filtering techniques.",
      problem: "Users were struggling to discover relevant content in large catalogs, leading to poor engagement.",
      solution: "Implemented hybrid recommendation approach combining collaborative filtering with content-based analysis.",
      challenges: "Balancing between serendipity and relevance while maintaining real-time performance."
    },
    status: "production",
    category: "machine-learning",
    techStack: [
      { name: "Python" },
      { name: "NumPy" },
      { name: "Pandas" },
      { name: "Scikit-learn" }
    ],
    metadata: {
      estimatedBuildTime: "2 months",
      lastUpdated: "2024-01-10",
      completionPercentage: 100
    },
    links: {
      github: "https://github.com/rohanxlabs/Recommendation-system"
    },
    thumbnail: "/portfolio.jpg",
    features: ["Collaborative filtering", "Content-based recommendations", "Real-time inference"],
    futureRoadmap: ["Add deep learning models", "Implement A/B testing framework", "Scale to million users"]
  },
  {
    id: "perceptagent",
    title: "PerceptAgent",
    shortDescription: "Real-time object detection pipeline powered by YOLOv8 + Groq LLM agentic loop.",
    fullDescription: {
      overview: "Real-time object detection pipeline that combines computer vision with LLM reasoning.",
      problem: "Traditional object detection systems can identify objects but lack the ability to reason about their context and relationships.",
      solution: "Built a pipeline that uses YOLOv8 for detection and feeds the results into a Groq LLM for higher-level reasoning.",
      challenges: "Achieving low latency while maintaining high accuracy in complex, dynamic environments."
    },
    status: "production",
    category: "computer-vision",
    techStack: [
      { name: "Python" },
      { name: "YOLOv8" },
      { name: "Ultralytics" },
      { name: "GROQ" },
      { name: "Streamlit" }
    ],
    metadata: {
      estimatedBuildTime: "1.5 months",
      lastUpdated: "2024-01-08",
      completionPercentage: 100
    },
    links: {
      github: "https://github.com/rohanxlabs/PercerptAgent.git"
    },
    thumbnail: "/perceptagent.png",
    features: ["Real-time detection", "LLM-powered reasoning", "Web-based dashboard"],
    futureRoadmap: ["Add more vision models", "Support video streaming", "Deploy to edge devices"]
  },
  {
    id: "robotic-arm",
    title: "6-DOF Robotic Arm (MuJoCo)",
    shortDescription: "a 6-DOF robotic arm simulation built with MuJoCo fot high-fidelity physics modeling.",
    fullDescription: {
      overview: "High-fidelity robotic arm simulation for reinforcement learning research.",
      problem: "Training robotic control policies in the real world is expensive and dangerous.",
      solution: "Created a realistic simulation environment using MuJoCo that enables safe, fast iteration of RL algorithms.",
      challenges: "Tuning physics parameters to match real-world dynamics while maintaining simulation stability."
    },
    status: "research",
    category: "robotics",
    techStack: [
      { name: "Python" },
      { name: "MuJoCo" },
      { name: "Gymnasium" },
      { name: "Stablebaseline3" }
    ],
    metadata: {
      estimatedBuildTime: "4 months",
      lastUpdated: "2024-01-05",
      completionPercentage: 70
    },
    links: {
      github: "https://github.com/rohanxlabs/6-DOF-Robotic-Arm-MuJoco-"
    },
    thumbnail: "/trade.jpg",
    features: ["High-fidelity physics", "RL environment integration", "Keyboard teleoperation"],
    futureRoadmap: ["Add camera sensors", "Implement more complex tasks", "Transfer learning to real robot"]
  },
  {
    id: "vision-object-detection",
    title: "Vision Object Detection",
    shortDescription: "A computer vision project focused on real-time object detection, classification, and localization.",
    fullDescription: {
      overview: "State-of-the-art computer vision system for real-time object detection and classification.",
      problem: "Existing solutions were too heavy to run on edge devices with limited computational resources.",
      solution: "Optimized YOLOv8 architecture with quantization and pruning for edge deployment.",
      challenges: "Maintaining accuracy while significantly reducing model size and inference latency."
    },
    status: "production",
    category: "computer-vision",
    techStack: [
      { name: "Python" },
      { name: "YOLOv8" },
      { name: "PyTorch" },
      { name: "ONNX" }
    ],
    metadata: {
      estimatedBuildTime: "2 months",
      lastUpdated: "2024-01-03",
      completionPercentage: 100
    },
    links: {
      github: "https://github.com/rohanxlabs/Vision-object-detection"
    },
    thumbnail: "/vision.jpg",
    features: ["Real-time inference", "Edge device optimization", "Multiple input sources"],
    futureRoadmap: ["Add tracking", "Support more model architectures", "Mobile deployment"]
  },
  {
    id: "churn-prediction",
    title: "Churn Prediction",
    shortDescription: "An end-to-end machine learning system designed to predict customer churn.",
    fullDescription: {
      overview: "End-to-end machine learning system for customer churn prediction and retention optimization.",
      problem: "Businesses were losing customers without understanding why, making retention impossible.",
      solution: "Built a classification system that identifies at-risk customers with high accuracy, enabling targeted interventions.",
      challenges: "Handling imbalanced datasets and creating actionable insights from model predictions."
    },
    status: "production",
    category: "machine-learning",
    techStack: [
      { name: "Python" },
      { name: "FastAPI" },
      { name: "NumPy" },
      { name: "XGBoost" }
    ],
    metadata: {
      estimatedBuildTime: "1.5 months",
      lastUpdated: "2023-12-20",
      completionPercentage: 100
    },
    links: {
      github: "https://github.com/rohanxlabs/churn-ml-system"
    },
    thumbnail: "/churn.png",
    features: ["High accuracy predictions", "REST API deployment", "Feature importance analysis"],
    futureRoadmap: ["Add time-series forecasting", "Real-time scoring pipeline", "Integration with CRM systems"]
  },
  {
    id: "genai-image-generator",
    title: "GenAI Image Generator",
    shortDescription: "A Generative AI application built to create high-quality, stylized images.",
    fullDescription: {
      overview: "Generative AI application for creating high-quality, stylized images from text prompts.",
      problem: "Existing image generation APIs were expensive and lacked customization options.",
      solution: "Self-hosted stable diffusion pipeline with custom fine-tuning for specific artistic styles.",
      challenges: "Managing GPU resources efficiently while maintaining good image quality and generation speed."
    },
    status: "experimental",
    category: "generative-ai",
    techStack: [
      { name: "Python" },
      { name: "PyTorch" },
      { name: "Hugging Face" },
      { name: "Stable Diffusion" }
    ],
    metadata: {
      estimatedBuildTime: "2 months",
      lastUpdated: "2023-12-15",
      completionPercentage: 60
    },
    links: {
      github: "https://github.com/rohanxlabs/GenAI-Image-Generator"
    },
    thumbnail: "/stable.jpg",
    features: ["Text-to-image generation", "Style transfer", "Batch processing"],
    futureRoadmap: ["Add inpainting", "Support video generation", "Optimize for consumer GPUs"]
  },
  {
    id: "rag-system",
    title: "RAG System",
    shortDescription: "A Retrieval-Augmented Generation (RAG) system designed to provide accurate, context-aware answers.",
    fullDescription: {
      overview: "Production-ready RAG system for question answering on custom document collections.",
      problem: "LLMs suffer from hallucinations and lack knowledge about specific, private documents.",
      solution: "Implemented a robust RAG pipeline that retrieves relevant document chunks and augments LLM prompts with accurate context.",
      challenges: "Handling long documents effectively and preventing context window overflow while maintaining answer quality."
    },
    status: "production",
    category: "generative-ai",
    techStack: [
      { name: "Python" },
      { name: "LangChain" },
      { name: "FAISS" },
      { name: "OpenAI" }
    ],
    metadata: {
      estimatedBuildTime: "1 month",
      lastUpdated: "2024-01-12",
      completionPercentage: 100
    },
    links: {
      github: "https://github.com/rohanxlabs/rag-based-qa-system"
    },
    thumbnail: "/rag.jpg",
    features: ["Document ingestion pipeline", "Semantic search", "Conversational QA"],
    futureRoadmap: ["Add multi-modal RAG", "Support more document formats", "Implement citation tracking"]
  },
  {
    id: "sentinel-ml",
    title: "Sentinel-ml",
    shortDescription: "An end-to-end Machine Learning pipeline designed for security analytics and intelligent anomaly detection.",
    fullDescription: {
      overview: "Security analytics platform that uses machine learning to detect anomalies and potential threats in system metrics.",
      problem: "Rule-based security systems miss novel threats and generate too many false positives.",
      solution: "Unsupervised learning models that establish normal behavior patterns and flag anomalous activity.",
      challenges: "Adapting to evolving system behavior while avoiding alert fatigue from false positives."
    },
    status: "active",
    category: "mlops",
    techStack: [
      { name: "Python" },
      { name: "Prometheus" },
      { name: "MLflow" },
      { name: "Scikit-learn" }
    ],
    metadata: {
      estimatedBuildTime: "3 months",
      lastUpdated: "2024-01-14",
      completionPercentage: 75
    },
    links: {
      github: "https://github.com/rohanxlabs/sentinel-ml.git"
    },
    thumbnail: "/sentinel.png",
    features: ["Real-time anomaly detection", "Metric visualization", "Alerting integration"],
    futureRoadmap: ["Add predictive analytics", "Support more data sources", "Automated response actions"]
  }
]