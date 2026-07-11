"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import type { ArchitectureNode } from "@/lib/projects"

interface ArchitectureDiagramProps {
  architecture: ArchitectureNode[]
  projectName: string
  highlightTerm?: string
}

const COLORS = {
  node: "#16161d",
  nodeBorder: "rgba(51, 155, 94, 0.45)",
  nodeText: "#fafafa",
  nodeSub: "rgba(255,255,255,0.55)",
  edge: "rgba(255,255,255,0.14)",
  edgeActive: "#339b5e",
  accent: "#339b5e",
}

export function ArchitectureDiagram({
  architecture,
  projectName,
  highlightTerm,
}: ArchitectureDiagramProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [active, setActive] = useState<string | null>(null)

  const { nodes, edges, width, height } = useMemo(() => {
    const nameToNode = new Map(architecture.map((n) => [n.name, n]))
    // Compute depth (longest path from a root with no incoming edges).
    const incoming = new Map<string, number>()
    architecture.forEach((n) => incoming.set(n.name, 0))
    architecture.forEach((n) =>
      n.connections.forEach((c) => {
        if (nameToNode.has(c)) incoming.set(c, (incoming.get(c) ?? 0) + 1)
      }),
    )
    const depth = new Map<string, number>()
    const computeDepth = (name: string, stack: Set<string>): number => {
      if (depth.has(name)) return depth.get(name)!
      const node = nameToNode.get(name)
      if (!node || node.connections.length === 0) {
        depth.set(name, 0)
        return 0
      }
      if (stack.has(name)) return 0
      stack.add(name)
      const d = 1 + Math.max(...node.connections.map((c) => computeDepth(c, stack)))
      stack.delete(name)
      depth.set(name, d)
      return d
    }
    architecture.forEach((n) => computeDepth(n.name, new Set()))

    const maxDepth = Math.max(0, ...[...depth.values()])
    const byDepth = new Map<number, string[]>()
    architecture.forEach((n) => {
      const d = depth.get(n.name) ?? 0
      if (!byDepth.has(d)) byDepth.set(d, [])
      byDepth.get(d)!.push(n.name)
    })

    const W = 1000
    const H = Math.max(520, (maxDepth + 1) * 180)
    const positioned = architecture.map((n) => {
      const d = depth.get(n.name) ?? 0
      const col = byDepth.get(d) ?? [n.name]
      const idx = col.indexOf(n.name)
      const x = ((idx + 1) / (col.length + 1)) * W
      const y = ((d + 1) / (maxDepth + 2)) * H
      return { ...n, x, y }
    })

    const posByName = new Map(positioned.map((p) => [p.name, p]))
    const es: { from: string; to: string; key: string }[] = []
    positioned.forEach((n) =>
      n.connections.forEach((c) => {
        if (posByName.has(c)) es.push({ from: n.name, to: c, key: `${n.name}->${c}` })
      }),
    )
    return { nodes: positioned, edges: es, width: W, height: H }
  }, [architecture])

  const term = highlightTerm?.trim().toLowerCase()

  const neighbors = useMemo(() => {
    const map = new Map<string, Set<string>>()
    nodes.forEach((n) => map.set(n.name, new Set()))
    edges.forEach((e) => {
      map.get(e.from)?.add(e.to)
      map.get(e.to)?.add(e.from)
    })
    return map
  }, [nodes, edges])

  const activeNode = active ?? hovered
  const isNodeLit = (name: string) => {
    if (term) {
      const node = nodes.find((n) => n.name === name)
      return (
        node &&
        (node.name.toLowerCase().includes(term) ||
          node.description.toLowerCase().includes(term))
      )
    }
    if (!activeNode) return true
    return name === activeNode || neighbors.get(activeNode)?.has(name)
  }
  const isEdgeLit = (from: string, to: string) => {
    if (term) {
      return isNodeLit(from) || isNodeLit(to)
    }
    if (!activeNode) return true
    return from === activeNode || to === activeNode
  }

  const detail = activeNode ? nodes.find((n) => n.name === activeNode) : null

  return (
    <div className="h-full bg-black/20 rounded-2xl border border-white/[0.08] overflow-auto">
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-bold text-content-primary mb-1">System Architecture</h3>
        <p className="text-content-secondary text-sm">
          {term
            ? `Highlighting components related to "${highlightTerm}" in ${projectName}`
            : `Interactive architecture for ${projectName} — hover to trace relationships, click to inspect.`}
        </p>
      </div>

      <div className="relative w-full" style={{ minHeight: height }}>
        <svg
          className="w-full"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Architecture diagram for ${projectName}`}
        >
          <defs>
            <linearGradient id="archEdge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={COLORS.edgeActive} stopOpacity="0.7" />
              <stop offset="100%" stopColor={COLORS.edgeActive} stopOpacity="0.15" />
            </linearGradient>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={COLORS.edgeActive} />
            </marker>
          </defs>

          {/* Edges */}
          <g>
            {edges.map((e) => {
              const a = nodes.find((n) => n.name === e.from)!
              const b = nodes.find((n) => n.name === e.to)!
              const lit = isEdgeLit(e.from, e.to)
              const midY = (a.y + b.y) / 2
              const path = `M ${a.x} ${a.y + 36} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y - 36}`
              return (
                <path
                  key={e.key}
                  d={path}
                  fill="none"
                  stroke={lit ? "url(#archEdge)" : COLORS.edge}
                  strokeWidth={lit ? 2 : 1.5}
                  markerEnd={lit ? "url(#arrow)" : undefined}
                  className="transition-all duration-300"
                  opacity={lit ? 1 : 0.25}
                />
              )
            })}
          </g>

          {/* Nodes */}
          <g>
            {nodes.map((node) => {
              const lit = isNodeLit(node.name)
              const isActive = activeNode === node.name
              return (
                <g
                  key={node.name}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer"
                  opacity={lit ? 1 : 0.3}
                  onMouseEnter={() => setHovered(node.name)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setActive(isActive ? null : node.name)}
                  role="button"
                  aria-label={`${node.name}: ${node.description}`}
                  tabIndex={0}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                      ev.preventDefault()
                      setActive(isActive ? null : node.name)
                    }
                  }}
                >
                  <rect
                    x={-90}
                    y={-36}
                    width={180}
                    height={72}
                    rx={14}
                    fill={COLORS.node}
                    stroke={isActive ? COLORS.accent : COLORS.nodeBorder}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    className="transition-all duration-300"
                  />
                  <text
                    x={0}
                    y={-10}
                    textAnchor="middle"
                    fill={COLORS.nodeText}
                    fontSize={14}
                    fontWeight={600}
                  >
                    {node.name}
                  </text>
                  <text
                    x={0}
                    y={12}
                    textAnchor="middle"
                    fill={COLORS.nodeSub}
                    fontSize={10}
                  >
                    {node.description.length > 28
                      ? node.description.slice(0, 28) + "…"
                      : node.description}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      {/* Explanation panel for clicked/active node */}
      <div className="px-6 md:px-8 pb-8">
        {detail ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-phthalo-950/40 border border-phthalo-700/40 rounded-xl"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h4 className="text-lg font-semibold text-phthalo-300">{detail.name}</h4>
              <button
                onClick={() => setActive(null)}
                className="text-xs text-content-tertiary hover:text-content-primary transition-colors"
              >
                Clear
              </button>
            </div>
            <p className="text-sm text-content-secondary mt-2">{detail.description}</p>
            {detail.connections.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs text-content-tertiary">Connects to:</span>
                {detail.connections.map((c) => (
                  <span
                    key={c}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-phthalo-900/40 text-phthalo-300 border border-phthalo-700/40"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {nodes.map((node) => (
              <div
                key={node.name}
                className="p-3 bg-black/30 border border-white/[0.06] rounded-lg opacity-90"
              >
                <p className="text-sm font-medium text-content-primary">{node.name}</p>
                <p className="text-xs text-content-tertiary mt-0.5">{node.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
