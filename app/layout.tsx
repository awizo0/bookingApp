import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Mono } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import ThemeToggle from '@/components/theme-toggle'

const _inter = Inter({ subsets: ['latin', 'latin-ext'] })
const _spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Luxe Hotels - Premium Booking',
  description: 'Book your perfect hotel room with our multi-step reservation system. Choose from standard, premium, and apartment rooms.',
}

export const viewport: Viewport = {
  themeColor: '#2563eb',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="min-h-screen">
            <header className="w-full border-b py-2 px-4 flex justify-end">
              <ThemeToggle />
            </header>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
