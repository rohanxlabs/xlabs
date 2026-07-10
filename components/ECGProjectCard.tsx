"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Github, HeadphonesIcon } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ECGProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  repoUrl?: string
}

export function ECGProjectCard({ title, description, tags, image, repoUrl }: ECGProjectCardProps) {
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

            <div className="flex justify-between items-center mt-auto pt-5 border-t border-white/[0.06]">
              {repoUrl && (
                <Button variant="ghost" size="sm" className="text-content-secondary hover:text-white hover:bg-white/[0.06] rounded-lg" asChild>
                  <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-500 hover:to-phthalo-700 border-0 rounded-lg shadow-md shadow-phthalo-900/20 ml-auto"
                  >
                    Support
                    <HeadphonesIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-surface-raised border-white/[0.06] text-content-primary custom-scrollbar-phthalo">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-content-primary">ECG Arrhythmia Detector - App Support</DialogTitle>
                    <DialogDescription className="text-content-secondary">
                      Support information and user guide for the ECG monitoring application
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 mt-4">
                    <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
                      <h4 className="text-lg font-semibold mb-2 text-phthalo-400">Contact & Support</h4>
                      <p className="text-content-secondary">
                        <strong className="text-content-primary">App Support:</strong> rohanprajapati7970@gmail.com
                      </p>
                      <p className="text-content-tertiary text-sm mt-1">
                        For questions about ECG Arrhythmia Detector, please contact me directly.
                      </p>
                    </div>

                    <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
                      <h4 className="text-lg font-semibold mb-3 text-phthalo-400">Getting Started</h4>
                      <ul className="text-content-secondary space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span>Ensure your ECG device is properly positioned and moistened</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span>Enable Bluetooth on your device</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span>Open the app and tap "Scan for Devices"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span>Select your ECG device from the list</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span>Allow 40 beats for training, then begin monitoring</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
                      <h4 className="text-lg font-semibold mb-3 text-phthalo-400">Troubleshooting</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-content-primary font-medium text-sm">Device not found?</p>
                          <p className="text-content-tertiary text-sm">Check Bluetooth is enabled and device is on</p>
                        </div>
                        <div>
                          <p className="text-content-primary font-medium text-sm">Poor signal quality?</p>
                          <p className="text-content-tertiary text-sm">Ensure chest strap is moistened and properly positioned</p>
                        </div>
                        <div>
                          <p className="text-content-primary font-medium text-sm">Connection lost?</p>
                          <p className="text-content-tertiary text-sm">App will automatically attempt to reconnect</p>
                        </div>
                        <div>
                          <p className="text-content-primary font-medium text-sm">Training taking too long?</p>
                          <p className="text-content-tertiary text-sm">Ensure stable connection and normal heart rhythm during initial 40 beats</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
                      <h4 className="text-lg font-semibold mb-3 text-phthalo-400">App Features</h4>
                      <ul className="text-content-secondary space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span><strong className="text-content-primary">Real-time ECG:</strong> Live 130Hz streaming from ECG device</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span><strong className="text-content-primary">PVC Detection:</strong> Advanced morphology-based arrhythmia detection</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span><strong className="text-content-primary">Burden Analysis:</strong> 5-minute sliding window PVC burden calculation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span><strong className="text-content-primary">Timeline Navigation:</strong> Review historical ECG data with gesture controls</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span><strong className="text-content-primary">Clinical Visualization:</strong> Medical-grade ECG display with standard scaling</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
                      <h4 className="text-lg font-semibold mb-3 text-phthalo-400">System Requirements</h4>
                      <ul className="text-content-secondary space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span>iOS 13.0 or later</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span>Bluetooth 4.0+ support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span>Compatible ECG chest strap (sold separately)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-phthalo-500 mt-1">•</span>
                          <span>Stable Bluetooth connection for optimal performance</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-2 text-amber-400">Important Medical Disclaimer</h4>
                      <p className="text-content-secondary text-sm leading-relaxed">
                        This app is for <strong className="text-content-primary">research and educational purposes only</strong>. It is not intended for medical diagnosis, treatment, or clinical decision-making.
                        All detected arrhythmias and calculations should be verified by qualified healthcare professionals.
                        Do not rely on this app for emergency cardiac assessment or medical interventions.
                      </p>
                    </div>

                    <div className="text-center pt-4 border-t border-white/[0.06]">
                      <p className="text-content-tertiary text-sm">
                        ECG Arrhythmia Detector v1.0 | Developed by Rohan
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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