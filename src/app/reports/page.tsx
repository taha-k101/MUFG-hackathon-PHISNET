'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  DocumentTextIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  CalendarIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  ClockIcon,
  TagIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

const reportTypes = [
  { id: 'threat-summary', name: 'Threat Summary', description: 'Weekly threat detection summary' },
  { id: 'phishing-analysis', name: 'Phishing Analysis', description: 'Detailed phishing attempt analysis' },
  { id: 'deepfake-detection', name: 'Deepfake Detection', description: 'Audio/video manipulation reports' },
  { id: 'green-it', name: 'Green IT Report', description: 'Environmental impact and efficiency' },
  { id: 'compliance', name: 'Compliance Report', description: 'Regulatory compliance status' },
  { id: 'performance', name: 'Performance Metrics', description: 'System performance and accuracy' },
]

const mockReports = [
  {
    id: 1,
    title: 'Weekly Threat Detection Summary',
    type: 'threat-summary',
    description: 'Comprehensive analysis of all detected threats from December 16-22, 2024',
    createdAt: '2024-12-22T10:30:00Z',
    createdBy: 'Security Team',
    size: '2.4 MB',
    format: 'PDF',
    tags: ['weekly', 'threats', 'summary'],
    stats: {
      threatsDetected: 1247,
      phishingAttempts: 892,
      deepfakesFound: 234,
      blockedAttacks: 1156,
    }
  },
  {
    id: 2,
    title: 'Phishing Campaign Analysis - Q4 2024',
    type: 'phishing-analysis',
    description: 'Deep dive into sophisticated phishing campaigns targeting MUFG customers',
    createdAt: '2024-12-20T14:15:00Z',
    createdBy: 'Threat Intelligence',
    size: '5.1 MB',
    format: 'PDF',
    tags: ['phishing', 'quarterly', 'intelligence'],
    stats: {
      campaignsIdentified: 23,
      affectedCustomers: 0,
      blockedEmails: 15670,
      avgConfidence: 94.2,
    }
  },
  {
    id: 3,
    title: 'Deepfake Detection Monthly Report',
    type: 'deepfake-detection',
    description: 'Audio and video manipulation detection statistics for December 2024',
    createdAt: '2024-12-19T09:45:00Z',
    createdBy: 'AI Research Team',
    size: '3.8 MB',
    format: 'PDF',
    tags: ['deepfake', 'monthly', 'ai'],
    stats: {
      audioSamples: 12456,
      videoSamples: 3421,
      manipulationRate: 2.3,
      accuracy: 91.7,
    }
  },
  {
    id: 4,
    title: 'Green IT Impact Assessment',
    type: 'green-it',
    description: 'Environmental impact and energy efficiency metrics for AI systems',
    createdAt: '2024-12-18T16:20:00Z',
    createdBy: 'Sustainability Team',
    size: '1.9 MB',
    format: 'PDF',
    tags: ['green-it', 'sustainability', 'environment'],
    stats: {
      energySaved: '12.4 kWh',
      co2Reduced: '5.8 kg',
      efficiency: '94.2%',
      carbonFootprint: '145 kg CO₂',
    }
  },
  {
    id: 5,
    title: 'Compliance Audit Report - 2024',
    type: 'compliance',
    description: 'Annual compliance assessment for regulatory requirements',
    createdAt: '2024-12-15T11:30:00Z',
    createdBy: 'Compliance Officer',
    size: '4.2 MB',
    format: 'PDF',
    tags: ['compliance', 'annual', 'audit'],
    stats: {
      checksPassed: 127,
      issues: 3,
      compliance: '97.6%',
      recommendations: 8,
    }
  },
]

function ReportCard({ report }: { report: any }) {
  const [expanded, setExpanded] = useState(false)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'threat-summary': return ChartBarIcon
      case 'phishing-analysis': return DocumentTextIcon
      case 'deepfake-detection': return EyeIcon
      case 'green-it': return TagIcon
      case 'compliance': return DocumentChartBarIcon
      case 'performance': return ChartBarIcon
      default: return DocumentTextIcon
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'threat-summary': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
      case 'phishing-analysis': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      case 'deepfake-detection': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
      case 'green-it': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      case 'compliance': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'performance': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const TypeIcon = getTypeIcon(report.type)
  const reportType = reportTypes.find(rt => rt.id === report.type)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", getTypeColor(report.type))}>
            <TypeIcon className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{report.title}</h3>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">{report.size}</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {report.format}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-3">{report.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>by {report.createdBy}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {report.tags.map((tag: string) => (
                <span 
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <ArrowDownTrayIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
        >
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Key Metrics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(report.stats).map(([key, value]) => (
              <div key={key} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <p className="text-xs text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{String(value)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredReports = mockReports.filter(report => {
    const matchesType = selectedType === 'all' || report.type === selectedType
    const matchesSearch = searchQuery === '' || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesType && matchesSearch
  })

  if (!mounted) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Loading...</p>
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Reports</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Generated reports and analytics for threat detection systems</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <DocumentChartBarIcon className="w-5 h-5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map(type => {
          const TypeIcon = type.id === 'threat-summary' ? ChartBarIcon :
                          type.id === 'phishing-analysis' ? DocumentTextIcon :
                          type.id === 'deepfake-detection' ? EyeIcon :
                          type.id === 'green-it' ? TagIcon :
                          type.id === 'compliance' ? DocumentChartBarIcon :
                          ChartBarIcon

          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedType(selectedType === type.id ? 'all' : type.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <TypeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{type.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Report Types</option>
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Available Reports ({filteredReports.length})
          </h2>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {selectedType !== 'all' && reportTypes.find(t => t.id === selectedType)?.name}
            </span>
          </div>
        </div>

        {filteredReports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}

        {filteredReports.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
            <DocumentChartBarIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reports found</h3>
            <p className="text-gray-600 dark:text-gray-400">No reports match your current filters. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}