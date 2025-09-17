'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DocumentTextIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import { Line, Bar, Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
  ArcElement,
} from 'chart.js'
import { cn } from '@/lib/utils'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
  ArcElement
)

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('text')

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <ChartBarIcon className="w-8 h-8 text-blue-600" />
            <span>PHISNET Analytics Dashboard</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Multi-modal threat detection insights from pipeline analysis</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'text', name: 'Text Detection', icon: DocumentTextIcon },
              { id: 'audio', name: 'Audio Detection', icon: SpeakerWaveIcon },
              { id: 'video', name: 'Video Detection', icon: VideoCameraIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'text' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Text Detection Analytics</h2>
                <p className="text-gray-600 dark:text-gray-300">Agentic risk classification from 06_visualizations.ipynb</p>
              </div>
              
              {/* Agentic Buckets Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Agentic Buckets Distribution</h3>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: ['HIGH_RISK', 'REVIEW', 'LOW_RISK'],
                      datasets: [{
                        label: 'Count',
                        data: [125, 89, 456],
                        backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
                        borderRadius: 8,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: { title: { display: true, text: 'Count' }, beginAtZero: true }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Confusion Matrix */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Raw vs Agentic Classification</h3>
                <div className="h-64">
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto h-full">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg border-2 border-green-500 p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">234</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Safe → Safe</div>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg border-2 border-red-500 p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Safe → Phishing</div>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg border-2 border-red-500 p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Phishing → Safe</div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg border-2 border-green-500 p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">89</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Phishing → Phishing</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Domains */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top URL Domains</h3>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: ['amazon.com', 'paypal.com', 'microsoft.com', 'google.com', 'apple.com'],
                      datasets: [{
                        label: 'Frequency',
                        data: [156, 134, 98, 87, 76],
                        backgroundColor: '#06b6d4',
                        borderRadius: 6,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      indexAxis: 'y' as const,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { title: { display: true, text: 'Frequency' }, beginAtZero: true }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'audio' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Audio Detection Analytics</h2>
                <p className="text-gray-600 dark:text-gray-300">From audio_pipeline_visualizations.ipynb</p>
              </div>
              
              {/* Deepfake Confusion Matrix */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Deepfake Detection Matrix</h3>
                <div className="h-64">
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto h-full">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg border-2 border-green-500 p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">187</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Real → Real</div>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg border-2 border-red-500 p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">23</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Real → Fake</div>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg border-2 border-red-500 p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">19</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Fake → Real</div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg border-2 border-green-500 p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">156</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Fake → Fake</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modality Accuracy */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detection Accuracy Across Modalities</h3>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: ['Video', 'Audio', 'Fusion'],
                      datasets: [{
                        label: 'Accuracy',
                        data: [68, 63, 72],
                        backgroundColor: ['#8b5cf6', '#06b6d4', '#10b981'],
                        borderRadius: 8,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: { title: { display: true, text: 'Accuracy (%)' }, beginAtZero: true, max: 100 }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'video' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Video Detection Analytics</h2>
                <p className="text-gray-600 dark:text-gray-300">From video_pipeline_visualizations.ipynb</p>
              </div>
              
              {/* Video Deepfake Matrix */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Video Deepfake Detection</h3>
                <div className="h-64">
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto h-full">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg border-2 border-green-500 p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">198</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Real → Real</div>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg border-2 border-red-500 p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">34</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Real → Fake</div>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg border-2 border-red-500 p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">28</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Fake → Real</div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg border-2 border-green-500 p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">167</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Fake → Fake</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Features */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Video Features</h3>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: ['frame_variance', 'optical_flow_x', 'optical_flow_y', 'face_landmarks', 'eye_aspect_ratio'],
                      datasets: [{
                        label: 'Importance',
                        data: [0.092, 0.087, 0.083, 0.079, 0.075],
                        backgroundColor: '#06d6a0',
                        borderRadius: 6,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      indexAxis: 'y' as const,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { title: { display: true, text: 'Feature Importance' }, beginAtZero: true }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Files Processed</h3>
              <p className="text-2xl font-bold text-blue-600">28.5K</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Across all modalities</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detection Accuracy</h3>
              <p className="text-2xl font-bold text-green-600">72%</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Multi-modal fusion</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center space-x-3">
            <VideoCameraIcon className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Threats Detected</h3>
              <p className="text-2xl font-bold text-purple-600">892</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">High confidence alerts</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
