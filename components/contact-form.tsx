"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

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

      const responseData = await response.json()

      if (response.ok) {
        if (formRef.current) {
          formRef.current.reset()
        }

        toast.success("Message sent successfully!", {
          description: "Thanks for reaching out. I'll get back to you soon.",
        })
      } else {
        throw new Error(`Server error: ${responseData.message || 'Unknown error'}`)
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
    >
      <div className="card card-hover p-6 md:p-8">
        <div className="relative">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2 text-content-primary">Send Me a Message</h3>
            <p className="text-content-secondary text-sm">Fill out the form below and I'll get back to you.</p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-content-secondary">Name</label>
              <Input
                id="name"
                name="name"
                placeholder="Your Name"
                required
                className="bg-surface-input border-white/[0.06] focus:border-phthalo-500 focus:ring-phthalo-500/20 text-content-primary placeholder:text-content-tertiary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-content-secondary">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="bg-surface-input border-white/[0.06] focus:border-phthalo-500 focus:ring-phthalo-500/20 text-content-primary placeholder:text-content-tertiary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-content-secondary">Subject</label>
              <Input
                id="subject"
                name="subject"
                placeholder="Subject"
                required
                className="bg-surface-input border-white/[0.06] focus:border-phthalo-500 focus:ring-phthalo-500/20 text-content-primary placeholder:text-content-tertiary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-content-secondary">Message</label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                className="bg-surface-input border-white/[0.06] focus:border-phthalo-500 focus:ring-phthalo-500/20 text-content-primary placeholder:text-content-tertiary resize-none"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-500 hover:to-phthalo-700 border-0 rounded-lg shadow-lg shadow-phthalo-900/20 hover:shadow-xl hover:shadow-phthalo-900/30 transition-all"
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
          </form>
        </div>
      </div>
    </motion.div>
  )
}
