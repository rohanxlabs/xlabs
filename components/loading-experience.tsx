"use client"

import { useState, useEffect } from "react"

export function LoadingExperience() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded")
    if (hasLoaded) {
      setIsLoading(false)
      return
    }

    const timer = setTimeout(() => {
      setProgress(100)
    }, 800)

    const exitTimer = setTimeout(() => {
      setIsLoading(false)
      sessionStorage.setItem("hasLoaded", "true")
    }, 1200)

    return () => {
      clearTimeout(timer)
      clearTimeout(exitTimer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b]">
      <div className="relative flex flex-col items-center">
        <div className="mb-8">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-phthalo-500 to-phthalo-700 shadow-lg shadow-phthalo-900/30" />
            <div className="absolute inset-2 rounded-xl bg-[#09090b] flex items-center justify-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-phthalo-400 to-phthalo-600">
                R
              </span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-content-secondary text-sm mb-4">Loading experience</p>
          <div className="w-48 h-px bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-phthalo-500 to-phthalo-700 transition-all duration-800"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}