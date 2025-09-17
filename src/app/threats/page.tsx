'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  EyeIcon,
  ClockIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { cn, formatNumber, getRiskColor, getRiskIcon } from '@/lib/utils'

const threatTypes = [
  { id: 'all', name: 'All Threats', count: 1247 },
  { id: 'phishing', name: 'Phishing', count: 892 },
  { id: 'deepfake', name: 'Deepfakes', count: 234 },
  { id: 'malware', name: 'Malware', count: 121 },
]

const modalityFilters = [
  { id: 'all', name: 'All Modalities', icon: ShieldCheckIcon },
  { id: 'text', name: 'Text/Email', icon: DocumentTextIcon },
  { id: 'audio', name: 'Audio', icon: SpeakerWaveIcon },
  { id: 'video', name: 'Video', icon: VideoCameraIcon },
]

const mockThreats = [
  {
    id: 1,
    type: 'phishing',
    modality: 'text',
    title: 'Suspicious Banking Email',
    description: 'Phishing attempt targeting MUFG customers with fake login page',
    risk: 'HIGH_RISK',
    confidence: 94,
    timestamp: '2 minutes ago',
    source: 'Email Gateway',
    blocked: true,
    details: {
      urls: ['fake-mufg-login.com', 'phishing-site.net'],
      indicators: ['Brand spoofing', 'Suspicious URLs', 'Credential harvesting'],
    }
  },
  {
    id: 2,
    type: 'deepfake',
    modality: 'audio',
    title: 'Voice Cloning Attempt',
    description: 'Deepfake audio detected in customer service call',
    risk: 'REVIEW',
    confidence: 78,
    timestamp: '5 minutes ago',
    source: 'Voice Analysis System',
    blocked: false,
    details: {
      duration: '2:34',
      indicators: ['Unnatural speech patterns', 'Audio inconsistencies'],
    }
  },
  {
    id: 3,
    type: 'phishing',
    modality: 'text',
    title: 'Internal Email Threat',
    description: 'Suspicious link detected in internal communication',
    risk: 'REVIEW',
    confidence: 67,
    timestamp: '8 minutes ago',
    source: 'Internal Scanner',
    blocked: true,
    details: {
      urls: ['malicious-site.org'],
      indicators: ['URL reputation', 'Content analysis'],
    }
  },
  {
    id: 4,
    type: 'deepfake',
    modality: 'video',
    title: 'Video Manipulation',
    description: 'Deepfake video analysis completed - executive impersonation',
    risk: 'LOW_RISK',
    confidence: 45,
    timestamp: '12 minutes ago',
    source: 'Video Analysis Engine',
    blocked: false,
    details: {
      duration: '0:45',
      indicators: ['Face swap detection', 'Temporal inconsistencies'],
    }
  },
  {
    id: 5,
    type: 'phishing',
    modality: 'text',
    title: 'Brand Spoofing',
    description: 'Fake MUFG website attempting credential theft',
    risk: 'HIGH_RISK',
    confidence: 96,
    timestamp: '15 minutes ago',
    source: 'Web Crawler',
    blocked: true,
    details: {
      urls: ['mufg-secure.fake.com'],
      indicators: ['Domain spoofing', 'SSL certificate fraud', 'Content theft'],
    }
  },
]

function ThreatCard({ threat }: { threat: any }) {
  const [expanded, setExpanded] = useState(false)

  const getModalityIcon = (modality: string) => {
    switch (modality) {
      case 'text': return DocumentTextIcon
      case 'audio': return SpeakerWaveIcon
      case 'video': return VideoCameraIcon
      default: return ShieldCheckIcon
    }
  }

  const getModalityColor = (modality: string) => {
    switch (modality) {
      case 'text': return 'bg-blue-100 text-blue-700'
      case 'audio': return 'bg-purple-100 text-purple-700'
      case 'video': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const ModalityIcon = getModalityIcon(threat.modality)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", getModalityColor(threat.modality))}>
            <ModalityIcon className="w-5 h-5" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{threat.title}</h3>
              <span className={cn(
                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
                getRiskColor(threat.risk)
              )}>
                {getRiskIcon(threat.risk)} {threat.risk.replace('_', ' ')}
              </span>
              {threat.blocked && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                  🚫 Blocked
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-3">{threat.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <ClockIcon className="w-4 h-4" />
                <span>{threat.timestamp}</span>
              </div>
              <div className="flex items-center space-x-1">
                <EyeIcon className="w-4 h-4" />
                <span>{threat.source}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Confidence: {threat.confidence}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronDownIcon className={cn("w-5 h-5 transition-transform", expanded && "transform rotate-180")} />
        </button>
      </div>
      
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {threat.details.urls && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Suspicious URLs</h4>
                <ul className="space-y-1">
                  {threat.details.urls.map((url: string, index: number) => (
                    <li key={index} className="text-sm text-red-600 font-mono bg-red-50 px-2 py-1 rounded">
                      {url}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {threat.details.indicators && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Threat Indicators</h4>
                <ul className="space-y-1">
                  {threat.details.indicators.map((indicator: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                      <span>{indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {threat.details.duration && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Media Duration</h4>
                <p className="text-sm text-gray-600">{threat.details.duration}</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function ThreatsPage() {
  const [selectedThreatType, setSelectedThreatType] = useState('all')
  const [selectedModality, setSelectedModality] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredThreats = mockThreats.filter(threat => {
    const matchesType = selectedThreatType === 'all' || threat.type === selectedThreatType
    const matchesModality = selectedModality === 'all' || threat.modality === selectedModality
    const matchesSearch = searchQuery === '' || 
      threat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesType && matchesModality && matchesSearch
  })

  if (!mounted) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Threat Detection</h1>
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
          <h1 className="text-2xl font-bold text-gray-900">Live Threat Detection</h1>
          <p className="text-gray-600 mt-1">Real-time multi-modal threat analysis and management</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Live Monitoring</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search threats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Threat Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Threat Type</label>
            <select
              value={selectedThreatType}
              onChange={(e) => setSelectedThreatType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {threatTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.count})
                </option>
              ))}
            </select>
          </div>

          {/* Modality Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Modality</label>
            <select
              value={selectedModality}
              onChange={(e) => setSelectedModality(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {modalityFilters.map(filter => (
                <option key={filter.id} value={filter.id}>
                  {filter.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <EyeIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShieldCheckIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Blocked</p>
              <p className="text-2xl font-bold text-gray-900">234</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Today</p>
              <p className="text-2xl font-bold text-gray-900">1.2K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Threats List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Active Threats ({filteredThreats.length})
          </h2>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {selectedThreatType !== 'all' && threatTypes.find(t => t.id === selectedThreatType)?.name}
              {selectedThreatType !== 'all' && selectedModality !== 'all' && ' • '}
              {selectedModality !== 'all' && modalityFilters.find(m => m.id === selectedModality)?.name}
            </span>
          </div>
        </div>

        {filteredThreats.map(threat => (
          <ThreatCard key={threat.id} threat={threat} />
        ))}

        {filteredThreats.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <ShieldCheckIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No threats found</h3>
            <p className="text-gray-600">No threats match your current filters. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}