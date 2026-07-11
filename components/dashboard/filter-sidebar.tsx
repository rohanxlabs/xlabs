"use client"

import { X } from "lucide-react"
import { motion } from "framer-motion"

interface FilterCategory {
  id: string
  name: string
  icon: any
}

interface FilterSidebarProps {
  categories: FilterCategory[]
  activeFilters: string[]
  onFilterToggle: (filterId: string) => void
  onClose: () => void
}

export function FilterSidebar({ categories, activeFilters, onFilterToggle, onClose }: FilterSidebarProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-content-primary">Filters</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/[0.08] transition-colors"
          aria-label="Close filters"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2 mb-8">
        <p className="text-sm text-content-tertiary mb-4">Filter by category</p>
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onFilterToggle(category.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
              activeFilters.includes(category.id)
                ? "bg-phthalo-600 text-white"
                : "bg-white/[0.04] text-content-secondary border border-white/[0.08] hover:bg-white/[0.08]"
            }`}
          >
            <category.icon className="w-5 h-5" />
            <span className="font-medium">{category.name}</span>
            {activeFilters.includes(category.id) && (
              <span className="ml-auto w-2 h-2 rounded-full bg-white"></span>
            )}
          </motion.button>
        ))}
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-auto">
          <button
            onClick={() => activeFilters.forEach(id => onFilterToggle(id))}
            className="w-full py-3 px-4 rounded-lg text-sm font-medium text-content-secondary border border-white/[0.08] hover:bg-white/[0.04] transition-colors"
          >
            Clear all filters ({activeFilters.length})
          </button>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-white/[0.08]">
        <p className="text-xs text-content-tertiary">
          {activeFilters.length === 0 
            ? "Select filters to narrow down the knowledge graph"
            : `${activeFilters.length} filter${activeFilters.length > 1 ? 's' : ''} active`
          }
        </p>
      </div>
    </div>
  )
}