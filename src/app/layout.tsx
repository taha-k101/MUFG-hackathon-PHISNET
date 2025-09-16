'use client'

import { Inter } from 'next/font/google'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="en">
      <head>
        <title>PHISNET - AI Threat Detection</title>
        <meta name="description" content="Advanced multi-modal threat detection system for MUFG" />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          
          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            
            {/* Page content */}
            <main className="flex-1 overflow-y-auto">
              <div className="gradient-bg min-h-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
