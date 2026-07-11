"use client"

import { useState, useRef, useEffect, useCallback } from "react"

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInViewport, setIsMouseInViewport] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMouseInViewport(true)
    }

    const handleMouseLeave = () => {
      setIsMouseInViewport(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return { mousePosition, isMouseInViewport }
}

export function useMagneticEffect(
  strength: number = 0.3,
  maxMove: number = 15
) {
  const ref = useRef<HTMLElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      const moveX = (distanceX * strength) / 10
      const moveY = (distanceY * strength) / 10

      setTransform({
        x: Math.max(-maxMove, Math.min(maxMove, moveX)),
        y: Math.max(-maxMove, Math.min(maxMove, moveY)),
      })
    },
    [strength, maxMove]
  )

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 })
  }, [])

  return {
    ref,
    transform,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}

export function useTiltEffect(
  maxTilt: number = 8,
  perspective: number = 1000
) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt
      const rotateX = ((-(e.clientY - centerY)) / (rect.height / 2)) * maxTilt

      setTilt({ rotateX, rotateY })
    },
    [maxTilt]
  )

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }, [])

  return {
    ref,
    tilt,
    style: {
      perspective: `${perspective}px`,
      transformStyle: "preserve-3d" as const,
    },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}

export function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null)
  const [spotlightStyle, setSpotlightStyle] = useState({})

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setSpotlightStyle({
      background: `radial-gradient(200px circle at ${x}px ${y}px, rgba(38, 128, 74, 0.15), transparent)`,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setSpotlightStyle({})
  }, [])

  return {
    ref,
    spotlightStyle,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}