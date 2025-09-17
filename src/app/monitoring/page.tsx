'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ComputerDesktopIcon,
  ServerIcon,
  CloudIcon,
  CpuChipIcon,
  CircleStackIcon,
  WifiIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

const systemComponents = [
  {
    id: 'web-gateway',
    name: 'Web Gateway',
    type: 'gateway',
    status: 'healthy',
    uptime: '99.8%',
    lastCheck: '30 seconds ago',
    metrics: {
      cpu: 23,
      memory: 67,
      requests: '1.2K/min',
      latency: '45ms',
    }
  },
  {
    id: 'text-analyzer',
    name: 'Text Analysis Engine',
    type: 'ai-service',
    status: 'healthy',
    uptime: '99.9%',
    lastCheck: '15 seconds ago',
    metrics: {
      cpu: 78,
      memory: 84,
      processed: '892 emails',
      accuracy: '94.2%',
    }
  },
  {
    id: 'audio-processor',
    name: 'Audio Detection System',
    type: 'ai-service',
    status: 'warning',
    uptime: '98.4%',
    lastCheck: '1 minute ago',
    metrics: {
      cpu: 91,
      memory: 73,
      processed: '234 samples',
      accuracy: '91.7%',
    }
  },
  {
    id: 'video-analyzer',
    name: 'Video Analysis Pipeline',
    type: 'ai-service',
    status: 'healthy',
    uptime: '99.2%',
    lastCheck: '45 seconds ago',
    metrics: {
      cpu: 56,
      memory: 78,
      processed: '121 videos',
      accuracy: '89.5%',
    }
  },
  {
    id: 'database-cluster',
    name: 'Database Cluster',
    type: 'database',
    status: 'healthy',
    uptime: '99.99%',
    lastCheck: '20 seconds ago',
    metrics: {
      cpu: 34,
      memory: 67,
      connections: '245 active',
      storage: '78% used',
    }
  },
  {
    id: 'threat-correlator',
    name: 'Threat Correlation Engine',
    type: 'analytics',
    status: 'critical',
    uptime: '97.2%',
    lastCheck: '2 minutes ago',
    metrics: {
      cpu: 95,
      memory: 89,
      alerts: '23 active',
      backlog: '156 pending',
    }
  },
]

const alerts = [
  {
    id: 1,
    level: 'critical',
    component: 'threat-correlator',
    message: 'High CPU usage detected - correlation engine overloaded',
    timestamp: '2 minutes ago',
    acknowledged: false,
  },
  {
    id: 2,
    level: 'warning',
    component: 'audio-processor',
    message: 'Memory usage approaching threshold (91%)',
    timestamp: '5 minutes ago',
    acknowledged: false,
  },
  {
    id: 3,
    level: 'info',
    component: 'web-gateway',
    message: 'Scheduled maintenance window completed successfully',
    timestamp: '15 minutes ago',
    acknowledged: true,
  },
  {
    id: 4,
    level: 'warning',
    component: 'database-cluster',
    message: 'Slow query detected in threat_logs table',
    timestamp: '1 hour ago',
    acknowledged: true,
  },
]

function SystemCard({ component }: { component: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-700 border-green-200'
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'critical': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircleIcon
      case 'warning': return ExclamationTriangleIcon
      case 'critical': return XCircleIcon
      default: return CheckCircleIcon
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'gateway': return WifiIcon
      case 'ai-service': return CpuChipIcon
      case 'database': return CircleStackIcon
      case 'analytics': return ChartBarIcon
      default: return ServerIcon
    }
  }

  const StatusIcon = getStatusIcon(component.status)
  const TypeIcon = getTypeIcon(component.type)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <TypeIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{component.name}</h3>
            <p className="text-sm text-gray-600 capitalize">{component.type.replace('-', ' ')}</p>
          </div>
        </div>
        
        <div className={cn("inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border", getStatusColor(component.status))}>
          <StatusIcon className="w-4 h-4 mr-1" />
          {component.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(component.metrics).map(([key, value]) => (
          <div key={key} className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </p>
            <p className="text-lg font-bold text-gray-900">{String(value)}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <ClockIcon className="w-4 h-4" />
          <span>Last check: {component.lastCheck}</span>
        </div>
        <span>Uptime: {component.uptime}</span>
      </div>
    </motion.div>
  )
}

function AlertCard({ alert }: { alert: any }) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-50 border-red-200'
      case 'warning': return 'bg-yellow-50 border-yellow-200'
      case 'info': return 'bg-blue-50 border-blue-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'critical': return XCircleIcon
      case 'warning': return ExclamationTriangleIcon
      case 'info': return CheckCircleIcon
      default: return CheckCircleIcon
    }
  }

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-700'
      case 'warning': return 'bg-yellow-100 text-yellow-700'
      case 'info': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const LevelIcon = getLevelIcon(alert.level)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("rounded-lg border p-4", getLevelColor(alert.level), alert.acknowledged && "opacity-60")}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <LevelIcon className="w-5 h-5 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className={cn("inline-flex items-center px-2 py-1 rounded-full text-xs font-medium", getLevelBadgeColor(alert.level))}>
                {alert.level.toUpperCase()}
              </span>
              <span className="text-sm text-gray-600">{alert.component}</span>
            </div>
            <p className="text-gray-900 font-medium">{alert.message}</p>
            <p className="text-sm text-gray-600 mt-1">{alert.timestamp}</p>
          </div>
        </div>
        
        {!alert.acknowledged && (
          <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Acknowledge
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function MonitoringPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const healthyCount = systemComponents.filter(c => c.status === 'healthy').length
  const warningCount = systemComponents.filter(c => c.status === 'warning').length
  const criticalCount = systemComponents.filter(c => c.status === 'critical').length
  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged).length

  if (!mounted) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>
            <p className="text-gray-600 mt-1">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>
          <p className="text-gray-600 mt-1">Real-time monitoring of PHISNET infrastructure and services</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Live Monitoring</span>
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Healthy</p>
              <p className="text-2xl font-bold text-gray-900">{healthyCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Warning</p>
              <p className="text-2xl font-bold text-gray-900">{warningCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-gray-900">{criticalCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ServerIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Systems</p>
              <p className="text-2xl font-bold text-gray-900">{systemComponents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Active Alerts ({unacknowledgedAlerts})
          </h2>
          <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View All Alerts
          </button>
        </div>
        
        <div className="space-y-3">
          {alerts.filter(a => !a.acknowledged).map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
          
          {unacknowledgedAlerts === 0 && (
            <div className="text-center py-8">
              <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">All Clear!</h3>
              <p className="text-gray-600">No active alerts at this time.</p>
            </div>
          )}
        </div>
      </div>

      {/* System Components */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">System Components</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {systemComponents.map(component => (
            <SystemCard key={component.id} component={component} />
          ))}
        </div>
      </div>
    </div>
  )
}