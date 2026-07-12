import type { Metadata } from 'next'
import { Inter, Dancing_Script } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { CustomCursor } from '@/components/motion/cursor'
import { LoadingExperience } from '@/components/loading-experience'
import { LenisProvider } from '@/hooks/use-lenis'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cursive',
  weight: ['400', '500', '600', '700'],
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
    <html lang="en" className={`${inter.variable} ${dancingScript.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <LoadingExperience />
        <CustomCursor />
        <LenisProvider>
          {children}
        </LenisProvider>
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