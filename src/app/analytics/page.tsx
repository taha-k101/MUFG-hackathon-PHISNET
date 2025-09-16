'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ChartBarIcon,
  FunnelIcon,
  CalendarDaysIcon,
  ArrowDownTrayIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  EyeIcon,
  DocumentTextIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import { cn, formatNumber } from '@/lib/utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement
)

const timeRangeOptions = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'Last year', value: '1y' },
]

const filterOptions = [
  { label: 'All Types', value: 'all' },
  { label: 'Text/Email', value: 'text' },
  { label: 'Audio', value: 'audio' },
  { label: 'Video', value: 'video' },
  { label: 'Images', value: 'image' },
]

function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend = 'up',
  color = 'blue' 
}: {
  title: string
  value: string | number
  change: string
  icon: any
  trend?: 'up' | 'down'
  color?: 'blue' | 'red' | 'green' | 'yellow'
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className={cn(
            'text-sm mt-1 flex items-center',
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          )}>
            <span className={trend === 'up' ? '↗️' : '↘️'}></span>
            <span className="ml-1">{change} from last period</span>
          </p>
        </div>
        <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', colorClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  )
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)

  // Mock data - in real app this would come from API
  const mockData = {
    overview: {
      totalFiles: 12547,
      threatDetections: 342,
      accuracyRate: 94.7,
      reviewRequired: 89,
    },
    threatsByType: {
      labels: ['High Risk', 'Medium Risk', 'Low Risk', 'Review Required'],
      datasets: [{
        data: [342, 156, 8934, 89],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'],
        borderWidth: 0,
      }]
    },
    trendsData: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Files Processed',
          data: [2840, 3200, 2950, 3557],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Threats Detected',
          data: [89, 102, 76, 75],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
        }
      ]
    },
    fileTypes: {
      labels: ['Text/Email', 'Audio', 'Video', 'Images'],
      datasets: [{
        label: 'Files Processed',
        data: [5623, 2341, 3012, 1571],
        backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
        borderRadius: 8,
      }]
    },
    topThreats: [
      { name: 'Phishing Emails', count: 156, change: '+12%' },
      { name: 'Malicious Audio', count: 89, change: '+8%' },
      { name: 'Deepfake Videos', count: 67, change: '+23%' },
      { name: 'Suspicious Images', count: 30, change: '-5%' },
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  const exportData = () => {
    setLoading(true)
    // Simulate export
    setTimeout(() => {
      setLoading(false)
      // In real app, this would trigger a download
      alert('Report exported successfully!')
    }, 2000)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Comprehensive threat detection insights and trends</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Filter Selector */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Export Button */}
          <button
            onClick={exportData}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            {loading ? 'Exporting...' : 'Export Report'}
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Files Processed"
          value={formatNumber(mockData.overview.totalFiles)}
          change="+12.5%"
          icon={DocumentTextIcon}
          color="blue"
        />
        <StatCard
          title="Threats Detected"
          value={mockData.overview.threatDetections}
          change="+8.3%"
          icon={ExclamationTriangleIcon}
          color="red"
        />
        <StatCard
          title="Accuracy Rate"
          value={`${mockData.overview.accuracyRate}%`}
          change="+2.1%"
          icon={ShieldCheckIcon}
          color="green"
        />
        <StatCard
          title="Review Required"
          value={mockData.overview.reviewRequired}
          change="-5.2%"
          icon={EyeIcon}
          color="yellow"
          trend="down"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Distribution</h3>
          <div className="h-64">
            <Doughnut data={mockData.threatsByType} options={doughnutOptions} />
          </div>
        </div>

        {/* Trends Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Trends</h3>
          <div className="h-64">
            <Line data={mockData.trendsData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* File Types and Top Threats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Types Processed */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Files by Type</h3>
          <div className="h-64">
            <Bar data={mockData.fileTypes} options={chartOptions} />
          </div>
        </div>

        {/* Top Threats */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Threat Categories</h3>
          <div className="space-y-4">
            {mockData.topThreats.map((threat, index) => (
              <div key={threat.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-red-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{threat.name}</p>
                    <p className="text-sm text-gray-500">{threat.count} detections</p>
                  </div>
                </div>
                <span className={cn(
                  'text-sm font-medium',
                  threat.change.startsWith('+') ? 'text-red-600' : 'text-green-600'
                )}>
                  {threat.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analysis Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Analysis Results</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Analyzed
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: 'suspicious_email.eml', type: 'text', risk: 'HIGH_RISK', confidence: 94, time: '2 min ago' },
                { name: 'audio_sample.mp3', type: 'audio', risk: 'REVIEW', confidence: 67, time: '5 min ago' },
                { name: 'corporate_video.mp4', type: 'video', risk: 'LOW_RISK', confidence: 89, time: '8 min ago' },
                { name: 'profile_image.jpg', type: 'image', risk: 'LOW_RISK', confidence: 92, time: '12 min ago' },
                { name: 'phishing_attempt.txt', type: 'text', risk: 'HIGH_RISK', confidence: 98, time: '15 min ago' },
              ].map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        {item.type === 'text' && <DocumentTextIcon className="h-5 w-5 text-blue-500" />}
                        {item.type === 'audio' && <SpeakerWaveIcon className="h-5 w-5 text-purple-500" />}
                        {item.type === 'video' && <VideoCameraIcon className="h-5 w-5 text-green-500" />}
                        {item.type === 'image' && <PhotoIcon className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      item.risk === 'HIGH_RISK' && 'bg-red-100 text-red-800',
                      item.risk === 'REVIEW' && 'bg-yellow-100 text-yellow-800',
                      item.risk === 'LOW_RISK' && 'bg-green-100 text-green-800'
                    )}>
                      {item.risk.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.confidence}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}