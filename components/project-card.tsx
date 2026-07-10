"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  demoUrl?: string
  repoUrl?: string
  studioUrl?: string
  studioName?: string
}

export function ProjectCard({ title, description, tags, image, demoUrl, repoUrl, studioUrl, studioName }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
      className="group h-full"
    >
      <div
        className="card card-hover h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-full flex flex-col">
          <div className="relative overflow-hidden h-56 bg-surface-raised">
            <div className="absolute inset-0 bg-gradient-to-b from-phthalo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className={cn(
                "w-full h-full object-cover transition-transform duration-700",
                isHovered ? "scale-105" : "scale-100"
              )}
            />
          </div>

          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-content-primary group-hover:text-white transition-colors">{title}</h3>
            <p className="text-content-secondary mb-4 text-sm leading-relaxed flex-grow">{description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-white/[0.04] hover:bg-white/[0.08] text-content-secondary border border-white/[0.06]">
                  {tag}
                </Badge>
              ))}
            </div>

            {(repoUrl || studioUrl || demoUrl) && (
              <div className="flex justify-between items-center mt-auto pt-5 border-t border-white/[0.06]">
                {repoUrl ? (
                  <Button variant="ghost" size="sm" className="text-content-secondary hover:text-white hover:bg-white/[0.06] rounded-lg" asChild>
                    <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Link>
                  </Button>
                ) : studioUrl ? (
                  <Button variant="ghost" size="sm" className="text-content-secondary hover:text-white hover:bg-white/[0.06] rounded-lg" asChild>
                    <Link href={studioUrl} target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      {studioName || "Studio"}
                    </Link>
                  </Button>
                ) : demoUrl ? (
                  <div></div>
                ) : null}
                {demoUrl && (
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-500 hover:to-phthalo-700 border-0 rounded-lg shadow-md shadow-phthalo-900/20"
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
            <div
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                isHovered ? "bg-green-500 shadow-lg shadow-green-500/50" : "bg-white/20"
              )}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}