"use client"

import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { easings, durations, springs, cardHover, card3DTilt } from "@/lib/motion-presets"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  demoUrl?: string
  repoUrl?: string
}

export function ProjectCard({ title, description, tags, image, demoUrl, repoUrl }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: durations.slow, ease: easings.smooth }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover="hover"
      variants={cardHover}
      className="group h-full"
    >
      <div className="card card-hover h-full [transform-style:preserve-3d]">
        <div className="relative h-full flex flex-col">
          <motion.div
            className="relative overflow-hidden h-56 bg-surface-raised"
            variants={card3DTilt}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-phthalo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              transition={{ duration: durations.quick }}
            />
            <motion.img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover"
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: easings.smooth }}
            />
          </motion.div>

          <div className="p-6 flex-grow flex flex-col">
            <motion.h3
              className="text-xl font-bold mb-2 text-content-primary group-hover:text-white transition-colors"
              whileHover={{ x: 2 }}
              transition={{ duration: durations.quick }}
            >
              {title}
            </motion.h3>
            <p className="text-content-secondary mb-4 text-sm leading-relaxed flex-grow">{description}</p>

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
                  <Badge variant="secondary" className="bg-white/[0.04] text-content-secondary border border-white/[0.06]">
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {(repoUrl || demoUrl) && (
              <div className="flex justify-between items-center mt-auto pt-5 border-t border-white/[0.06]">
                {repoUrl && (
                  <Button variant="ghost" size="sm" className="text-content-secondary hover:text-white hover:bg-white/[0.06] rounded-lg" asChild>
                    <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Link>
                  </Button>
                )}
                {demoUrl && (
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-phthalo-600 to-phthalo-800 border-0 rounded-lg shadow-md shadow-phthalo-900/20"
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
            <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-green-500 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}