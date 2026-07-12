"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowUpDown } from "lucide-react"
import { useState } from "react"
import { SortOption } from "./types"

interface SortDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "most-complex", label: "Most Complex" },
  { value: "ai", label: "AI Projects" },
  { value: "web", label: "Web Projects" },
  { value: "production-ready", label: "Production Ready" },
]

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentLabel = sortOptions.find(opt => opt.value === value)?.label || "Sort by"

  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-zinc-200 transition-colors w-full md:w-auto"
        aria-expanded={isOpen}
        aria-label="Sort projects"
      >
        <ArrowUpDown className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLabel}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-white/5 ${
                  value === option.value ? "text-green-400 bg-green-500/10" : "text-zinc-400"
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}