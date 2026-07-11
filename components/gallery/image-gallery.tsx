"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight, Expand } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [scale, setScale] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  const close = useCallback(() => {
    setOpen(false)
    setScale(1)
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    setIsFullscreen(false)
  }, [])

  const go = useCallback(
    (dir: number) => {
      setScale(1)
      setIndex((i) => (i + dir + images.length) % images.length)
    },
    [images.length],
  )

  const toggleFullscreen = useCallback(() => {
    const el = lightboxRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }, [])

  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener("fullscreenchange", onFs)
    return () => document.removeEventListener("fullscreenchange", onFs)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowRight") go(1)
      else if (e.key === "ArrowLeft") go(-1)
      else if (e.key === "+") setScale((s) => Math.min(s + 0.25, 3))
      else if (e.key === "-") setScale((s) => Math.max(s - 0.25, 1))
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, go, close])

  const onWheel = (e: React.WheelEvent) => {
    setScale((s) => Math.min(Math.max(s + (e.deltaY < 0 ? 0.15 : -0.15), 1), 3))
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
    touchStartX.current = null
  }

  if (images.length === 0) return null

  return (
    <>
      {/* Thumbnail grid */}
      <div className={images.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2 md:grid-cols-3 gap-3"}>
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => {
              setIndex(i)
              setScale(1)
              setOpen(true)
            }}
            className="group relative overflow-hidden rounded-xl border border-white/[0.08] aspect-video bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-phthalo-500"
            aria-label={`Open image ${i + 1} of ${images.length}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${alt} screenshot ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Expand className="w-6 h-6 text-white" />
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer — ${alt}`}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.12] transition-colors"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  go(-1)
                }}
                className="absolute left-4 z-10 p-2.5 rounded-full bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.12] transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
            )}

            <div
              className="relative max-w-[92vw] max-h-[88vh] flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onWheel={onWheel}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onDoubleClick={() => setScale((s) => (s === 1 ? 2 : 1))}
            >
              <motion.img
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={images[index]}
                alt={`${alt} screenshot ${index + 1}`}
                draggable={false}
                style={{ transform: `scale(${scale})` }}
                className="max-w-[92vw] max-h-[88vh] object-contain rounded-lg select-none transition-transform duration-200"
              />
            </div>

            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  go(1)
                }}
                className="absolute right-4 z-10 p-2.5 rounded-full bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.12] transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            )}

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 border border-white/[0.12] backdrop-blur">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setScale((s) => Math.max(s - 0.25, 1))
                }}
                className="p-1.5 rounded-full hover:bg-white/[0.1] transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4 text-white" />
              </button>
              <span className="text-xs text-white tabular-nums w-10 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setScale((s) => Math.min(s + 0.25, 3))
                }}
                className="p-1.5 rounded-full hover:bg-white/[0.1] transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4 text-white" />
              </button>
              <span className="w-px h-4 bg-white/20 mx-1" />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFullscreen()
                }}
                className="p-1.5 rounded-full hover:bg-white/[0.1] transition-colors"
                aria-label="Toggle fullscreen"
              >
                <Maximize2 className="w-4 h-4 text-white" />
              </button>
              <span className="text-xs text-white/70 ml-1">
                {index + 1} / {images.length}
              </span>
            </div>

            {!isFullscreen && (
              <p className="absolute bottom-4 right-4 z-10 text-[11px] text-white/40">
                ← → navigate · scroll to zoom · double-click · ESC to close
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
