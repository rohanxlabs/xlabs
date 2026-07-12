"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { easings, durations, springs } from "@/lib/motion-presets"

export function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const isMobile = useMobile()
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      const sections = ["about", "skills", "ai-lab", "grind", "experience", "contact"]
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
    { name: "AI Lab", href: "#ai-lab" },
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
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: easings.smooth }}
      >
        <motion.div 
          className="mx-auto max-w-6xl px-4 sm:px-6 py-4"
          animate={{
            backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
            backgroundColor: isScrolled ? "rgba(15, 18, 24, 0.8)" : "rgba(15, 18, 24, 0)",
            borderRadius: isScrolled ? "9999px" : "0px",
            padding: isScrolled ? "0.5rem 1rem" : "1rem 0",
            boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.3)" : "none",
            border: isScrolled ? "1px solid rgba(34, 197, 94, 0.1)" : "none",
          }}
          transition={{ duration: 0.3, ease: easings.smooth }}
        >
          <nav className="flex items-center justify-between" aria-label="Main navigation">
            <Link 
              href="/" 
              className="font-bold text-xl relative z-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg px-2 py-1"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                Rohan
              </span>
              <span className="text-white">Dev</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`px-4 py-2 text-sm font-medium rounded-full relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    activeSection === item.href.replace("#", "")
                      ? "text-white"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {activeSection === item.href.replace("#", "") && (
                    <motion.div
                      className="absolute inset-0 bg-green-500/10 rounded-full"
                      layoutId="activeBackground"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-full w-10 h-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: durations.quick }}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </nav>
        </motion.div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.quick }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="relative flex flex-col items-center justify-center h-full gap-4 px-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: durations.default, ease: easings.smooth }}
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: durations.quick, delay: i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className={`text-2xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg px-4 py-2 ${
                      activeSection === item.href.replace("#", "")
                        ? "text-green-400"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}