"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  X,
  LayoutDashboard,
  ArrowDownWideNarrow,
} from "lucide-react"
import Link from "next/link"
import { useProjectExplorer } from "@/hooks/projects/use-project-explorer"
import { ProjectSearch } from "@/components/project-search/project-search"
import { ProjectFilters } from "@/components/projects/project-filters"
import { ProjectExplorer } from "@/components/projects/project-explorer"
import { FeaturedRail } from "@/components/projects/featured-rail"
import {
  getCategories,
  getFeaturedProjects,
  getAggregateStats,
  categoryHex,
  portfolioProjects,
  type SortKey,
} from "@/lib/projects"

const ProjectDetailWorkspace = dynamic(
  () => import("@/components/project-details/project-detail-workspace").then((m) => m.ProjectDetailWorkspace),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-full border-2 border-phthalo-500 border-t-transparent animate-spin" />
      </div>
    ),
  },
)

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "recent", label: "Recent" },
  { key: "title", label: "A–Z" },
  { key: "difficulty", label: "Difficulty" },
]

export default function ProjectsPage() {
  const {
    query,
    setQuery,
    filters,
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
  } = useProjectExplorer()

  const featured = useMemo(() => getFeaturedProjects(), [])
  const stats = useMemo(() => getAggregateStats(), [])
  const showFeatured = query.trim() === "" && activeFilterCount === 0
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const removeFilter = (key: keyof typeof filters, value: string) => toggleArrayFilter(key, value)
  const clearBoolean = (key: "openSource" | "featured") => setBooleanFilter(key, (filters[key] as boolean) ?? true)

  const activeChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = []
    const pushArray = (key: keyof typeof filters, label: string) =>
      (filters[key] as string[]).forEach((v) =>
        chips.push({ key: `${key}-${v}`, label: v, onRemove: () => removeFilter(key, v) }),
      )
    pushArray("category", "Category")
    pushArray("technology", "Tech")
    pushArray("tag", "Tag")
    pushArray("type", "Type")
    pushArray("status", "Status")
    pushArray("year", "Year")
    pushArray("difficulty", "Difficulty")
    pushArray("deployment", "Deploy")
    if (filters.openSource) chips.push({ key: "os", label: "Open Source", onRemove: () => clearBoolean("openSource") })
    if (filters.featured) chips.push({ key: "ft", label: "Featured", onRemove: () => clearBoolean("featured") })
    return chips
  }, [filters])

  return (
    <div className="min-h-screen bg-[#09090b] text-white relative overflow-hidden">
      {/* Platform background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/[0.08]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/command-center"
                className="p-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                aria-label="Back to AI Command Center"
              >
                <LayoutDashboard className="w-5 h-5 text-content-secondary" />
              </Link>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-content-primary truncate">Project Explorer</h1>
                <p className="text-xs text-content-tertiary hidden sm:block">
                  Engineering portfolio — architecture, decisions &amp; relationships
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/command-center"
                className="text-sm text-content-secondary hover:text-content-primary transition-colors hidden sm:block"
              >
                AI Command Center
              </Link>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors relative"
                aria-label="Open filters"
              >
                <SlidersHorizontal className="w-5 h-5" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-phthalo-600 text-[10px] flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setView(view === "grid" ? "list" : "grid")}
                className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
                aria-label={`Switch to ${view === "grid" ? "list" : "grid"} view`}
              >
                {view === "grid" ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative">
        {/* Hero */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-phthalo-500 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] text-content-tertiary">
              Engineering Portfolio
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-content-primary tracking-tight">
            Project Explorer
          </h1>
          <p className="text-content-secondary mt-2 max-w-2xl">
            An interactive workspace for every system I&apos;ve built — architecture, technical decisions, tech
            stack, and how each project connects to the others.
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <StatPill label="Projects" value={stats.projects} />
            <StatPill label="Categories" value={stats.categories} />
            <StatPill label="Technologies" value={stats.technologies} />
            <StatPill label="Years" value={stats.years} />
            <StatPill label="Featured" value={stats.featured} accent />
          </div>
        </section>

        {/* Search */}
        <div className="mb-6">
          <ProjectSearch
            query={query}
            onQueryChange={setQuery}
            projects={portfolioProjects}
            onSelectProject={select}
          />
        </div>

        {/* Category quick chips */}
        <div className="mb-4 flex flex-wrap gap-2">
          {getCategories().map((category) => {
            const on = filters.category.includes(category)
            const hex = categoryHex(category)
            return (
              <button
                key={category}
                onClick={() => toggleArrayFilter("category", category)}
                aria-pressed={on}
                style={
                  on
                    ? { backgroundColor: hex, borderColor: hex, color: "#0b0b0f" }
                    : undefined
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                  on
                    ? "border"
                    : "bg-white/[0.04] text-content-secondary border border-white/[0.08] hover:bg-white/[0.08]"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: on ? "#0b0b0f" : hex }}
                />
                {category}
              </button>
            )
          })}
        </div>

        {/* Active filter chips */}
        <AnimatePresence>
          {activeChips.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                {activeChips.map((chip) => (
                  <button
                    key={chip.key}
                    onClick={chip.onRemove}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-phthalo-900/40 text-phthalo-300 border border-phthalo-700/40 text-xs hover:bg-phthalo-900/70 transition-colors"
                  >
                    {chip.label}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-xs text-content-tertiary hover:text-content-primary underline underline-offset-2"
                >
                  Clear all
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-8">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ProjectFilters
                filters={filters}
                onToggle={toggleArrayFilter}
                onBoolean={setBooleanFilter}
                onClear={clearFilters}
                activeCount={activeFilterCount}
              />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {showFeatured && <FeaturedRail projects={featured} onProjectClick={select} />}

            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-content-tertiary">
                <span className="text-content-primary font-medium">{results.length}</span>{" "}
                {results.length === 1 ? "project" : "projects"}
                {query.trim() && (
                  <>
                    {" "}
                    for &ldquo;<span className="text-content-primary">{query}</span>&rdquo;
                  </>
                )}
              </p>

              {/* Sort control */}
              <div className="flex items-center gap-1.5">
                <ArrowDownWideNarrow className="w-4 h-4 text-content-tertiary hidden sm:block" />
                <div className="flex items-center gap-1 rounded-lg bg-white/[0.04] border border-white/[0.08] p-1">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setSort(opt.key)}
                      aria-pressed={sort === opt.key}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        sort === opt.key
                          ? "bg-phthalo-600 text-white"
                          : "text-content-secondary hover:text-content-primary"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <ProjectExplorer
              projects={results}
              viewMode={view}
              onProjectClick={select}
              matchedTech={matchedTech}
            />
          </div>
        </div>
      </main>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#09090b] border-l border-white/[0.08] z-50 p-5 overflow-y-auto custom-scrollbar-phthalo"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="sr-only">Filters</span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="ml-auto p-2 rounded-lg hover:bg-white/[0.08] transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5 text-content-secondary" />
                </button>
              </div>
              <ProjectFilters
                filters={filters}
                onToggle={toggleArrayFilter}
                onBoolean={setBooleanFilter}
                onClear={clearFilters}
                activeCount={activeFilterCount}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Detail workspace */}
      <AnimatePresence>
        {selected && (
          <ProjectDetailWorkspace
            project={selected}
            allProjects={portfolioProjects}
            onClose={() => select(null)}
            onSelectProject={(p) => select(p)}
            searchTerm={query}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function StatPill({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border ${
        accent
          ? "bg-phthalo-950/40 border-phthalo-700/40"
          : "bg-white/[0.03] border-white/[0.07]"
      }`}
    >
      <span className={`text-xl font-bold tabular-nums ${accent ? "text-phthalo-300" : "text-content-primary"}`}>
        {value}
      </span>
      <span className="text-xs text-content-tertiary">{label}</span>
    </div>
  )
}
