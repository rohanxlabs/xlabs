"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useReducedMotion } from "framer-motion"

interface LoadingScreenProps {
  onComplete?: () => void
}

/** Full-screen loading overlay that disappears on mount. */
export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (reduce) {
      setVisible(false)
      onComplete?.()
      return
    }

    const timer = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, 800)

    return () => clearTimeout(timer)
  }, [reduce, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="w-16 h-16 border-2 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}