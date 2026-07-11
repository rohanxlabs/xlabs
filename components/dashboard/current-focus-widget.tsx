"use client"

import { motion } from "framer-motion"
import { Code, BookOpen, Target, Lightbulb, Github } from "lucide-react"
import { GlassmorphicCard } from "@/components/glassmorphic-card"

interface CurrentFocusData {
  currentlyBuilding: string
  currentlyLearning: string
  nextGoal: string
  researchAreas: string[]
  openSourceFocus: string
}

interface CurrentFocusWidgetProps {
  data: CurrentFocusData
}

const widgetVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  }
}

export function CurrentFocusWidget({ data }: CurrentFocusWidgetProps) {
  const focusItems = [
    {
      icon: Code,
      label: "Currently Building",
      value: data.currentlyBuilding,
      color: "text-phthalo-400",
      bgColor: "bg-phthalo-500/10"
    },
    {
      icon: BookOpen,
      label: "Currently Learning",
      value: data.currentlyLearning,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10"
    },
    {
      icon: Target,
      label: "Next Goal",
      value: data.nextGoal,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Lightbulb,
      label: "Research Areas",
      value: data.researchAreas.join(", "),
      color: "text-amber-400",
      bgColor: "bg-amber-500/10"
    },
    {
      icon: Github,
      label: "Open Source",
      value: data.openSourceFocus,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    }
  ]

  return (
    <motion.div
      variants={widgetVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <GlassmorphicCard className="p-6">
        <h3 className="text-lg font-bold text-content-primary mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Current Focus
        </h3>
        
        <div className="space-y-4">
          {focusItems.map((item, index) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className={`p-2 rounded-lg ${item.bgColor} flex-shrink-0`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <div className="text-xs text-content-tertiary uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                <div className="text-sm font-medium text-content-primary leading-snug">
                  {item.value}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassmorphicCard>
    </motion.div>
  )
}