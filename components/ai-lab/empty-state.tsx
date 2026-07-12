"use client"

import { motion } from "framer-motion"
import { SearchX } from "lucide-react"

interface EmptyStateProps {
  message?: string
  submessage?: string
}

export function EmptyState({ 
  message = "No projects found", 
  submessage = "Try adjusting your search or filters to find what you're looking for." 
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6"
      >
        <SearchX className="w-10 h-10 text-zinc-500" />
      </motion.div>
      <h3 className="text-xl font-semibold text-white mb-2">{message}</h3>
      <p className="text-zinc-500 max-w-md">{submessage}</p>
    </motion.div>
  )
}