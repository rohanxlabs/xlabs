"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    const handleSectionChange = () => {
      const sections = ["about", "skills", "projects", "grind", "experience", "contact"]
      const scrollPos = window.scrollY + 120

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && element.offsetTop <= scrollPos) {
          setActiveSection(section)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("scroll", handleSectionChange)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", handleSectionChange)
    }
  }, [])

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Grind", href: "#grind" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="relative px-2 py-2 rounded-full glass-strong shadow-lg shadow-black/20">
          {isMobile ? (
            <div className="relative flex items-center justify-between gap-4">
              <Link href="/" className="font-bold text-lg px-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-400 to-phthalo-600">
                  Rohan
                </span>
                <span className="text-white">Dev</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          ) : (
            <div className="relative flex items-center gap-1">
              <Link href="/" className="font-bold text-lg mr-4 px-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-400 to-phthalo-600">
                  Rohan
                </span>
                <span className="text-white">Dev</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    activeSection === item.href.replace("#", "")
                      ? "text-white bg-white/[0.08]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                  onClick={handleNavClick}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-xl transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-8 py-4 text-2xl font-medium rounded-2xl transition-all ${
                  activeSection === item.href.replace("#", "")
                    ? "text-white bg-white/[0.08]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                }`}
                onClick={handleNavClick}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}