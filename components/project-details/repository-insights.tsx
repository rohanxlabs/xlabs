"use client"

import { motion } from "framer-motion"
import { FileText, GitCommit, Package, CheckCircle2, XCircle, Activity } from "lucide-react"
import type { RepositoryInsights as Insights } from "@/lib/projects"

interface RepositoryInsightsProps {
  insights: Insights
  coreFeatures: string[]
  challenges: string
  solutions: string
}

const LANG_COLORS = [
  "#339b5e",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
]

export function RepositoryInsights({
  insights,
  coreFeatures,
  challenges,
  solutions,
}: RepositoryInsightsProps) {
  const languages = Object.entries(insights.languages)
  const total = languages.reduce((sum, [, v]) => sum + v, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={<Package className="w-4 h-4" />} label="Version" value={insights.version} />
        <Stat
          icon={<GitCommit className="w-4 h-4" />}
          label="Last Update"
          value={insights.lastUpdate}
        />
        <Stat
          icon={insights.documentation ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          label="Docs"
          value={insights.documentation ? "Available" : "Minimal"}
          tone={insights.documentation ? "good" : "muted"}
        />
        <Stat
          icon={<Activity className="w-4 h-4" />}
          label="Status"
          value={insights.deploymentStatus}
        />
      </div>

      {/* Language breakdown */}
      <div className="p-6 rounded-2xl bg-black/20 border border-white/[0.08]">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-phthalo-400" />
          <h4 className="text-sm font-semibold text-content-primary">Languages</h4>
        </div>
        <div className="flex h-3 w-full rounded-full overflow-hidden bg-white/[0.06]">
          {languages.map(([name, pct], i) => (
            <div
              key={name}
              title={`${name} ${pct}%`}
              style={{
                width: `${(pct / total) * 100}%`,
                backgroundColor: LANG_COLORS[i % LANG_COLORS.length],
              }}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {languages.map(([name, pct], i) => (
            <div key={name} className="flex items-center gap-2 text-xs">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: LANG_COLORS[i % LANG_COLORS.length] }}
              />
              <span className="text-content-secondary">{name}</span>
              <span className="text-content-tertiary ml-auto tabular-nums">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Core features */}
      <div className="p-6 rounded-2xl bg-black/20 border border-white/[0.08]">
        <h4 className="text-sm font-semibold text-content-primary mb-3">Core Features</h4>
        <div className="flex flex-wrap gap-2">
          {coreFeatures.map((f) => (
            <span
              key={f}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-content-secondary border border-white/[0.08] text-xs"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Challenges & solutions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-black/20 border border-white/[0.08]">
          <h4 className="text-sm font-semibold text-amber-400 mb-2">Challenge</h4>
          <p className="text-sm text-content-secondary leading-relaxed">{challenges}</p>
        </div>
        <div className="p-6 rounded-2xl bg-black/20 border border-white/[0.08]">
          <h4 className="text-sm font-semibold text-phthalo-400 mb-2">Solution</h4>
          <p className="text-sm text-content-secondary leading-relaxed">{solutions}</p>
        </div>
      </div>
    </div>
  )
}

function Stat({
  icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ReactNode
  label: string
  value: string
  tone?: "default" | "good" | "muted"
}) {
  const toneClass =
    tone === "good"
      ? "text-phthalo-400"
      : tone === "muted"
        ? "text-content-tertiary"
        : "text-content-primary"
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-black/20 border border-white/[0.08]"
    >
      <div className="flex items-center gap-2 text-content-tertiary mb-1.5">
        {icon}
        <span className="text-[11px] uppercase tracking-wide">{label}</span>
      </div>
      <p className={`text-sm font-semibold ${toneClass}`}>{value}</p>
    </motion.div>
  )
}
