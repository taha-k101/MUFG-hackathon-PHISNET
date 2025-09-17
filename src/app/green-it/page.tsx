'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BeakerIcon,
  BoltIcon,
  CloudIcon,
  CpuChipIcon,
  EyeIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import { Line, Bar, Radar, Scatter } from 'react-chartjs-2'
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
  Filler
)

export default function GreenITPage() {
  const [activeTab, setActiveTab] = useState('audio')

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <BeakerIcon className="w-8 h-8 text-green-600" />
            <span>Green IT Analytics</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Environmental impact monitoring and sustainability metrics from detection systems</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
            <EyeIcon className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'audio', name: 'Audio Detection', icon: BoltIcon },
              { id: 'text', name: 'Text Detection', icon: ChartBarIcon },
              { id: 'video', name: 'Video Detection', icon: CpuChipIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Audio Detection Tab - From audio_visuals_greenIT.ipynb */}
          {activeTab === 'audio' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Audio Detection Green IT Metrics</h2>
                <p className="text-gray-600 dark:text-gray-300">Energy consumption and carbon footprint analysis for audio-based threat detection</p>
              </div>
              
              {/* Energy vs Heavy Model Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Energy vs % escalated to heavy model</h3>
                <div className="h-64">
                  <Line 
                    data={{
                      labels: ['0%', '20%', '40%', '60%', '80%', '100%'],
                      datasets: [{
                        label: 'Total Energy (Wh)',
                        data: [250, 300, 350, 400, 450, 500],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: { title: { display: true, text: '% heavy' } },
                        y: { title: { display: true, text: 'Total energy (Wh) for current dataset' }, beginAtZero: true }
                      }
                    }}
                  />
                </div>
              </div>

              {/* CO2 vs Heavy Model Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">CO₂ vs % escalated to heavy model</h3>
                <div className="h-64">
                  <Line 
                    data={{
                      labels: ['0%', '20%', '40%', '60%', '80%', '100%'],
                      datasets: [{
                        label: 'Total CO₂ (kg)',
                        data: [0.112, 0.135, 0.158, 0.180, 0.203, 0.225],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.4,
                        fill: true,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: { title: { display: true, text: '% heavy' } },
                        y: { title: { display: true, text: 'Total CO₂ (kg)' }, beginAtZero: true }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Carbon Impact Comparison */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Carbon Impact: Baseline vs Our Agentic Approach</h3>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: ['All Heavy', 'Agentic Routing'],
                      datasets: [{
                        label: 'CO₂ Emission (kg)',
                        data: [0.225, 0.135],
                        backgroundColor: ['#ef4444', '#10b981'],
                        borderRadius: 8,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: { title: { display: true, text: 'CO₂ Emission (kg)' }, beginAtZero: true }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Feature Profile Radar */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Feature Profile: Spoof vs Bonafide</h3>
                <div className="h-64">
                  <Radar 
                    data={{
                      labels: ['snr_db', 'noise_drift', 'f0_std', 'hnr_mean', 'jitter_local', 'phase_disc'],
                      datasets: [
                        {
                          label: 'Spoof',
                          data: [15, 0.8, 25, 12, 0.02, 1.2],
                          borderColor: '#ef4444',
                          backgroundColor: 'rgba(239, 68, 68, 0.25)',
                          borderWidth: 2,
                        },
                        {
                          label: 'Bonafide',
                          data: [25, 0.3, 15, 18, 0.01, 0.8],
                          borderColor: '#10b981',
                          backgroundColor: 'rgba(16, 185, 129, 0.25)',
                          borderWidth: 2,
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: { r: { beginAtZero: true } }
                    }}
                  />
                </div>
              </div>

              {/* Reinforcement Learning */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reinforcement over time: Better accuracy, fewer escalations</h3>
                <div className="h-64">
                  <Line 
                    data={{
                      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                      datasets: [
                        {
                          label: 'Accuracy',
                          data: [0.86, 0.87, 0.88, 0.89, 0.90, 0.91, 0.92, 0.93, 0.94, 0.95],
                          borderColor: '#10b981',
                          backgroundColor: 'transparent',
                          yAxisID: 'y',
                        },
                        {
                          label: 'Escalations %',
                          data: [0.50, 0.46, 0.42, 0.38, 0.34, 0.30, 0.26, 0.22, 0.18, 0.14],
                          borderColor: '#ef4444',
                          backgroundColor: 'transparent',
                          yAxisID: 'y1',
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          type: 'linear' as const,
                          display: true,
                          position: 'left' as const,
                          title: { display: true, text: 'Accuracy', color: '#10b981' },
                          ticks: { color: '#10b981' }
                        },
                        y1: {
                          type: 'linear' as const,
                          display: true,
                          position: 'right' as const,
                          title: { display: true, text: 'Escalation Rate', color: '#ef4444' },
                          ticks: { color: '#ef4444' },
                          grid: { drawOnChartArea: false }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Risk vs Efficiency */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Risk vs. Efficiency: Accuracy vs. Carbon Impact</h3>
                <div className="h-64">
                  <Scatter 
                    data={{
                      datasets: [{
                        label: 'Approaches',
                        data: [
                          { x: 0.95, y: 100 },
                          { x: 0.75, y: 20 },
                          { x: 0.92, y: 35 }
                        ],
                        backgroundColor: ['#ef4444', '#3b82f6', '#10b981'],
                        borderColor: ['#dc2626', '#2563eb', '#059669'],
                        borderWidth: 2,
                        pointRadius: [15, 10, 18],
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { title: { display: true, text: 'Detection Accuracy (↑ better)' }, min: 0.7, max: 1.0 },
                        y: { title: { display: true, text: 'Carbon Impact (kg CO₂, ↓ better)' }, beginAtZero: true, max: 120 }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Text Detection Tab - From 07_dashboard_greenIT.ipynb */}
          {activeTab === 'text' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Text Detection Green IT Metrics</h2>
                <p className="text-gray-600 dark:text-gray-300">Compliance overview and carbon footprint analysis for text-based threat detection</p>
              </div>
              
              {/* Compliance Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Green IT Compliance Overview</h3>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: ['Energy Efficiency', 'Carbon Reduction', 'Data Privacy', 'AI Fairness', 'Sustainable Storage'],
                      datasets: [{
                        label: 'Compliance %',
                        data: [85, 70, 95, 80, 65],
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderRadius: 8,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      indexAxis: 'y' as const,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { title: { display: true, text: 'Compliance %' }, min: 0, max: 100 }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Compliance Wheel */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🌱 Green IT Compliance Wheel</h3>
                <div className="h-64">
                  <Radar 
                    data={{
                      labels: ['Energy Efficiency', 'Carbon Reduction', 'Data Privacy', 'AI Fairness', 'Sustainable Storage'],
                      datasets: [{
                        label: 'Green IT Compliance',
                        data: [85, 70, 95, 80, 65],
                        backgroundColor: 'rgba(50, 205, 50, 0.25)',
                        borderColor: '#10b981',
                        borderWidth: 2,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } } }
                    }}
                  />
                </div>
              </div>

              {/* Carbon Footprint Comparison */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Carbon Footprint Comparison</h3>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: ['Baseline (BERT-Large)', 'Our Lightweight Model'],
                      datasets: [{
                        label: 'g CO₂ / 1000 inferences',
                        data: [1500, 250],
                        backgroundColor: ['#ef4444', '#10b981'],
                        borderRadius: 8,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: { title: { display: true, text: 'g CO₂ / 1000 inferences' }, beginAtZero: true }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Video Detection Tab - From video_visuals_greenIT.ipynb */}
          {activeTab === 'video' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Video Detection Green IT Metrics</h2>
                <p className="text-gray-600 dark:text-gray-300">Energy efficiency and carbon reduction analysis for video-based threat detection</p>
              </div>
              
              {/* CO2 Saved */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Estimated Carbon Footprint Reduction via Early Stopping (Green IT)</h3>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: ['CO2 Saved (kg)'],
                      datasets: [{
                        label: 'kg',
                        data: [0.035],
                        backgroundColor: ['#22c55e'],
                        borderRadius: 8,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: { y: { beginAtZero: true } }
                    }}
                  />
                </div>
              </div>

              {/* CO2 Emission Reduction */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">CO2 Emission Reduction Across Epochs (Green IT)</h3>
                <div className="h-64">
                  <Line 
                    data={{
                      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                      datasets: [{
                        label: 'CO2 Saved (kg)',
                        data: [0.0005, 0.001, 0.0015, 0.002, 0.0025, 0.003, 0.0035, 0.004, 0.0045, 0.005],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        fill: true,
                        tension: 0.4,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: { title: { display: true, text: 'Epoch' } },
                        y: { title: { display: true, text: 'CO2 Saved (kg)' }, beginAtZero: true }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Multi-Modality Comparison */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Multi-Modality Comparison (Agentic & Reinforced Detection)</h3>
                <div className="h-64">
                  <Radar 
                    data={{
                      labels: ['Accuracy', 'Loss', 'Energy Proxy'],
                      datasets: [
                        {
                          label: 'Video',
                          data: [0.68, 0.32, 13],
                          backgroundColor: 'rgba(59, 130, 246, 0.25)',
                          borderColor: '#3b82f6',
                          borderWidth: 2,
                        },
                        {
                          label: 'Audio',
                          data: [0.64, 0.36, 15],
                          backgroundColor: 'rgba(239, 68, 68, 0.25)',
                          borderColor: '#ef4444',
                          borderWidth: 2,
                        },
                        {
                          label: 'Fusion',
                          data: [0.73, 0.27, 12],
                          backgroundColor: 'rgba(16, 185, 129, 0.25)',
                          borderColor: '#10b981',
                          borderWidth: 2,
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: { r: { beginAtZero: true } }
                    }}
                  />
                </div>
              </div>

              {/* Energy Consumption by Modality */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Energy Consumption per Detection Modality (Green IT)</h3>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: ['Video', 'Audio', 'Fusion'],
                      datasets: [{
                        label: 'Cumulative Energy Units',
                        data: [20, 22, 18],
                        backgroundColor: ['#10b981', '#34d399', '#6ee7b7'],
                        borderRadius: 8,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: { title: { display: true, text: 'Cumulative Energy Units' }, beginAtZero: true }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Epoch vs CO2 comparison */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Epoch vs % CO2 Efficiency</h3>
                <div className="h-64">
                  <Line 
                    data={{
                      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                      datasets: [{
                        label: '% CO2 Efficiency',
                        data: [45, 50, 55, 62, 68, 73, 78, 82, 85, 88],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        fill: true,
                        tension: 0.4,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: { title: { display: true, text: 'Epoch' } },
                        y: { title: { display: true, text: '% CO2 Efficiency' }, beginAtZero: true, max: 100 }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Detection Efficiency by Modality */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detection Efficiency by Modality (Consumption vs Performance)</h3>
                <div className="h-64">
                  <Scatter 
                    data={{
                      datasets: [{
                        label: 'Modalities',
                        data: [
                          { x: 0.68, y: 20 },  // Video
                          { x: 0.64, y: 22 },  // Audio  
                          { x: 0.73, y: 18 }   // Fusion
                        ],
                        backgroundColor: ['#3b82f6', '#ef4444', '#10b981'],
                        borderColor: ['#2563eb', '#dc2626', '#059669'],
                        borderWidth: 2,
                        pointRadius: [15, 12, 18],
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { title: { display: true, text: 'Accuracy (↑ better)' }, min: 0.6, max: 0.8 },
                        y: { title: { display: true, text: 'Energy Consumption (↓ better)' }, beginAtZero: true, max: 25 }
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
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <CloudIcon className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total CO₂ Saved</h3>
              <p className="text-2xl font-bold text-green-600">1.42 kg</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Across all detection modalities</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <BoltIcon className="w-8 h-8 text-yellow-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Energy Efficiency</h3>
              <p className="text-2xl font-bold text-yellow-600">94.7%</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Through agentic routing</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <CpuChipIcon className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Model Optimization</h3>
              <p className="text-2xl font-bold text-blue-600">83%</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Carbon footprint reduction</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}