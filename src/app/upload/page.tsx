'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  PhotoIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import { cn, formatBytes, getRiskColor, getRiskIcon } from '@/lib/utils'

interface UploadedFile {
  id: string
  file: File
  type: 'text' | 'audio' | 'video' | 'image' | 'unknown'
  progress: number
  status: 'uploading' | 'analyzing' | 'completed' | 'error'
  result?: {
    risk: string
    confidence: number
    threats: string[]
    details: string
  }
}

function FileTypeIcon({ type, className }: { type: string; className?: string }) {
  const icons = {
    text: DocumentTextIcon,
    audio: SpeakerWaveIcon,
    video: VideoCameraIcon,
    image: PhotoIcon,
    unknown: DocumentTextIcon,
  }
  const Icon = icons[type as keyof typeof icons] || DocumentTextIcon
  return <Icon className={className} />
}

function FileCard({ file, onRemove }: { file: UploadedFile; onRemove: (id: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-lg border border-gray-200 p-4 space-y-3"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            file.type === 'text' && "bg-blue-100",
            file.type === 'audio' && "bg-purple-100",
            file.type === 'video' && "bg-green-100",
            file.type === 'image' && "bg-yellow-100",
            file.type === 'unknown' && "bg-gray-100"
          )}>
            <FileTypeIcon 
              type={file.type} 
              className={cn(
                "w-5 h-5",
                file.type === 'text' && "text-blue-600",
                file.type === 'audio' && "text-purple-600",
                file.type === 'video' && "text-green-600",
                file.type === 'image' && "text-yellow-600",
                file.type === 'unknown' && "text-gray-600"
              )}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{file.file.name}</p>
            <p className="text-xs text-gray-500">{formatBytes(file.file.size)} • {file.type}</p>
          </div>
        </div>
        
        <button
          onClick={() => onRemove(file.id)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      {file.status !== 'completed' && file.status !== 'error' && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">
              {file.status === 'uploading' ? 'Uploading...' : 'Analyzing...'}
            </span>
            <span className="text-gray-600">{file.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={cn(
                "h-2 rounded-full transition-colors",
                file.status === 'uploading' ? "bg-blue-500" : "bg-purple-500"
              )}
              style={{ width: `${file.progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${file.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Results */}
      {file.status === 'completed' && file.result && (
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-900">Analysis Complete</span>
            </div>
            <span className={cn(
              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
              getRiskColor(file.result.risk)
            )}>
              {getRiskIcon(file.result.risk)} {file.result.risk.replace('_', ' ')}
            </span>
          </div>
          
          <div className="text-sm text-gray-600">
            <div className="flex justify-between mb-1">
              <span>Confidence:</span>
              <span className="font-medium">{file.result.confidence}%</span>
            </div>
            <p className="mt-2">{file.result.details}</p>
            
            {file.result.threats.length > 0 && (
              <div className="mt-2">
                <p className="font-medium text-gray-700 mb-1">Detected Threats:</p>
                <ul className="list-disc list-inside text-xs space-y-1">
                  {file.result.threats.map((threat, index) => (
                    <li key={index}>{threat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {file.status === 'error' && (
        <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
          <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-600">Analysis failed. Please try again.</span>
        </div>
      )}
    </motion.div>
  )
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const getFileType = (file: File): UploadedFile['type'] => {
    if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.eml')) {
      return 'text'
    }
    if (file.type.startsWith('audio/')) {
      return 'audio'
    }
    if (file.type.startsWith('video/')) {
      return 'video'
    }
    if (file.type.startsWith('image/')) {
      return 'image'
    }
    return 'unknown'
  }

  const simulateAnalysis = (fileId: string) => {
    const mockResults = [
      {
        risk: 'HIGH_RISK',
        confidence: 94,
        threats: ['Phishing email detected', 'Suspicious URLs found', 'Brand spoofing attempt'],
        details: 'Multiple phishing indicators detected including suspicious URLs and brand impersonation.'
      },
      {
        risk: 'LOW_RISK',
        confidence: 89,
        threats: [],
        details: 'Content appears legitimate with no significant threat indicators.'
      },
      {
        risk: 'REVIEW',
        confidence: 67,
        threats: ['Unusual audio patterns', 'Potential voice synthesis'],
        details: 'Audio shows characteristics that may indicate artificial generation. Manual review recommended.'
      }
    ]

    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                progress: 100, 
                status: 'completed',
                result: mockResults[Math.floor(Math.random() * mockResults.length)]
              }
            : f
        ))
        setIsAnalyzing(false)
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, progress, status: progress > 50 ? 'analyzing' : 'uploading' }
            : f
        ))
      }
    }, 200)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      type: getFileType(file),
      progress: 0,
      status: 'uploading' as const,
    }))

    setFiles(prev => [...prev, ...newFiles])
    setIsAnalyzing(true)

    // Simulate upload and analysis for each file
    newFiles.forEach(file => {
      setTimeout(() => simulateAnalysis(file.id), Math.random() * 1000)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.eml', '.csv'],
      'audio/*': ['.mp3', '.wav', '.m4a'],
      'video/*': ['.mp4', '.mov', '.avi'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
  })

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const stats = {
    total: files.length,
    completed: files.filter(f => f.status === 'completed').length,
    highRisk: files.filter(f => f.result?.risk === 'HIGH_RISK').length,
    processing: files.filter(f => f.status === 'uploading' || f.status === 'analyzing').length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload & Classify</h1>
          <p className="text-gray-600 mt-1">Multi-modal threat detection and analysis</p>
        </div>
        
        {files.length > 0 && (
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Total: {stats.total}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Completed: {stats.completed}</span>
            </div>
            {stats.highRisk > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>High Risk: {stats.highRisk}</span>
              </div>
            )}
            {stats.processing > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse-subtle"></div>
                <span>Processing: {stats.processing}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Upload Area */}
      <motion.div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
          isDragActive 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
        )}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon className={cn(
          "mx-auto h-12 w-12 mb-4",
          isDragActive ? "text-blue-500" : "text-gray-400"
        )} />
        
        {isDragActive ? (
          <div>
            <p className="text-lg font-medium text-blue-600">Drop files here to analyze</p>
            <p className="text-sm text-blue-500 mt-1">Multi-modal threat detection ready</p>
          </div>
        ) : (
          <div>
            <p className="text-lg font-medium text-gray-900">
              Drag & drop files here, or <span className="text-blue-600">browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supports: Text/Email (.txt, .eml), Audio (.mp3, .wav), Video (.mp4, .mov), Images (.jpg, .png)
            </p>
            <p className="text-xs text-gray-400 mt-1">Maximum file size: 100MB</p>
          </div>
        )}
      </motion.div>

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Uploaded Files ({files.length})
            </h3>
            {files.length > 0 && (
              <button
                onClick={() => setFiles([])}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {files.map((file) => (
                <FileCard key={file.id} file={file} onRemove={removeFile} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Empty State */}
      {files.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <SpeakerWaveIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <VideoCameraIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Multi-Modal Threat Detection
            </h3>
            <p className="text-gray-600">
              Upload text files, emails, audio recordings, or videos to analyze for potential threats using our advanced AI models.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}