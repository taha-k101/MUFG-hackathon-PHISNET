'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HomeIcon,
  ShieldCheckIcon,
  DocumentMagnifyingGlassIcon,
  ChartBarIcon,
  CloudArrowUpIcon,
  CogIcon,
  BellIcon,
  BeakerIcon,
  EyeIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, description: 'Overview & real-time monitoring' },
  { name: 'Threat Detection', href: '/threats', icon: ShieldCheckIcon, description: 'Live threat analysis' },
  { name: 'Upload & Classify', href: '/upload', icon: CloudArrowUpIcon, description: 'Multi-modal file analysis' },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon, description: 'Advanced reporting' },
  { name: 'Reports', href: '/reports', icon: DocumentMagnifyingGlassIcon, description: 'Detailed insights' },
  { name: 'Monitoring', href: '/monitoring', icon: EyeIcon, description: 'System health' },
  { name: 'Green IT', href: '/green-it', icon: BeakerIcon, description: 'Sustainability metrics' },
  { name: 'Settings', href: '/settings', icon: CogIcon, description: 'Configuration' },
]

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : -300,
          opacity: isOpen ? 1 : 0.8,
        }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl border-r border-gray-200",
          "lg:relative lg:opacity-100 lg:translate-x-0 lg:shadow-none",
          "flex flex-col overflow-hidden"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">PHISNET</h1>
              <p className="text-blue-100 text-sm">Threat Detection AI</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                  "hover:bg-gray-50 hover:scale-[1.02] hover:shadow-sm",
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                    : "text-gray-700 hover:text-gray-900"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 mr-3 transition-colors",
                    isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-600">
                    {item.description}
                  </div>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3 px-4 py-3 bg-white rounded-lg border">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-subtle"></div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">System Active</div>
              <div className="text-xs text-gray-500">All services operational</div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}