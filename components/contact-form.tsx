"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { easings, durations, staggers } from "@/lib/motion-presets"

const formContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggers.fast,
      delayChildren: 0.1,
    },
  },
}

const formField = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.slow, ease: easings.smooth } },
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        formRef.current?.reset()
        toast.success("Message sent successfully!", {
          description: "Thanks for reaching out. I'll get back to you soon.",
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Fetch error:', error)
      toast.error("Failed to send message", {
        description: "Please try again or contact me directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: durations.slow, ease: easings.smooth }}
      viewport={{ once: true, margin: "-40px" }}
    >
      <div className="card card-hover p-6 md:p-8">
        <div className="relative">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.slow, ease: easings.smooth }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-2 text-content-primary">Send Me a Message</h3>
            <p className="text-content-secondary text-sm">Fill out the form below and I'll get back to you.</p>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={formContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={formField} className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-content-secondary">Name</label>
              <Input
                id="name"
                name="name"
                placeholder="Your Name"
                required
                className="bg-surface-input border-white/[0.06] focus:border-phthalo-500 focus:ring-phthalo-500/20 text-content-primary placeholder:text-content-tertiary"
              />
            </motion.div>
            <motion.div variants={formField} className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-content-secondary">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="bg-surface-input border-white/[0.06] focus:border-phthalo-500 focus:ring-phthalo-500/20 text-content-primary placeholder:text-content-tertiary"
              />
            </motion.div>
            <motion.div variants={formField} className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-content-secondary">Subject</label>
              <Input
                id="subject"
                name="subject"
                placeholder="Subject"
                required
                className="bg-surface-input border-white/[0.06] focus:border-phthalo-500 focus:ring-phthalo-500/20 text-content-primary placeholder:text-content-tertiary"
              />
            </motion.div>
            <motion.div variants={formField} className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-content-secondary">Message</label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                className="bg-surface-input border-white/[0.06] focus:border-phthalo-500 focus:ring-phthalo-500/20 text-content-primary placeholder:text-content-tertiary resize-none"
              />
            </motion.div>
            <motion.div variants={formField}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-phthalo-600 to-phthalo-800 border-0 rounded-lg shadow-lg shadow-phthalo-900/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </motion.div>
  )
}