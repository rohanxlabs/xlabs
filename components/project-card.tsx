"use client"

import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { easings, durations, springs } from "@/lib/motion-presets"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  demoUrl?: string
  repoUrl?: string
}

export function ProjectCard({ title, description, tags, image, demoUrl, repoUrl }: ProjectCardProps) {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: durations.slow, ease: easings.smooth }
    },
    hover: prefersReducedMotion ? {} : {
      y: -8,
      rotateX: 1,
      rotateY: -1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    }
  }

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      variants={cardVariants}
      viewport={{ once: true, margin: "-40px" }}
      className="group h-full relative"
    >
      <div className="relative h-full flex flex-col bg-surface-raised rounded-2xl overflow-hidden border border-white/[0.06] transition-all duration-500 group-hover:border-green-500/30 group-hover:shadow-2xl group-hover:shadow-green-500/10">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>
        
        <div className="relative overflow-hidden h-56">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <motion.img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            transition={{ duration: 0.7, ease: easings.smooth }}
          />
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <motion.h3
            className="text-xl font-bold mb-3 text-content-primary group-hover:text-white transition-colors duration-300"
          >
            {title}
          </motion.h3>
          <p className="text-content-secondary mb-6 text-sm leading-relaxed flex-grow line-clamp-3">{description}</p>

          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
          >
            {tags.map((tag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: durations.quick, ease: easings.smooth }}
              >
                <Badge variant="secondary" className="bg-white/[0.04] text-content-secondary border border-white/[0.06] group-hover:border-green-500/30 group-hover:text-green-400 transition-all duration-300">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {(repoUrl || demoUrl) && (
            <div className="flex justify-between items-center mt-auto pt-5 border-t border-white/[0.06]">
              {repoUrl && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-content-secondary hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500" 
                  asChild
                >
                  <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
              )}
              {demoUrl && (
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-600 to-emerald-700 border-0 rounded-lg shadow-md shadow-green-900/20 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  asChild
                >
                  <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 z-20">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-green-500 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all duration-500"></div>
        </div>
      </div>
    </motion.article>
  )
}