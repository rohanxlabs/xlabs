import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Rohan - AI/ML Engineer | Autonomous Robotics Systems',
  description: 'Portfolio of Rohan - AI/ML Engineer, GenAI Engineer, and AI Engineer specializing in AI/ML, Agentic AI, and intelligent robotics automation.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: 'rgba(39, 39, 42, 0.95)',
              border: '1px solid rgba(63, 63, 70, 0.5)',
              color: 'white',
            },
          }}
        />
      </body>
    </html>
  )
}
