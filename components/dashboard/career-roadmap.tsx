"use client"

import { motion } from "framer-motion"
import { GlassmorphicCard } from "@/components/glassmorphic-card"

interface RoadmapItem {
  id: string
  title: string
  status: "current" | "completed" | "future"
  description: string
}

interface CareerRoadmapProps {
  roadmap: RoadmapItem[]
}

const statusConfig = {
  current: {
    bg: "bg-phthalo-500",
    border: "border-phthalo-500",
    text: "text-phthalo-400",
    label: "Current"
  },
  completed: {
    bg: "bg-emerald-500",
    border: "border-emerald-500",
    text: "text-emerald-400",
    label: "Completed"
  },
  future: {
    bg: "bg-zinc-600",
    border: "border-zinc-600",
    text: "text-zinc-400",
    label: "Future"
  }
}

export function CareerRoadmap({ roadmap }: CareerRoadmapProps) {
  return (
    <GlassmorphicCard className="p-6 h-full">
      <h3 className="text-lg font-bold text-content-primary mb-6">Career Roadmap</h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-white/[0.08]"></div>
        
        <div className="space-y-6">
          {roadmap.map((item, index) => {
            const config = statusConfig[item.status]
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative pl-10"
              >
                {/* Timeline dot */}
                <motion.div
                  className={`absolute left-1.5 w-3 h-3 rounded-full ${config.bg} ${item.status === "current" ? "animate-pulse" : ""}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.2, duration: 0.3 }}
                  viewport={{ once: true }}
                />
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-content-primary">{item.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg}/20 ${config.text}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-content-secondary">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </GlassmorphicCard>
  )
}