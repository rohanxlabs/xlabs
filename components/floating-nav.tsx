"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { easings, durations, springs } from "@/lib/motion-presets"

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const isMobile = useMobile()
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

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
    return () => window.removeEventListener("scroll", handleScroll)
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
      <AnimatePresence>
        <motion.div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300`}
          initial={{ opacity: 0, y: -16 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : -16,
            pointerEvents: isVisible ? "auto" : "none"
          }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: durations.quick, ease: easings.smooth }}
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
                  className="text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-lg w-10 h-10"
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
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: durations.quick, delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all relative ${
                        activeSection === item.href.replace("#", "")
                          ? "text-white bg-white/[0.08]"
                          : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                      }`}
                      onClick={handleNavClick}
                    >
                      {item.name}
                      {activeSection === item.href.replace("#", "") && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-phthalo-500"
                          layoutId="nav-indicator"
                          transition={{ duration: durations.quick }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobile && (
          <motion.div
            className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-xl`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.quick }}
            aria-hidden={!isOpen}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                  transition={{ duration: durations.default, delay: i * 0.05 }}
                >
                  <Link
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}