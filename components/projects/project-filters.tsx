"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, X, Tag, Star, Github } from "lucide-react"
import {
  getCategories,
  getTechnologies,
  getTags,
  getYears,
  getTypes,
  getDifficulties,
  getDeployments,
  getStatuses,
  portfolioProjects,
  categoryHex,
} from "@/lib/projects"
import type { ProjectFilters } from "@/lib/projects"

interface ProjectFiltersProps {
  filters: ProjectFilters
  onToggle: (key: keyof ProjectFilters, value: string) => void
  onBoolean: (key: "openSource" | "featured", value: boolean) => void
  onClear: () => void
  activeCount: number
}

interface SectionProps {
  title: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
  icon?: React.ReactNode
  counts?: Record<string, number>
  accentFor?: (option: string) => string | null
}

function FilterSection({ title, options, selected, onToggle, icon, counts, accentFor }: SectionProps) {
  const [expanded, setExpanded] = useState(true)
  if (options.length === 0) return null
  return (
    <div className="mb-5">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between py-2 text-content-primary font-medium"
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-content-secondary" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 pt-2">
              {options.map((option) => {
                const isOn = selected.includes(option)
                const count = counts?.[option]
                const accent = accentFor?.(option)
                return (
                  <button
                    key={option}
                    onClick={() => onToggle(option)}
                    aria-pressed={isOn}
                    className={`group/filter px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isOn
                        ? "bg-phthalo-600 text-white"
                        : "bg-white/[0.04] text-content-secondary border border-white/[0.08] hover:bg-white/[0.08]"
                    }`}
                  >
                    {accent && (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                    )}
                    {option}
                    {typeof count === "number" && (
                      <span
                        className={`text-[10px] tabular-nums ${
                          isOn ? "text-white/70" : "text-content-tertiary"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function BooleanRow({
  label,
  icon,
  value,
  onToggle,
}: {
  label: string
  icon: React.ReactNode
  value: boolean | null
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={value === true}
      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center gap-2 ${
        value === true
          ? "bg-phthalo-600 text-white border-phthalo-500"
          : "bg-white/[0.04] text-content-secondary border-white/[0.08] hover:bg-white/[0.08]"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

export function ProjectFilters({
  filters,
  onToggle,
  onBoolean,
  onClear,
  activeCount,
}: ProjectFiltersProps) {
  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    const bump = (key: string) => (c[key] = (c[key] ?? 0) + 1)
    portfolioProjects.forEach((p) => {
      bump(p.category)
      p.technologies.forEach(bump)
      p.tags.forEach(bump)
      bump(p.type)
      bump(p.status)
      bump(p.year)
      bump(p.difficulty)
      bump(p.deployment)
    })
    return c
  }, [])

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-content-primary">
          Filters
          {activeCount > 0 && (
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-phthalo-600/30 text-phthalo-300">
              {activeCount}
            </span>
          )}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar-phthalo">
        <FilterSection
          title="Category"
          options={getCategories()}
          selected={filters.category}
          onToggle={(v) => onToggle("category", v)}
          counts={counts}
          accentFor={(o) => categoryHex(o)}
        />
        <FilterSection
          title="Technology"
          options={getTechnologies()}
          selected={filters.technology}
          onToggle={(v) => onToggle("technology", v)}
          counts={counts}
        />
        <FilterSection
          title="Tag"
          icon={<Tag className="w-3.5 h-3.5 text-content-tertiary" />}
          options={getTags()}
          selected={filters.tag}
          onToggle={(v) => onToggle("tag", v)}
        />
        <FilterSection
          title="Project Type"
          options={getTypes()}
          selected={filters.type}
          onToggle={(v) => onToggle("type", v)}
          counts={counts}
        />
        <FilterSection
          title="Status"
          options={getStatuses()}
          selected={filters.status}
          onToggle={(v) => onToggle("status", v)}
          counts={counts}
        />
        <FilterSection
          title="Year"
          options={getYears()}
          selected={filters.year}
          onToggle={(v) => onToggle("year", v)}
          counts={counts}
        />
        <FilterSection
          title="Difficulty"
          options={getDifficulties()}
          selected={filters.difficulty}
          onToggle={(v) => onToggle("difficulty", v)}
          counts={counts}
        />
        <FilterSection
          title="Deployment"
          options={getDeployments()}
          selected={filters.deployment}
          onToggle={(v) => onToggle("deployment", v)}
          counts={counts}
        />

        <div className="mb-5">
          <p className="py-2 text-content-primary font-medium">Attributes</p>
          <div className="flex gap-2">
            <BooleanRow
              label="Open Source"
              icon={<Github className="w-3.5 h-3.5" />}
              value={filters.openSource}
              onToggle={() => onBoolean("openSource", true)}
            />
            <BooleanRow
              label="Featured"
              icon={<Star className="w-3.5 h-3.5" />}
              value={filters.featured}
              onToggle={() => onBoolean("featured", true)}
            />
          </div>
        </div>
      </div>

      <button
        onClick={onClear}
        disabled={activeCount === 0}
        className="mt-4 w-full py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-content-secondary hover:bg-white/[0.08] transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <X className="w-4 h-4" />
        Clear All Filters
      </button>
    </div>
  )
}
