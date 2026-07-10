import Link from "next/link"
import { ArrowRight, Github, GraduationCap, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { CreativeHero } from "@/components/creative-hero"
import { FloatingNav } from "@/components/floating-nav"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { GrindSection } from "@/components/grind-section"
import { Marquee } from "@/components/magicui/marquee"
import { ECGProjectCard } from "@/components/ECGProjectCard"

export default function Portfolio() {
  return (
    <div className="min-h-screen text-white overflow-hidden">
      <ScrollProgress />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-20">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-phthalo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6">
          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="block text-content-primary">Hi, I'm</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-phthalo-400 to-phthalo-600">
                Rohan
              </span>
            </h1>

            <div className="flex justify-center">
              <CreativeHero />
            </div>

            <div className="inline-flex items-center rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] px-4 py-1.5">
              <span className="relative z-10 text-sm font-medium text-content-secondary">
                AI/ML Engineer · Autonomous Robotics Systems
              </span>
            </div>

            <p className="text-lg text-content-secondary max-w-[600px] leading-relaxed">
              Focused on AI/ML, robotics, and autonomous system for intelligent perception, control, and decision-making.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 justify-center">
              <Link href="#projects">
                <Button className="relative overflow-hidden group bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-500 hover:to-phthalo-700 border-0 rounded-lg px-6 py-3 text-base font-medium shadow-lg shadow-phthalo-900/20 hover:shadow-xl hover:shadow-phthalo-900/30 transition-all">
                  <span className="relative z-10 flex items-center">
                    View Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-phthalo-700 to-phthalo-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="border-white/[0.1] text-content-secondary hover:text-white hover:border-white/[0.2] bg-transparent rounded-lg px-6 py-3 text-base font-medium"
                >
                  Contact Me
                </Button>
              </Link>
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <Link href="https://github.com/rohanxlabs" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-content-secondary hover:text-white border border-white/[0.08]"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/rohanxlabs" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-content-secondary hover:text-white border border-white/[0.08]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="mailto:rohanprajapati7970@gmail.com">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-content-secondary hover:text-white border border-white/[0.08]"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-left">
              <div className="inline-flex items-center rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] px-4 py-1.5">
                <span className="text-sm font-medium text-content-secondary">
                  AI/ML Engineer · Autonomous Robotics Systems
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                <span className="block text-content-primary">Hi, I'm</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-phthalo-400 to-phthalo-600">
                  Rohan
                </span>
              </h1>
              <p className="text-xl text-content-secondary max-w-[560px] leading-relaxed">
                Focused on AI/ML, robotics, and autonomous systems for intelligent perception, control, and decision-making.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="#projects">
                  <Button className="relative overflow-hidden group bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-500 hover:to-phthalo-700 border-0 rounded-lg px-6 py-3 text-base font-medium shadow-lg shadow-phthalo-900/20 hover:shadow-xl hover:shadow-phthalo-900/30 transition-all">
                    <span className="relative z-10 flex items-center">
                      View Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-phthalo-700 to-phthalo-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button
                    variant="outline"
                    className="border-white/[0.1] text-content-secondary hover:text-white hover:border-white/[0.2] bg-transparent rounded-lg px-6 py-3 text-base font-medium"
                  >
                    Contact Me
                  </Button>
                </Link>
              </div>
              <div className="flex gap-3 pt-2">
                <Link href="https://github.com/rohanxlabs" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-content-secondary hover:text-white border border-white/[0.08]"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/rohanxlabs" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-content-secondary hover:text-white border border-white/[0.08]"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="mailto:rohanprajapati7970@gmail.com">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-content-secondary hover:text-white border border-white/[0.08]"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <CreativeHero />
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-content-tertiary">
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/10 flex justify-center items-start p-1.5">
            <div className="w-1 h-1.5 rounded-full bg-content-secondary animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-py relative">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="About Me" subtitle="My background and journey" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-16">
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative aspect-square w-full max-w-md rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/20">
                <img
                  src="/image.jpg"
                  alt="Rohan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                    <span className="text-sm font-medium text-white">Available for work</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <GlassmorphicCard>
                <div className="space-y-5">
                  <p className="text-lg text-content-secondary leading-relaxed">
                    I'm a BTech graduate in Artificial Intelligence & Machine Learning with proven expertise as an AI/ML Engineer, AI Engineer, GenAI Engineer. I am passionate about building intelligent system that solve real-world problems.
                  </p>
                  <p className="text-lg text-content-secondary leading-relaxed">
                    I specialize in developing end-to-end Machine Learning pipelines, from data processing to deploy scalable APIs. My experience includes building Scalable System and AI applications using MLOps, Generative AI, and Agentic AI best practices with cutting-edge AI/ML frameworks (TensorFlow, PyTorch, Scikit-learn) to solve complex problems in technology. My work consistently improves forecasting accuracy, optimizes portfolios, and empowers data-driven decision-making.
                  </p>
                  <p className="text-lg text-content-secondary leading-relaxed">
                    Today, I work primarily with Machine Learning, Agentic AI, Embodied AI, and Autonomous Robotics Systems.I'm always looking for ways to make AI more accessible and efficient. Beyond Software I am deeply interested in Robotics and Embodied AI, Cutting-Edge AI, constantly experimenting with how intelligent agents interact with the physical world.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div className="space-y-1">
                      <div className="text-xs text-content-tertiary uppercase tracking-wider font-medium">Name</div>
                      <div className="font-medium text-content-primary">Rohan</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs text-content-tertiary uppercase tracking-wider font-medium">Email</div>
                      <div className="font-medium text-content-primary break-all">rohanprajapati7970@gmail.com</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-content-tertiary uppercase tracking-wider font-medium">Location</div>
                      <div className="font-medium text-content-primary">Greater Noida, India</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-content-tertiary uppercase tracking-wider font-medium">Availability</div>
                      <div className="font-medium text-phthalo-400">Open to opportunities</div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a
                      href="/ROHANRESUME.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] text-content-primary px-5 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/[0.08] hover:border-white/[0.12]"
                    >
                      View Resume
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-py relative">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="My Skills" subtitle="Technologies I work with" />

          <div className="mt-16 space-y-6">
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
              <Marquee pauseOnHover className="[--duration:20s]">
                <SkillBadge name="Python" level={100} />
                <SkillBadge name="Machine Learning" level={100} />
                <SkillBadge name="Deep Learning" level={100} />
                <SkillBadge name="Neural Networks" level={100} />
                <SkillBadge name="TensorFlow" level={100} />
                <SkillBadge name="PyTorch" level={100} />
              </Marquee>
              <Marquee reverse pauseOnHover className="[--duration:20s]">
                <SkillBadge name="Scikit-learn" level={100} />
                <SkillBadge name="Generative AI" level={100} />
                <SkillBadge name="Langchain" level={100} />
                <SkillBadge name="Langgraph" level={100} />
                <SkillBadge name="FastAPI" level={100} />
                <SkillBadge name="Git" level={100} />
                <SkillBadge name="MLOps" level={100} />
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#09090b]"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#09090b]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-py relative">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Featured Projects" subtitle="Some of my recent work" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <ECGProjectCard
              title="Agentic AI System"
              description="An Autonomous Agentic AI system which work on agents system, build different agent each work."
              tags={["Agentic AI", "Machine Learning", "FastAPI", "Python", "Langchain","Generative AI"]}
              image="/p4.png?height=400&width=600"
              repoUrl="https://github.com/rohanxlabs/Agentic-AI-system"
            />


            <ProjectCard
              title="Recommendation System"
              description="A research-style project which work on recommend system.A comprehensive recommendation engine implementing collaborative and content-based filtering techniques to deliver personalized user experiences."
              tags={["Machine Learning", "Python", "MLOps", "NumPy"]}
              image="/portfolio.jpg"
              repoUrl="https://github.com/rohanxlabs/Recommendation-system"
            />
            <ProjectCard
              title="PerceptAgent"
              description="Real-time object detection pipeline powered by YOLOv8 + Groq LLM agentic loop. Detects, track, and reasons about live video scenes"
              tags={["Streamlit","YOLOv8","Ultralytics","GROQ","Agent Workflows"]}
              image="/perceptagent.png"
              repoUrl="https://github.com/rohanxlabs/PercerptAgent.git"
            />

            <ProjectCard
              title="6-DOF Robotic Arm (MuJoCo)"
              description="a 6-DOF robotic arm simulation built with MuJoCo fot high-fidelity physics modeling and reinforcement learning research"
              tags={["Python", "MuJoCo", "Gymnasium", "Reinforcement Learninf", "Stablebaseline3", "Agentic AI"]}
              image="/trade.jpg"
              repoUrl="https://github.com/rohanxlabs/6-DOF-Robotic-Arm-MuJoco-"
            />
            <ProjectCard
              title="Vision Object Detection"
              description="A computer vision project focused on real-time object detection, classification, and localization using state-of-the-art deep learning architectures."
              tags={["Python", "YOLOv8", "Machine Learning", "Deep Learning", "Computer Vision"]}
              image="/vision.jpg"
              repoUrl="https://github.com/rohanxlabs/Vision-object-detection"
            />

            <ProjectCard
              title="Churn Prediction"
              description="An end-to-end machine learning system designed to predict customer churn, enabling data-driven retention strategies through advanced classification modeling."
              tags={["Python", "FastAPI", "NumPy", "Machine Learning", "NLP"]}
              image="/churn.png"
              repoUrl="https://github.com/rohanxlabs/churn-ml-system"
            />

            <ProjectCard
              title="GenAI Image Generator"
              description="A Generative AI application built to create high-quality, stylized images using state-of-the-art diffusion models and custom promting techniques."
              tags={["Python", "hugging face", "Stable diffusion", "generative AI", "AI"]}
              image="/stable.jpg"
              repoUrl="https://github.com/rohanxlabs/GenAI-Image-Generator"
            />

            <ProjectCard
              title="RAG System"
              description="A Retrieval-Augmented Generation (RAG) system designed to provide accurate, context-aware answers by querying custom document embeddings with Large Language Models."
              tags={["Python", "FastAPI", "Pandas", "RAG", "NumPY", "Generative AI"]}
              image="/rag.jpg"
              repoUrl="https://github.com/rohanxlabs/rag-based-qa-system"
            />

            <ProjectCard
              title="Sentinel-ml"
              description="An end-to-end Machine Learning pipeline designed for security analytics and intelligent anomaly detection to identify potential system threats in real life"
              tags={["Python","Machine Learning","Prometheus","Scikit-Learn","MLflow"]}
              image="/sentinel.png"
              repoUrl="https://github.com/rohanxlabs/sentinel-ml.git"
            />


          </div>
        </div>
      </section>

      {/* Grind Section */}
      <section className="section-py relative" id="grind">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <GrindSection />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-py relative">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Work Experience" subtitle="My professional journey" />

          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-py relative">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Let's work together" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-16">
            <GlassmorphicCard>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-content-primary">Contact Information</h3>
                  <p className="text-content-secondary text-sm">Reach out through any of these channels.</p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center border border-white/[0.08]">
                      <Mail className="h-5 w-5 text-phthalo-400" />
                    </div>
                    <div>
                      <div className="text-xs text-content-tertiary uppercase tracking-wider font-medium">Email</div>
                      <div className="font-medium text-content-primary">rohanprajapati7970@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center border border-white/[0.08]">
                      <Linkedin className="h-5 w-5 text-phthalo-400" />
                    </div>
                    <div>
                      <div className="text-xs text-content-tertiary uppercase tracking-wider font-medium">LinkedIn</div>
                      <div className="font-medium text-content-primary">www.linkedin.com/in/rohanxlabs</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center border border-white/[0.08]">
                      <Github className="h-5 w-5 text-phthalo-400" />
                    </div>
                    <div>
                      <div className="text-xs text-content-tertiary uppercase tracking-wider font-medium">GitHub</div>
                      <div className="font-medium text-content-primary">github.com/rohanxlabs</div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/[0.06]">
                  <h4 className="text-lg font-medium mb-4 text-content-primary">Current Status</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                    <span className="text-sm text-content-secondary">Open to opportunities AI/ML Engineering!</span>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Learn CTA Section */}
      <section className="section-py relative">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Learn With Me" subtitle="AI/ML Engineering" />

          <div className="max-w-3xl mx-auto mt-16">
            <GlassmorphicCard>
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-phthalo-500 to-phthalo-700 flex items-center justify-center shadow-lg shadow-phthalo-900/30">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-content-primary">Want to Learn AI/ML & Robotics?</h3>

                <p className="text-lg text-content-secondary leading-relaxed">
                  I'm building courses and mentorship programs on machine learning, deep learning, and robotics automation. Join the waitlist to get notified when they launch.
                </p>

                <div className="pt-4">
                  <Link href="/learn">
                    <Button className="relative overflow-hidden group bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-500 hover:to-phthalo-700 border-0 text-lg px-8 py-3 rounded-lg shadow-lg shadow-phthalo-900/20 hover:shadow-xl hover:shadow-phthalo-900/30 transition-all">
                      <span className="relative z-10 flex items-center">
                        Take the Quiz
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-phthalo-700 to-phthalo-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="font-bold text-xl inline-flex items-baseline">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-400 to-phthalo-600">
                Rohan
              </span>
              <span className="text-white ml-1">Dev</span>
            </Link>
            <p className="text-sm text-content-tertiary mt-2">
              © {new Date().getFullYear()} Rohan. All rights reserved.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="https://github.com/rohanxlabs" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-content-secondary hover:text-white border border-white/[0.08]"
              >
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/rohanxlabs" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-content-secondary hover:text-white border border-white/[0.08]"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="mailto:rohanprajapati7970@gmail.com" aria-label="Email">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-content-secondary hover:text-white border border-white/[0.08]"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
