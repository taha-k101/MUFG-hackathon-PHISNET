'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  ChartBarIcon,
  ClockIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import { cn, formatNumber, getRiskColor, getRiskIcon } from '@/lib/utils'

// Mock data - in real app, this would come from your API
const generateMockData = () => ({
  threats: {
    total: 1247,
    high: 23,
    medium: 156,
    low: 1068,
    blocked: 234,
  },
  realtimeActivity: [
    { id: 1, type: 'email', content: 'Phishing attempt from suspicious@fake-bank.com', risk: 'HIGH_RISK', timestamp: '2 min ago', blocked: true },
    { id: 2, type: 'audio', content: 'Deepfake audio detected in voice message', risk: 'REVIEW', timestamp: '5 min ago', blocked: false },
    { id: 3, type: 'email', content: 'Suspicious link detected in internal email', risk: 'REVIEW', timestamp: '8 min ago', blocked: true },
    { id: 4, type: 'video', content: 'Deepfake video analysis completed', risk: 'LOW_RISK', timestamp: '12 min ago', blocked: false },
    { id: 5, type: 'email', content: 'Brand spoofing attempt blocked', risk: 'HIGH_RISK', timestamp: '15 min ago', blocked: true },
  ],
  systemStats: {
    uptime: '99.9%',
    processedToday: 15420,
    avgResponseTime: '0.3s',
    accuracy: '97.8%',
  },
})

function StatCard({ title, value, icon: Icon, trend, description, className }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-white rounded-xl p-6 shadow-sm border cyber-border", className)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
            trend > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          )}>
            {trend > 0 ? "↗" : "↘"} {Math.abs(trend)}%
          </span>
          <span className="text-gray-500 ml-2">vs last week</span>
        </div>
      )}
    </motion.div>
  )
}

function ThreatActivityFeed({ activities }: { activities: any[] }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return DocumentTextIcon
      case 'audio': return SpeakerWaveIcon
      case 'video': return VideoCameraIcon
      default: return DocumentTextIcon
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-700'
      case 'audio': return 'bg-purple-100 text-purple-700'
      case 'video': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border cyber-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Real-time Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getTypeIcon(activity.type)
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", getTypeColor(activity.type))}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className={cn(
                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
                    getRiskColor(activity.risk)
                  )}>
                    {getRiskIcon(activity.risk)} {activity.risk.replace('_', ' ')}
                  </span>
                  {activity.blocked && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                      🚫 Blocked
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-900 mt-1 font-medium">{activity.content}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  {activity.timestamp}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [data, setData] = useState(generateMockData())
  const [isLive, setIsLive] = useState(true)

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        threats: {
          ...prevData.threats,
          total: prevData.threats.total + Math.floor(Math.random() * 3),
        },
        systemStats: {
          ...prevData.systemStats,
          processedToday: prevData.systemStats.processedToday + Math.floor(Math.random() * 10),
        }
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [isLive])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Threat Detection Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time monitoring and analysis</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsLive(!isLive)}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors",
              isLive 
                ? "bg-green-100 text-green-700 border border-green-200" 
                : "bg-gray-100 text-gray-700 border border-gray-200"
            )}
          >
            <div className={cn("w-2 h-2 rounded-full", isLive ? "bg-green-500 animate-pulse-subtle" : "bg-gray-400")} />
            <span>{isLive ? "Live" : "Paused"}</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <EyeIcon className="w-4 h-4" />
            <span>Full Report</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Threats Detected"
          value={formatNumber(data.threats.total)}
          icon={ShieldCheckIcon}
          trend={5.2}
          description="Last 24 hours"
        />
        <StatCard
          title="High Risk Threats"
          value={data.threats.high}
          icon={ExclamationTriangleIcon}
          trend={-12.3}
          description="Immediate attention required"
          className="border-red-200 shadow-red-100/50"
        />
        <StatCard
          title="Files Processed Today"
          value={formatNumber(data.systemStats.processedToday)}
          icon={ChartBarIcon}
          trend={8.1}
          description="All modalities"
        />
        <StatCard
          title="System Accuracy"
          value={data.systemStats.accuracy}
          icon={ShieldCheckIcon}
          trend={0.3}
          description="ML model performance"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Activity Feed */}
        <div className="lg:col-span-2">
          <ThreatActivityFeed activities={data.realtimeActivity} />
        </div>

        {/* System Overview */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border cyber-border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm font-medium text-green-600">{data.systemStats.uptime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg Response Time</span>
                <span className="text-sm font-medium text-blue-600">{data.systemStats.avgResponseTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Monitors</span>
                <span className="text-sm font-medium text-gray-900">12</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border cyber-border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Phishing</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Audio Deepfakes</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-1/5 h-full bg-purple-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">20%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Video Deepfakes</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-1/20 h-full bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
