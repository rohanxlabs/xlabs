"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const experiences = [
  {
    title: "AI/ML & Robotics Engineer",
    company: "Independent AI/ML Research",
    period: "Jan 2025 - Present",
    description:
      "Developing autonomous robotics systems using AI/ML, simulation, perception, and reinforcement learning techniques.",
  },
  {
    title: "Agentic AI Research Assistant",
    company: "Personal projects",
    period: "April 2025 - Present",
    description:
      "Built an autonomous AI assistant capable of reasoning, task planning, and multi-step execution using LLM workflows abd tool integration.",
  },
  {
    title: "Real-Time Object Detection",
    company: "Computer Vision Systems",
    period: "Jan 2025 - March 2025",
    description:
      "Developed computer vision pipeline for object detection and robotics perception using deep learning models.",
  },
  {
    title: "Autonomous Task Execution Agent",
    company: "AI & Robotics Research",
    period: "April 2025 - present",
    description: "Created AI agent capable of autonomous decision-making, memory handling, and multi-step task execution.",
  },
]

export function Timeline() {
  const isMobile = useMobile()

  return (
    <div
      className={`space-y-10 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:-translate-x-px before:border-l-2 before:border-white/[0.06] before:h-full before:z-0"
          : ""
      }`}
    >
      {experiences.map((experience, index) => (
        <div
          key={index}
          className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <motion.div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, margin: "-40px" }}
          >
            <div className="card card-hover p-6 md:p-8">
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-phthalo-500 shadow-lg shadow-phthalo-500/40"></div>
                  <span className="text-xs font-medium text-phthalo-400 uppercase tracking-wider">{experience.period}</span>
                </div>
                <h3 className="text-xl font-bold mb-1 text-content-primary">{experience.title}</h3>
                <div className="text-content-secondary mb-4 text-sm font-medium">{experience.company}</div>
                <p className="text-content-secondary text-sm leading-relaxed">{experience.description}</p>
              </div>
            </div>
          </motion.div>

          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div
                className="w-4 h-4 rounded-full bg-gradient-to-r from-phthalo-600 to-phthalo-800 z-10 flex items-center justify-center border-2 border-[#09090b] shadow-lg shadow-phthalo-900/30"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}