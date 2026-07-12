"use client"

import { Suspense, useMemo, useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"
import { useMediaQuery } from "@/hooks/use-media-query"

function NeuralNodes({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  const nodeCount = isMobile ? 50 : 100
  
  const { positions, connections } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3)
    const conns: number[] = []
    
    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5
    }

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (distance < 3) {
          conns.push(i, j)
        }
      }
    }

    const linePositions = new Float32Array(conns.length * 3)
    conns.forEach((nodeIndex, i) => {
      linePositions[i * 3] = pos[nodeIndex * 3]
      linePositions[i * 3 + 1] = pos[nodeIndex * 3 + 1]
      linePositions[i * 3 + 2] = pos[nodeIndex * 3 + 2]
    })

    return { 
      positions: pos, 
      connections: linePositions 
    }
  }, [nodeCount])

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return
    
    if (!prefersReducedMotion) {
      pointsRef.current.rotation.y += 0.001
      pointsRef.current.rotation.x += 0.0005
      linesRef.current.rotation.y = pointsRef.current.rotation.y
      linesRef.current.rotation.x = pointsRef.current.rotation.x

      const targetX = mousePosition.x * 0.5
      const targetY = mousePosition.y * 0.5
      pointsRef.current.rotation.x += (targetY - pointsRef.current.rotation.x) * 0.05
      pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.05
      linesRef.current.rotation.x = pointsRef.current.rotation.x
      linesRef.current.rotation.y = pointsRef.current.rotation.y
    }
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#22c55e"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.3}
        />
      </lineSegments>
    </group>
  )
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  const particleCount = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame(() => {
    if (!particlesRef.current || prefersReducedMotion) return
    particlesRef.current.rotation.y += 0.0005
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#10b981"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

function CameraController() {
  const { camera } = useThree()
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  useFrame((state) => {
    if (prefersReducedMotion) return
    const time = state.clock.elapsedTime
    camera.position.x = Math.sin(time * 0.2) * 0.5
    camera.position.y = Math.cos(time * 0.2) * 0.3
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <CameraController />
      <NeuralNodes mousePosition={mousePosition} />
      <Particles />
    </>
  )
}

function LoadingFallback() {
  return null
}

export function D3NeuralHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10 w-full h-full"
      aria-hidden="true"
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 2]}
        >
          <Scene mousePosition={mousePosition} />
        </Canvas>
      </Suspense>
    </div>
  )
}