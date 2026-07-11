"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle, Clock, CircleAlert } from "lucide-react"

interface TimelineStage {
  stage: string
  date: string
  status: string
}

interface DevelopmentTimelineProps {
  timeline: TimelineStage[]
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="w-6 h-6 text-green-500" />
    case "in-progress":
      return <Clock className="w-6 h-6 text-blue-500" />
    case "future":
      return <Circle className="w-6 h-6 text-content-tertiary" />
    default:
      return <CircleAlert className="w-6 h-6 text-amber-500" />
  }
}

const StatusBadge = ({ status }: { status: string }) => {
  const statusColors = {
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
    "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    future: "bg-white/[0.04] text-content-tertiary border-white/[0.08]"
  }
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[status as keyof typeof statusColors]}`}>
      {status.replace('-', ' ')}
    </span>
  )
}

export function DevelopmentTimeline({ timeline }: DevelopmentTimelineProps) {
  return (
    <div className="h-full bg-black/20 rounded-2xl p-8 border border-white/[0.08] overflow-auto">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-content-primary mb-2">Development Timeline</h3>
        <p className="text-content-secondary">Project milestones and progression through development stages</p>
      </div>
      
      <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-green-500 via-blue-500 to-white/[0.1]" />
        
        <div className="space-y-8">
          {timeline.map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
              className="relative flex items-start gap-6 pl-20"
            >
              {/* Status Icon */}
              <div className="absolute left-5 transform -translate-x-1/2">
                <StatusIcon status={stage.status} />
              </div>
              
              <div className="flex-1 p-5 bg-black/30 rounded-xl border border-white/[0.06]">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <h4 className="text-lg font-semibold text-content-primary">{stage.stage}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-content-tertiary">{stage.date}</span>
                    <StatusBadge status={stage.status} />
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: stage.status === "completed" ? "100%" : stage.status === "in-progress" ? "60%" : "0%" }}
                    transition={{ delay: 0.4 + 0.2 * index, duration: 0.8 }}
                    className={`h-full rounded-full ${
                      stage.status === "completed" ? "bg-green-500" : 
                      stage.status === "in-progress" ? "bg-blue-500" : "bg-white/[0.08]"
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Timeline Summary */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <div className="p-5 bg-green-500/10 rounded-xl border border-green-500/20 text-center">
          <p className="text-3xl font-bold text-green-400">
            {timeline.filter(t => t.status === "completed").length}
          </p>
          <p className="text-sm text-green-400/80">Completed</p>
        </div>
        <div className="p-5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
          <p className="text-3xl font-bold text-blue-400">
            {timeline.filter(t => t.status === "in-progress").length}
          </p>
          <p className="text-sm text-blue-400/80">In Progress</p>
        </div>
        <div className="p-5 bg-white/[0.04] rounded-xl border border-white/[0.08] text-center">
          <p className="text-3xl font-bold text-content-secondary">
            {timeline.filter(t => t.status === "future").length}
          </p>
          <p className="text-sm text-content-tertiary">Upcoming</p>
        </div>
      </div>
    </div>
  )
}