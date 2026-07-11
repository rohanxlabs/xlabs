"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

type LenisType = Lenis | null

export function useLenis() {
  const lenisRef = useRef<LenisType>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.0 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a[href^='#']:not([href='#'])")

      if (anchor) {
        const targetId = anchor.getAttribute("href")?.substring(1)
        const targetElement = document.getElementById(targetId || "")

        if (targetElement) {
          e.preventDefault()
          lenisRef.current?.scrollTo(targetElement, { offset: -80 })
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      lenis.destroy()
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return lenisRef
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useLenis()
  return <>{children}</>
}