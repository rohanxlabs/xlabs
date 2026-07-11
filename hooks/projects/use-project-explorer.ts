"use client"

import { useCallback, useMemo, useState } from "react"
import {
  emptyFilters,
  filterAndSort,
  countActiveFilters,
} from "@/lib/projects"
import type { Project, ProjectFilters, SortKey } from "@/lib/projects"

export type ViewMode = "grid" | "list"

export interface UseProjectExplorer {
  query: string
  setQuery: (q: string) => void
  filters: ProjectFilters
  setFilters: (f: ProjectFilters) => void
  sort: SortKey
  setSort: (s: SortKey) => void
  view: ViewMode
  setView: (v: ViewMode) => void
  selected: Project | null
  select: (p: Project | null) => void
  results: Project[]
  matchedTech: Record<string, string[]>
  activeFilterCount: number
  clearFilters: () => void
  toggleArrayFilter: (key: keyof ProjectFilters, value: string) => void
  setBooleanFilter: (key: "openSource" | "featured", value: boolean | null) => void
}

export function useProjectExplorer(): UseProjectExplorer {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<ProjectFilters>(emptyFilters)
  const [sort, setSort] = useState<SortKey>("featured")
  const [view, setView] = useState<ViewMode>("grid")
  const [selected, setSelected] = useState<Project | null>(null)

  const { projects: results, matchedTechByProject: matchedTech } = useMemo(
    () => filterAndSort(query, filters, sort),
    [query, filters, sort],
  )

  const activeFilterCount = useMemo(() => countActiveFilters(filters), [filters])

  const clearFilters = useCallback(() => setFilters(emptyFilters), [])

  const toggleArrayFilter = useCallback((key: keyof ProjectFilters, value: string) => {
    setFilters((prev) => {
      const current = (prev[key] as string[]) ?? []
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...prev, [key]: next }
    })
  }, [])

  const setBooleanFilter = useCallback(
    (key: "openSource" | "featured", value: boolean | null) => {
      setFilters((prev) => ({ ...prev, [key]: prev[key] === value ? null : value }))
    },
    [],
  )

  const select = useCallback((p: Project | null) => setSelected(p), [])

  return {
    query,
    setQuery,
    filters,
    setFilters,
    sort,
    setSort,
    view,
    setView,
    selected,
    select,
    results,
    matchedTech,
    activeFilterCount,
    clearFilters,
    toggleArrayFilter,
    setBooleanFilter,
  }
}
