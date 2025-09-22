'use client'

import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { ThemeProvider } from '@/contexts/ThemeContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true) // Default to true for desktop
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // On mobile, close sidebar by default
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }
    
    // Set initial state
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>PHISNET - AI Threat Detection</title>
        <meta name="description" content="Advanced multi-modal threat detection system for MUFG" />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 transition-colors duration-200`} suppressHydrationWarning={true}>
        <ThemeProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            {mounted && (
              <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            )}
            
            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {mounted && (
                <Header onMenuClick={() => setSidebarOpen(true)} />
              )}
              
              {/* Page content */}
              <main className="flex-1 overflow-y-auto">
                <div className="gradient-bg dark:gradient-bg-dark min-h-full">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
