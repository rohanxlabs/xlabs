"use client"

import { useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, CornerDownLeft, Hash, FolderTree, Box } from "lucide-react"
import type { Project } from "@/lib/projects"

interface ProjectSearchProps {
  query: string
  onQueryChange: (q: string) => void
  projects: Project[]
  onSelectProject?: (project: Project) => void
}

type Suggestion =
  | { kind: "technology"; label: string }
  | { kind: "category"; label: string }
  | { kind: "project"; project: Project }

export function ProjectSearch({
  query,
  onQueryChange,
  projects,
  onSelectProject,
}: ProjectSearchProps) {
  const [focused, setFocused] = useState(false)
  const [active, setActive] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions = useMemo<Suggestion[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const techs = [...new Set(projects.flatMap((p) => p.technologies))]
      .filter((t) => t.toLowerCase().includes(q))
      .slice(0, 4)
      .map((t) => ({ kind: "technology" as const, label: t }))
    const cats = [...new Set(projects.map((p) => p.category))]
      .filter((c) => c.toLowerCase().includes(q))
      .slice(0, 3)
      .map((c) => ({ kind: "category" as const, label: c }))
    const projs = projects
      .filter((p) => p.title.toLowerCase().includes(q))
      .slice(0, 3)
      .map((p) => ({ kind: "project" as const, project: p }))
    return [...projs, ...techs, ...cats]
  }, [query, projects])

  const showSuggestions = focused && suggestions.length > 0

  const choose = (s: Suggestion) => {
    if (s.kind === "project") {
      onSelectProject?.(s.project)
    } else {
      onQueryChange(s.label)
    }
    setFocused(false)
    setActive(-1)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault()
      choose(suggestions[active])
    } else if (e.key === "Escape") {
      setFocused(false)
      setActive(-1)
    }
  }

  const iconFor = (kind: Suggestion["kind"]) =>
    kind === "technology" ? <Hash className="w-3.5 h-3.5" /> : kind === "category" ? <FolderTree className="w-3.5 h-3.5" /> : <Box className="w-3.5 h-3.5" />

  return (
    <div className="relative w-full">
      <motion.div
        animate={{
          boxShadow: focused
            ? "0 0 0 1px rgba(51,155,94,0.4), 0 20px 60px rgba(0,0,0,0.3)"
            : "0 0 0 0 rgba(0,0,0,0)",
        }}
        className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden"
      >
        <div className="pl-5 pr-3">
          <Search className="w-5 h-5 text-content-tertiary" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value)
            setActive(-1)
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={onKeyDown}
          placeholder="Search projects, technologies, or architecture…"
          aria-label="Search projects"
          aria-expanded={showSuggestions}
          role="combobox"
          aria-controls="project-search-suggestions"
          className="w-full bg-transparent py-4 pr-12 text-content-primary placeholder:text-content-tertiary outline-none text-base"
        />
        {query && (
          <button
            onClick={() => {
              onQueryChange("")
              inputRef.current?.focus()
            }}
            className="absolute right-4 p-1 rounded-full hover:bg-white/[0.08] transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-content-secondary" />
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            id="project-search-suggestions"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#0f0f13] border border-white/[0.08] rounded-xl overflow-hidden shadow-xl z-30"
          >
            <ul role="listbox" className="p-2 max-h-80 overflow-auto">
              {suggestions.map((s, i) => (
                <li key={`${s.kind}-${s.kind === "project" ? s.project.id : s.label}`} role="option" aria-selected={active === i}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => choose(s)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors ${
                      active === i ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="text-content-tertiary">{iconFor(s.kind)}</span>
                    <span className="text-content-secondary text-sm flex-1 truncate">
                      {s.kind === "project" ? s.project.title : s.label}
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-content-tertiary px-1.5 py-0.5 rounded bg-white/[0.04]">
                      {s.kind}
                    </span>
                    {active === i && <CornerDownLeft className="w-3.5 h-3.5 text-content-tertiary" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
