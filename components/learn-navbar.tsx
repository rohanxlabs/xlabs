"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, GraduationCap } from "lucide-react"

export function LearnNavbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const dismissed = localStorage.getItem('learn-navbar-dismissed')
    if (dismissed === 'true') {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('learn-navbar-dismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled ? "glass-strong border-b border-white/10" : "glass border-b border-white/5"
      }`}
      style={{ height: '56px' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-full gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-phthalo-500 to-phthalo-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-phthalo-900/20">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>

            <div className="hidden sm:block min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                Want to learn quant finance & math?
              </p>
              <p className="text-xs text-content-secondary truncate">
                Join the waitlist for courses and mentorship
              </p>
            </div>
            <div className="sm:hidden">
              <p className="text-sm font-semibold text-white truncate">
                Learn quant finance
              </p>
            </div>
          </div>

          <Link
            href="/learn"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-700 hover:to-phthalo-900 text-white text-sm font-medium transition-all flex-shrink-0 shadow-md shadow-phthalo-900/20 hover:shadow-lg hover:shadow-phthalo-900/30"
          >
            <span className="hidden sm:inline">Take the Quiz</span>
            <span className="sm:hidden">Quiz</span>
          </Link>

          <button
            onClick={handleDismiss}
            className="p-1.5 hover:bg-white/[0.06] rounded-lg transition-colors flex-shrink-0 text-content-secondary hover:text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}