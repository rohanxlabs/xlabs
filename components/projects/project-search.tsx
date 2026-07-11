"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"

interface ProjectSearchProps {
  onSearch: (query: string) => void
  searchQuery: string
  technologies: string[]
}

export function ProjectSearch({ onSearch, searchQuery, technologies }: ProjectSearchProps) {
  const [isFocused, setIsFocused] = useState(false)
  
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return []
    return technologies.filter(tech => 
      tech.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5)
  }, [searchQuery, technologies])

  const clearSearch = () => {
    onSearch("")
  }

  const selectSuggestion = (suggestion: string) => {
    onSearch(suggestion)
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <motion.div
        animate={{
          boxShadow: isFocused 
            ? "0 0 0 1px rgba(10, 140, 93, 0.4), 0 20px 60px rgba(0, 0, 0, 0.3)" 
            : "none"
        }}
        className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden"
      >
        <div className="pl-5 pr-3">
          <Search className="w-5 h-5 text-content-tertiary" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search projects, technologies, or features..."
          className="w-full bg-transparent py-4 pr-12 text-content-primary placeholder:text-content-tertiary outline-none text-base"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 p-1 rounded-full hover:bg-white/[0.08] transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-content-secondary" />
          </button>
        )}
      </motion.div>
      
      {/* Suggestions */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: suggestions.length > 0 && isFocused ? 1 : 0,
          y: suggestions.length > 0 && isFocused ? 0 : -10,
          pointerEvents: suggestions.length > 0 && isFocused ? "auto" : "none"
        }}
        className="absolute top-full left-0 right-0 mt-2 bg-[#0f0f13] border border-white/[0.08] rounded-xl overflow-hidden shadow-xl z-30"
      >
        <div className="p-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => selectSuggestion(suggestion)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.04] text-content-secondary hover:text-content-primary transition-colors flex items-center gap-3"
            >
              <Search className="w-4 h-4 text-content-tertiary" />
              {suggestion}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}