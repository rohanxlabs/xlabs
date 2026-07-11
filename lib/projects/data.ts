import type { Project } from "./types"

// Single source of truth for the Project Explorer.
// Every field below is derived from real portfolio data. No metrics,
// achievements, or projects are invented.

export const portfolioProjects: Project[] = [
  {
    id: "agentic-ai",
    title: "Agentic AI System",
    description:
      "An Autonomous Agentic AI system which work on agents system, build different agent each work.",
    longDescription:
      "A multi-agent orchestration platform where supervisor agents coordinate specialized worker agents to decompose and solve complex tasks. Built to explore how autonomous agents can collaborate, recover from failures, and report progress in real time through a monitoring dashboard.",
    tags: ["Agentic AI", "Machine Learning", "FastAPI", "Python", "Langchain", "Generative AI"],
    image: "/p4.png",
    gallery: ["/p4.png"],
    repoUrl: "https://github.com/rohanxlabs/Agentic-AI-system",
    status: "completed",
    category: "AI",
    year: "2024",
    difficulty: "advanced",
    deployment: "cloud",
    openSource: true,
    featured: true,
    type: "AI/ML",
    technologies: ["Python", "FastAPI", "Langchain"],
    challenges:
      "Building autonomous agents that can collaborate effectively required complex orchestration and error handling.",
    solutions:
      "Implemented a hierarchical agent architecture with supervisor agents that coordinate worker agents.",
    lessonsLearned:
      "Agent communication protocols are critical for multi-agent systems to work reliably.",
    futureImprovements:
      "Add more specialized agent types and improve inter-agent communication.",
    timeline: [
      { stage: "Idea", date: "Jan 2024", status: "completed" },
      { stage: "Prototype", date: "Feb 2024", status: "completed" },
      { stage: "MVP", date: "Mar 2024", status: "completed" },
      { stage: "Deployment", date: "Apr 2024", status: "completed" },
    ],
    architecture: [
      { name: "Frontend", description: "React dashboard for agent monitoring", connections: ["API"] },
      { name: "API", description: "FastAPI backend service", connections: ["Authentication", "Database"] },
      { name: "Authentication", description: "JWT-based auth system", connections: ["Database"] },
      { name: "Database", description: "PostgreSQL for agent state", connections: ["AI Model"] },
      { name: "AI Model", description: "LLM orchestration layer", connections: ["Deployment"] },
      { name: "Deployment", description: "Docker + Kubernetes", connections: [] },
    ],
    coreFeatures: ["Autonomous agent collaboration", "Real-time monitoring", "Task orchestration", "Error recovery"],
    technicalDecisions:
      "Chose FastAPI for high performance API endpoints needed for real-time agent communications.",
    codeHighlights: [
      {
        title: "Hierarchical supervisor-worker orchestration",
        description:
          "A supervisor agent decomposes goals into subtasks and dispatches them to worker agents, aggregating results and retrying on failure instead of failing the whole run.",
      },
      {
        title: "Agent state persisted in PostgreSQL",
        description:
          "Each agent's task state is written to PostgreSQL so long-running jobs survive restarts and can be inspected from the monitoring dashboard.",
      },
    ],
    repositoryInsights: {
      languages: { Python: 75, JavaScript: 20, Other: 5 },
      lastUpdate: "2024-04-15",
      version: "1.2.0",
      documentation: true,
      deploymentStatus: "Deployed (cloud)",
    },
  },
  {
    id: "recommendation-system",
    title: "Recommendation System",
    description:
      "A comprehensive recommendation engine implementing collaborative and content-based filtering techniques to deliver personalized user experiences.",
    longDescription:
      "A from-scratch recommendation engine combining collaborative and content-based filtering into a hybrid approach. Designed to understand the underlying algorithms deeply while handling the cold-start problem for new users.",
    tags: ["Machine Learning", "Python", "MLOps", "NumPy"],
    image: "/portfolio.jpg",
    gallery: ["/portfolio.jpg"],
    repoUrl: "https://github.com/rohanxlabs/Recommendation-system",
    status: "completed",
    category: "Machine Learning",
    year: "2024",
    difficulty: "intermediate",
    deployment: "local",
    openSource: true,
    featured: false,
    type: "AI/ML",
    technologies: ["Python", "NumPy", "Pandas"],
    challenges: "Cold start problem for new users with no interaction history.",
    solutions:
      "Implemented hybrid approach combining content-based filtering for new users with collaborative filtering.",
    lessonsLearned:
      "Feature engineering is as important as the algorithm itself for recommendation quality.",
    futureImprovements: "Add real-time incremental learning capabilities.",
    timeline: [
      { stage: "Idea", date: "Nov 2023", status: "completed" },
      { stage: "Prototype", date: "Dec 2023", status: "completed" },
      { stage: "MVP", date: "Jan 2024", status: "completed" },
      { stage: "Deployment", date: "Feb 2024", status: "completed" },
    ],
    architecture: [
      { name: "Data Pipeline", description: "ETL pipeline for user interaction data", connections: ["ML Model"] },
      { name: "ML Model", description: "Hybrid recommendation algorithm", connections: ["API"] },
      { name: "API", description: "Recommendation service endpoint", connections: ["Database"] },
      { name: "Database", description: "User interaction storage", connections: [] },
    ],
    coreFeatures: ["Collaborative filtering", "Content-based filtering", "Hybrid recommendations", "A/B testing framework"],
    technicalDecisions: "Implemented from scratch to understand the underlying algorithms deeply.",
    codeHighlights: [
      {
        title: "Cold-start handling via content-based fallback",
        description:
          "New users with no history are served content-based recommendations derived from item metadata, then gradually shift to collaborative filtering as interactions accumulate.",
      },
    ],
    repositoryInsights: {
      languages: { Python: 90, Jupyter: 10, Other: 0 },
      lastUpdate: "2024-02-20",
      version: "1.0.0",
      documentation: false,
      deploymentStatus: "Local only",
    },
  },
  {
    id: "perceptagent",
    title: "PerceptAgent",
    description:
      "Real-time object detection pipeline powered by YOLOv8 + Groq LLM agentic loop. Detects, track, and reasons about live video scenes",
    longDescription:
      "A real-time perception pipeline that fuses YOLOv8 object detection with a Groq-powered LLM agentic loop. The agent detects, tracks, and reasons about live video scenes and answers natural-language questions about what it sees.",
    tags: ["Streamlit", "YOLOv8", "Ultralytics", "GROQ", "Agent Workflows"],
    image: "/perceptagent.png",
    gallery: ["/perceptagent.png"],
    repoUrl: "https://github.com/rohanxlabs/PercerptAgent.git",
    status: "completed",
    category: "Computer Vision",
    year: "2024",
    difficulty: "advanced",
    deployment: "local",
    openSource: true,
    featured: true,
    type: "AI/ML",
    technologies: ["Python", "YOLOv8", "Streamlit"],
    challenges: "Latency in real-time video processing with LLM inference.",
    solutions:
      "Optimized inference pipeline using Groq's high-speed LLM inference to maintain real-time performance.",
    lessonsLearned:
      "Hardware acceleration is critical for real-time computer vision applications.",
    futureImprovements:
      "Add support for more camera inputs and multi-object tracking improvements.",
    timeline: [
      { stage: "Idea", date: "Mar 2024", status: "completed" },
      { stage: "Prototype", date: "Apr 2024", status: "completed" },
      { stage: "MVP", date: "May 2024", status: "completed" },
      { stage: "Deployment", date: "May 2024", status: "completed" },
    ],
    architecture: [
      { name: "Camera Input", description: "Video capture pipeline", connections: ["Object Detection"] },
      { name: "Object Detection", description: "YOLOv8 inference", connections: ["LLM Reasoning"] },
      { name: "LLM Reasoning", description: "Groq-powered scene understanding", connections: ["Frontend"] },
      { name: "Frontend", description: "Streamlit dashboard", connections: [] },
    ],
    coreFeatures: ["Real-time object detection", "LLM scene reasoning", "Video stream processing", "Interactive dashboard"],
    technicalDecisions:
      "Selected Groq for its exceptional LLM inference speed required for real-time processing.",
    codeHighlights: [
      {
        title: "Detection-to-reasoning agentic loop",
        description:
          "Detected bounding boxes are fed into a Groq LLM agent that maintains scene context across frames, enabling reasoning questions rather than isolated detections.",
      },
    ],
    repositoryInsights: {
      languages: { Python: 95, Other: 5 },
      lastUpdate: "2024-05-10",
      version: "1.1.0",
      documentation: false,
      deploymentStatus: "Local only",
    },
  },
  {
    id: "robotic-arm",
    title: "6-DOF Robotic Arm (MuJoCo)",
    description:
      "a 6-DOF robotic arm simulation built with MuJoCo for high-fidelity physics modeling and reinforcement learning research",
    longDescription:
      "A 6-DOF robotic arm simulation in MuJoCo used for high-fidelity physics modeling and reinforcement learning research. Trains control policies with custom reward shaping and curriculum learning, with real-time visualization of the learned behavior.",
    tags: ["Python", "MuJoCo", "Gymnasium", "Reinforcement Learning", "Stablebaseline3", "Agentic AI"],
    image: "/trade.jpg",
    gallery: ["/trade.jpg"],
    repoUrl: "https://github.com/rohanxlabs/6-DOF-Robotic-Arm-MuJoco-",
    status: "active",
    category: "Robotics",
    year: "2024",
    difficulty: "expert",
    deployment: "local",
    openSource: true,
    featured: true,
    type: "Robotics",
    technologies: ["Python", "MuJoCo", "Gymnasium"],
    challenges: "Stable reinforcement learning training for high-degree-of-freedom robotic control.",
    solutions: "Implemented custom reward shaping and curriculum learning to stabilize training.",
    lessonsLearned:
      "Physics simulation fidelity directly impacts the transferability of learned policies to real hardware.",
    futureImprovements: "Add sim-to-real transfer pipeline and hardware implementation.",
    timeline: [
      { stage: "Idea", date: "Jun 2024", status: "completed" },
      { stage: "Prototype", date: "Jul 2024", status: "completed" },
      { stage: "MVP", date: "Aug 2024", status: "in-progress" },
      { stage: "Testing", date: "Sep 2024", status: "future" },
      { stage: "Future Plans", date: "Oct 2024", status: "future" },
    ],
    architecture: [
      { name: "MuJoCo Simulation", description: "Physics simulation environment", connections: ["RL Environment"] },
      { name: "RL Environment", description: "Gymnasium wrapper", connections: ["RL Agent"] },
      { name: "RL Agent", description: "Stable Baselines 3 implementation", connections: ["Visualization"] },
      { name: "Visualization", description: "Real-time monitoring dashboard", connections: [] },
    ],
    coreFeatures: ["6-DOF kinematics", "Reinforcement learning training", "High-fidelity physics", "Real-time visualization"],
    technicalDecisions:
      "Chose MuJoCo over other simulators for its superior physics accuracy in robotic manipulation tasks.",
    codeHighlights: [
      {
        title: "Curriculum learning for stable RL",
        description:
          "Training begins with easier target poses and progressively increases difficulty, stabilizing policy learning for a high-degree-of-freedom arm.",
      },
    ],
    repositoryInsights: {
      languages: { Python: 85, XML: 15, Other: 0 },
      lastUpdate: "2024-08-15",
      version: "0.5.0",
      documentation: false,
      deploymentStatus: "In development (local)",
    },
  },
  {
    id: "vision-detection",
    title: "Vision Object Detection",
    description:
      "A computer vision project focused on real-time object detection, classification, and localization using state-of-the-art deep learning architectures.",
    longDescription:
      "A real-time object detection, classification, and localization project built on YOLOv8. Focused on balancing detection accuracy with inference speed so it can run efficiently on CPU-bound edge environments.",
    tags: ["Python", "YOLOv8", "Machine Learning", "Deep Learning", "Computer Vision"],
    image: "/vision.jpg",
    gallery: ["/vision.jpg"],
    repoUrl: "https://github.com/rohanxlabs/Vision-object-detection",
    status: "completed",
    category: "Computer Vision",
    year: "2023",
    difficulty: "intermediate",
    deployment: "local",
    openSource: true,
    featured: false,
    type: "AI/ML",
    technologies: ["Python", "YOLOv8", "PyTorch"],
    challenges: "Balancing detection accuracy with inference speed for edge deployment.",
    solutions: "Model quantization and architecture optimization to run efficiently on CPU while maintaining accuracy.",
    lessonsLearned:
      "Transfer learning from pre-trained models significantly reduces development time.",
    futureImprovements: "Deploy as edge device application with optimized inference.",
    timeline: [
      { stage: "Idea", date: "Aug 2023", status: "completed" },
      { stage: "Prototype", date: "Sep 2023", status: "completed" },
      { stage: "MVP", date: "Oct 2023", status: "completed" },
      { stage: "Deployment", date: "Nov 2023", status: "completed" },
    ],
    architecture: [
      { name: "Video Capture", description: "Camera/video input pipeline", connections: ["Inference Engine"] },
      { name: "Inference Engine", description: "YOLOv8 model execution", connections: ["Post Processing"] },
      { name: "Post Processing", description: "NMS and tracking", connections: ["Visualization"] },
    ],
    coreFeatures: ["Real-time detection", "Multi-object tracking", "Classification", "Edge deployment ready"],
    technicalDecisions:
      "Used YOLOv8 for its excellent balance of speed and accuracy for this use case.",
    codeHighlights: [
      {
        title: "Quantization for CPU edge inference",
        description:
          "Model quantization and post-processing (NMS + tracking) tuning keep detection accurate while running on CPU-bound hardware.",
      },
    ],
    repositoryInsights: {
      languages: { Python: 100, Other: 0 },
      lastUpdate: "2023-11-05",
      version: "1.0.0",
      documentation: false,
      deploymentStatus: "Local only",
    },
  },
  {
    id: "churn-prediction",
    title: "Churn Prediction",
    description:
      "An end-to-end machine learning system designed to predict customer churn, enabling data-driven retention strategies through advanced classification modeling.",
    longDescription:
      "An end-to-end churn prediction system that trains a classification model on customer data and exposes predictions through a FastAPI service. Handles class imbalance with SMOTE and evaluates with business-relevant metrics rather than raw accuracy.",
    tags: ["Python", "FastAPI", "NumPy", "Machine Learning", "NLP"],
    image: "/churn.png",
    gallery: ["/churn.png"],
    repoUrl: "https://github.com/rohanxlabs/churn-ml-system",
    status: "completed",
    category: "Machine Learning",
    year: "2023",
    difficulty: "intermediate",
    deployment: "cloud",
    openSource: true,
    featured: false,
    type: "AI/ML",
    technologies: ["Python", "FastAPI", "Scikit-learn"],
    challenges: "Class imbalance in churn prediction dataset skewed model performance.",
    solutions: "Implemented SMOTE for oversampling minority class and used appropriate evaluation metrics.",
    lessonsLearned:
      "Business metrics matter more than pure accuracy for imbalanced classification problems.",
    futureImprovements: "Add real-time prediction streaming and integration with CRM systems.",
    timeline: [
      { stage: "Idea", date: "May 2023", status: "completed" },
      { stage: "Prototype", date: "Jun 2023", status: "completed" },
      { stage: "MVP", date: "Jul 2023", status: "completed" },
      { stage: "Deployment", date: "Aug 2023", status: "completed" },
    ],
    architecture: [
      { name: "Data Pipeline", description: "ETL for customer data", connections: ["ML Model"] },
      { name: "ML Model", description: "XGBoost classifier", connections: ["API"] },
      { name: "API", description: "Prediction endpoint", connections: ["Database"] },
    ],
    coreFeatures: ["Customer churn prediction", "Feature importance analysis", "REST API deployment", "Batch processing"],
    technicalDecisions:
      "XGBoost selected for its strong performance on tabular classification tasks.",
    codeHighlights: [
      {
        title: "SMOTE for imbalanced classes",
        description:
          "The minority churn class is oversampled with SMOTE before training, and the model is judged on precision/recall instead of accuracy alone.",
      },
    ],
    repositoryInsights: {
      languages: { Python: 88, Jupyter: 12, Other: 0 },
      lastUpdate: "2023-08-20",
      version: "1.0.0",
      documentation: false,
      deploymentStatus: "Deployed (cloud)",
    },
  },
  {
    id: "genai-image",
    title: "GenAI Image Generator",
    description:
      "A Generative AI application built to create high-quality, stylized images using state-of-the-art diffusion models and custom prompting techniques.",
    longDescription:
      "A diffusion-model image generation app that produces stylized images from text prompts using the Hugging Face ecosystem. Uses quantization and gradient checkpointing to fit large models into constrained GPU memory.",
    tags: ["Python", "hugging face", "Stable diffusion", "generative AI", "AI"],
    image: "/stable.jpg",
    gallery: ["/stable.jpg"],
    repoUrl: "https://github.com/rohanxlabs/GenAI-Image-Generator",
    status: "completed",
    category: "LLMs",
    year: "2023",
    difficulty: "intermediate",
    deployment: "cloud",
    openSource: true,
    featured: false,
    type: "AI/ML",
    technologies: ["Python", "PyTorch", "HuggingFace"],
    challenges: "GPU memory constraints when running diffusion models locally.",
    solutions: "Implemented model quantization and gradient checkpointing to reduce memory footprint.",
    lessonsLearned:
      "Prompt engineering has as much impact on output quality as the model itself.",
    futureImprovements: "Add fine-tuning capabilities for custom art styles.",
    timeline: [
      { stage: "Idea", date: "Sep 2023", status: "completed" },
      { stage: "Prototype", date: "Oct 2023", status: "completed" },
      { stage: "MVP", date: "Nov 2023", status: "completed" },
      { stage: "Deployment", date: "Dec 2023", status: "completed" },
    ],
    architecture: [
      { name: "Frontend", description: "Web UI for image generation", connections: ["API"] },
      { name: "API", description: "Generation service endpoint", connections: ["Model Server"] },
      { name: "Model Server", description: "Stable Diffusion inference", connections: ["Storage"] },
    ],
    coreFeatures: ["Text-to-image generation", "Style transfer", "Image-to-image", "Batch processing"],
    technicalDecisions:
      "Used Hugging Face ecosystem for its comprehensive diffusion model support.",
    codeHighlights: [
      {
        title: "Memory-efficient diffusion inference",
        description:
          "Quantization and gradient checkpointing shrink the model's GPU footprint so large Stable Diffusion models run on constrained hardware.",
      },
    ],
    repositoryInsights: {
      languages: { Python: 92, Jupyter: 8, Other: 0 },
      lastUpdate: "2023-12-10",
      version: "1.0.0",
      documentation: false,
      deploymentStatus: "Deployed (cloud)",
    },
  },
  {
    id: "rag-system",
    title: "RAG System",
    description:
      "A Retrieval-Augmented Generation (RAG) system designed to provide accurate, context-aware answers by querying custom document embeddings with Large Language Models.",
    longDescription:
      "A retrieval-augmented generation system that ingests documents, embeds them into a vector store, and answers questions with a GPT-4 LLM while citing sources. Uses hierarchical chunking with parent-document retrieval to keep long-context relevance and reduce hallucinations.",
    tags: ["Python", "FastAPI", "Pandas", "RAG", "NumPY", "Generative AI"],
    image: "/rag.jpg",
    gallery: ["/rag.jpg"],
    repoUrl: "https://github.com/rohanxlabs/rag-based-qa-system",
    status: "completed",
    category: "LLMs",
    year: "2024",
    difficulty: "advanced",
    deployment: "cloud",
    openSource: true,
    featured: true,
    type: "AI/ML",
    technologies: ["Python", "FastAPI", "Langchain"],
    challenges:
      "Maintaining context relevance across long documents and preventing hallucinations.",
    solutions:
      "Implemented hierarchical chunking with parent-document retrieval and citation tracking.",
    lessonsLearned:
      "Retrieval quality is more important than LLM power for accurate RAG systems.",
    futureImprovements: "Add multi-modal RAG capabilities for images and tables.",
    timeline: [
      { stage: "Idea", date: "Feb 2024", status: "completed" },
      { stage: "Prototype", date: "Mar 2024", status: "completed" },
      { stage: "MVP", date: "Apr 2024", status: "completed" },
      { stage: "Deployment", date: "May 2024", status: "completed" },
    ],
    architecture: [
      { name: "Document Upload", description: "Document ingestion pipeline", connections: ["Embedding Service"] },
      { name: "Embedding Service", description: "Vector embeddings generation", connections: ["Vector Database"] },
      { name: "Vector Database", description: "Pinecone vector storage", connections: ["LLM Service"] },
      { name: "LLM Service", description: "GPT-4 for answer generation", connections: ["API"] },
      { name: "API", description: "QA endpoint", connections: ["Frontend"] },
    ],
    coreFeatures: ["Document Q&A", "Source citations", "Multi-document queries", "Conversation history"],
    technicalDecisions:
      "Built with Langchain for its mature RAG implementations and vector store support.",
    codeHighlights: [
      {
        title: "Hierarchical chunking with parent-document retrieval",
        description:
          "Documents are split into small retrievable chunks that point back to larger parent chunks, improving relevance on long documents while preserving context for the LLM.",
      },
      {
        title: "Citation tracking",
        description:
          "Every generated answer links back to the retrieved source chunks, making outputs auditable and reducing unchecked hallucination.",
      },
    ],
    repositoryInsights: {
      languages: { Python: 94, Other: 6 },
      lastUpdate: "2024-05-25",
      version: "1.3.0",
      documentation: true,
      deploymentStatus: "Deployed (cloud)",
    },
  },
  {
    id: "sentinel-ml",
    title: "Sentinel-ml",
    description:
      "An end-to-end Machine Learning pipeline designed for security analytics and intelligent anomaly detection to identify potential system threats in real life",
    longDescription:
      "An anomaly-detection pipeline for security analytics that ingests Prometheus metrics, processes them in real time, and surfaces threats with an ensemble model under MLflow lifecycle management. Built with MLOps best practices for production reliability.",
    tags: ["Python", "Machine Learning", "Prometheus", "Scikit-Learn", "MLflow"],
    image: "/sentinel.png",
    gallery: ["/sentinel.png"],
    repoUrl: "https://github.com/rohanxlabs/sentinel-ml.git",
    status: "active",
    category: "MLOps",
    year: "2024",
    difficulty: "advanced",
    deployment: "cloud",
    openSource: true,
    featured: false,
    type: "MLOps",
    technologies: ["Python", "MLflow", "Scikit-learn"],
    challenges: "Low false positive rate requirement while maintaining high detection recall.",
    solutions:
      "Ensemble approach combining multiple anomaly detection algorithms with rule-based filtering.",
    lessonsLearned: "MLOps best practices are critical for maintaining production ML systems.",
    futureImprovements: "Add real-time streaming inference and automated retraining pipelines.",
    timeline: [
      { stage: "Idea", date: "Apr 2024", status: "completed" },
      { stage: "Prototype", date: "May 2024", status: "completed" },
      { stage: "MVP", date: "Jul 2024", status: "in-progress" },
      { stage: "Testing", date: "Aug 2024", status: "future" },
      { stage: "Deployment", date: "Sep 2024", status: "future" },
    ],
    architecture: [
      { name: "Metrics Ingestion", description: "Prometheus metrics collector", connections: ["Stream Processor"] },
      { name: "Stream Processor", description: "Real-time data processing", connections: ["ML Model"] },
      { name: "ML Model", description: "Anomaly detection ensemble", connections: ["Alerting"] },
      { name: "Alerting", description: "Incident notification system", connections: [] },
    ],
    coreFeatures: ["Real-time anomaly detection", "Metrics pipeline", "Model versioning", "Alert management"],
    technicalDecisions:
      "MLflow used for comprehensive model lifecycle management in production.",
    codeHighlights: [
      {
        title: "Anomaly detection ensemble",
        description:
          "Multiple detectors vote and a rule-based filter suppresses obvious false positives, balancing recall against alert fatigue.",
      },
    ],
    repositoryInsights: {
      languages: { Python: 88, YAML: 12, Other: 0 },
      lastUpdate: "2024-07-20",
      version: "0.8.0",
      documentation: false,
      deploymentStatus: "In development (cloud)",
    },
  },
]
