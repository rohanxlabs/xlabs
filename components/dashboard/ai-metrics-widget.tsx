"use client"

import { motion, useInView } from "framer-motion"
import { Counter } from "@/components/motion/counter"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { FolderGit2, Database, Cpu, Cloud, Rocket, Bot, Trophy, Clock } from "lucide-react"

interface MetricsData {
  projects: number
  repositories: number
  technologies: number
  deployments: number
  models: number
  hackathons: number
  learningHours: number
  experienceYears: number
}

interface AIMetricsWidgetProps {
  metrics: MetricsData
}

const metricIcons = [
  { icon: FolderGit2, label: "Projects", value: (m: MetricsData) => m.projects, color: "text-phthalo-400" },
  { icon: Database, label: "Repositories", value: (m: MetricsData) => m.repositories, color: "text-emerald-400" },
  { icon: Cpu, label: "Technologies", value: (m: MetricsData) => m.technologies, color: "text-blue-400" },
  { icon: Rocket, label: "Deployments", value: (m: MetricsData) => m.deployments, color: "text-orange-400" },
  { icon: Bot, label: "Models", value: (m: MetricsData) => m.models, color: "text-purple-400" },
  { icon: Trophy, label: "Hackathons", value: (m: MetricsData) => m.hackathons, color: "text-amber-400" },
  { icon: Clock, label: "Learning Hours", value: (m: MetricsData) => m.learningHours, color: "text-pink-400", format: (v: number) => v.toLocaleString() },
  { icon: Cpu, label: "Years Experience", value: (m: MetricsData) => m.experienceYears, color: "text-cyan-400" }
]

export function AIMetricsWidget({ metrics }: AIMetricsWidgetProps) {
  return (
    <GlassmorphicCard className="p-6">
      <h3 className="text-lg font-bold text-content-primary mb-6">AI Metrics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {metricIcons.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
            className="p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
              <span className="text-xs text-content-tertiary">{metric.label}</span>
            </div>
            <div className="text-xl font-bold text-content-primary">
              <Counter 
                from={0} 
                to={metric.value(metrics)} 
                format={metric.format}
                duration={1.5}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </GlassmorphicCard>
  )
}