"use client"

import { useEffect, useRef, useMemo } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface Connection {
  from: number
  to: number
  opacity: number
}

export function AINeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  const nodes = useRef<Node[]>([])
  const connections = useRef<Connection[]>([])
  const animationRef = useRef<number>()

  const nodeCount = useMemo(() => isMobile ? 30 : 60, [isMobile])
  const intensity = useMemo(() => {
    if (prefersReducedMotion) return 0.1
    return isMobile ? 0.3 : 0.6
  }, [isMobile, prefersReducedMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initializeNodes()
    }

    const initializeNodes = () => {
      nodes.current = []
      connections.current = []

      for (let i = 0; i < nodeCount; i++) {
        nodes.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5 * intensity,
          vy: (Math.random() - 0.5) * 0.5 * intensity,
          radius: Math.random() * 2 + 1,
        })
      }

      for (let i = 0; i < nodes.current.length; i++) {
        for (let j = i + 1; j < nodes.current.length; j++) {
          const dx = nodes.current[i].x - nodes.current[j].x
          const dy = nodes.current[i].y - nodes.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 180) {
            connections.current.push({ from: i, to: j, opacity: 0 })
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      )
      gradient.addColorStop(0, "#1a1f2e")
      gradient.addColorStop(0.5, "#0f1218")
      gradient.addColorStop(1, "#05070a")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawLightBlobs(ctx, canvas)

      if (!prefersReducedMotion) {
        nodes.current.forEach((node) => {
          node.x += node.vx
          node.y += node.vy

          if (node.x < 0 || node.x > canvas.width) node.vx *= -1
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1
        })

        connections.current.forEach((conn) => {
          const fromNode = nodes.current[conn.from]
          const toNode = nodes.current[conn.to]
          const dx = fromNode.x - toNode.x
          const dy = fromNode.y - toNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 180
          conn.opacity = Math.max(0, (1 - distance / maxDistance) * 0.6)
        })
      }

      connections.current.forEach((conn) => {
        const fromNode = nodes.current[conn.from]
        const toNode = nodes.current[conn.to]
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.strokeStyle = `rgba(34, 197, 94, ${conn.opacity * intensity})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      })

      nodes.current.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 197, 94, ${0.8 * intensity})`
        ctx.fill()
        
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 4)
        gradient.addColorStop(0, `rgba(34, 197, 94, ${0.3 * intensity})`)
        gradient.addColorStop(1, "rgba(34, 197, 94, 0)")
        ctx.fillStyle = gradient
        ctx.fillRect(node.x - node.radius * 4, node.y - node.radius * 4, node.radius * 8, node.radius * 8)
      })

      drawNoise(ctx, canvas)

      animationRef.current = requestAnimationFrame(animate)
    }

    const drawLightBlobs = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const time = Date.now() * 0.0001 * intensity

      const blobs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, size: 300, color: "rgba(34, 197, 94, 0.08)" },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, size: 400, color: "rgba(16, 185, 129, 0.06)" },
        { x: canvas.width * 0.5, y: canvas.height * 0.2, size: 350, color: "rgba(34, 197, 94, 0.05)" },
      ]

      blobs.forEach((blob, i) => {
        const offsetX = Math.sin(time + i) * 50
        const offsetY = Math.cos(time + i) * 30
        
        const gradient = ctx.createRadialGradient(
          blob.x + offsetX, blob.y + offsetY, 0,
          blob.x + offsetX, blob.y + offsetY, blob.size
        )
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })
    }

    const drawNoise = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 10
        data[i] += noise
        data[i + 1] += noise
        data[i + 2] += noise
      }
      
      ctx.putImageData(imageData, 0, 0)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [nodeCount, intensity, prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      aria-hidden="true"
    />
  )
}