"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceX, forceY } from "d3-force"

interface Node {
  id: string
  name: string
  category: string
  x: number
  y: number
  vx?: number
  vy?: number
}

interface Link {
  source: string | Node
  target: string | Node
}

interface KnowledgeGraphProps {
  technologies: Node[]
  relationships: Link[]
  onNodeClick: (node: Node) => void
  selectedNode: Node | null
}

const categoryColors: Record<string, string> = {
  ai: "#10b981",
  language: "#8b5cf6",
  devops: "#f59e0b",
  robotics: "#ef4444",
  frontend: "#3b82f6",
  backend: "#06b6d4",
  cloud: "#14b8a6",
  data: "#f43f5e"
}

export function KnowledgeGraph({ technologies, relationships, onNodeClick, selectedNode }: KnowledgeGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [links, setLinks] = useState<any[]>([])
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  
  // Zoom and pan state
  const scale = useMotionValue(1)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const isDragging = useRef(false)
  const lastPosition = useRef({ x: 0, y: 0 })

  // Initialize force-directed graph
  useEffect(() => {
    if (!containerRef.current) return
    
    const { width, height } = containerRef.current.getBoundingClientRect()
    setDimensions({ width, height })

    // Process data for force simulation
    const nodeMap = new Map(technologies.map(t => [t.id, { ...t }]))
    const graphLinks = relationships
      .filter(r => nodeMap.has(typeof r.source === 'string' ? r.source : r.source.id) && 
                   nodeMap.has(typeof r.target === 'string' ? r.target : r.target.id))
      .map(r => ({
        source: nodeMap.get(typeof r.source === 'string' ? r.source : r.source.id)!,
        target: nodeMap.get(typeof r.target === 'string' ? r.target : r.target.id)!
      }))

    const graphNodes = Array.from(nodeMap.values())

    // Create force simulation
    const simulation = forceSimulation<Node>(graphNodes)
      .force("link", forceLink(graphLinks).distance(80).strength(0.6))
      .force("charge", forceManyBody().strength(-300))
      .force("center", forceCenter(width / 2, height / 2))
      .force("x", forceX(width / 2).strength(0.05))
      .force("y", forceY(height / 2).strength(0.05))
      .stop()

    // Run simulation
    for (let i = 0; i < 300; ++i) simulation.tick()
    
    simulation.stop()
    
    setNodes(graphNodes)
    setLinks(graphLinks)

    return () => simulation.stop()
  }, [technologies, relationships])

  // Handle zoom with mouse wheel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newScale = Math.min(Math.max(scale.get() * delta, 0.5), 3)
    scale.set(newScale)
  }, [scale])

  // Handle pan with mouse drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".graph-node")) return
    isDragging.current = true
    lastPosition.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastPosition.current.x
    const dy = e.clientY - lastPosition.current.y
    x.set(x.get() + dx)
    y.set(y.get() + dy)
    lastPosition.current = { x: e.clientX, y: e.clientY }
  }, [x, y])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  // Get node color based on category
  const getNodeColor = (category: string) => categoryColors[category] || "#ffffff"

  // Check if node is connected to selected node
  const isNodeConnected = (nodeId: string) => {
    if (!selectedNode) return true
    return links.some(link => 
      (link.source.id === selectedNode.id && link.target.id === nodeId) ||
      (link.target.id === selectedNode.id && link.source.id === nodeId) ||
      nodeId === selectedNode.id
    )
  }

  // Check if link is connected to selected node
  const isLinkHighlighted = (link: any) => {
    if (!selectedNode) return false
    return (link.source.id === selectedNode.id || link.target.id === selectedNode.id)
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => scale.set(Math.min(scale.get() * 1.3, 3))}
          className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center hover:bg-white/[0.12] transition-colors"
        >
          <span className="text-lg font-bold">+</span>
        </button>
        <button
          onClick={() => scale.set(Math.max(scale.get() / 1.3, 0.5))}
          className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center hover:bg-white/[0.12] transition-colors"
        >
          <span className="text-lg font-bold">−</span>
        </button>
        <button
          onClick={() => { scale.set(1); x.set(0); y.set(0) }}
          className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center hover:bg-white/[0.12] transition-colors text-xs"
        >
          ⟲
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-10 text-xs text-content-tertiary">
        Scroll to zoom • Drag to pan • Click nodes to explore
      </div>

      {/* SVG Graph */}
      <motion.div
        style={{ scale, x, y }}
        className="w-full h-full"
      >
        <svg width={dimensions.width} height={dimensions.height} className="overflow-visible">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Links */}
          <g className="links">
            {links.map((link, i) => (
              <motion.line
                key={i}
                x1={link.source.x}
                y1={link.source.y}
                x2={link.target.x}
                y2={link.target.y}
                stroke={isLinkHighlighted(link) ? getNodeColor(link.source.category) : "rgba(255,255,255,0.1)"}
                strokeWidth={isLinkHighlighted(link) ? 2 : 1}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isNodeConnected(link.source.id) && isNodeConnected(link.target.id) ? 1 : 0.1,
                }}
                transition={{ duration: 0.5 }}
              >
                {isLinkHighlighted(link) && (
                  <animate
                    attributeName="stroke-dasharray"
                    values="0,1000;50,1000"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                )}
              </motion.line>
            ))}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {nodes.map((node) => (
              <motion.g
                key={node.id}
                className="graph-node cursor-pointer"
                transform={`translate(${node.x}, ${node.y})`}
                onClick={(e) => {
                  e.stopPropagation()
                  onNodeClick(node)
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: isNodeConnected(node.id) ? 1 : 0.3,
                  scale: isNodeConnected(node.id) ? 1 : 0.8,
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                filter={selectedNode?.id === node.id ? "url(#glow)" : undefined}
              >
                <circle
                  r={28}
                  fill={getNodeColor(node.category)}
                  className="transition-all duration-300"
                  opacity={0.9}
                />
                <circle
                  r={32}
                  fill="transparent"
                  stroke={selectedNode?.id === node.id ? getNodeColor(node.category) : "transparent"}
                  strokeWidth={2}
                  className="transition-all duration-300"
                />
                <text
                  textAnchor="middle"
                  dy="0.35em"
                  fill="white"
                  fontSize="10"
                  fontWeight="500"
                  className="pointer-events-none select-none"
                >
                  {node.name.length > 10 ? node.name.slice(0, 10) + '...' : node.name}
                </text>
              </motion.g>
            ))}
          </g>
        </svg>
      </motion.div>
    </div>
  )
}