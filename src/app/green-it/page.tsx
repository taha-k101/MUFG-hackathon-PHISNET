'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BeakerIcon,
  BoltIcon,
  CloudIcon,
  CpuChipIcon,
  EyeIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  ServerIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { Line, Bar, Radar } from 'react-chartjs-2'
import { cn, formatNumber } from '@/lib/utils'

interface MetricCard {
  title: string
  value: string | number
  unit?: string
  change: string
  trend: 'up' | 'down' | 'stable'
  target?: string
  status: 'good' | 'warning' | 'critical'
  icon: any
  color: 'green' | 'yellow' | 'red' | 'blue'
}

function EnvironmentalMetricCard({ metric }: { metric: MetricCard }) {
  const statusColors = {
    good: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    critical: 'bg-red-50 border-red-200',
  }

  const iconColors = {
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600',
  }

  const trendIcons = {
    up: ArrowTrendingUpIcon,
    down: ArrowTrendingDownIcon,
    stable: () => <div className="w-4 h-4 border-b-2 border-gray-400"></div>,
  }

  const TrendIcon = trendIcons[metric.trend]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'bg-white rounded-lg border-2 p-6 transition-all hover:shadow-md',
        statusColors[metric.status]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900">{metric.title}</h3>
            {metric.status === 'good' && <CheckCircleIcon className="w-4 h-4 text-green-500" />}
            {metric.status === 'warning' && <ExclamationCircleIcon className="w-4 h-4 text-yellow-500" />}
            {metric.status === 'critical' && <ExclamationCircleIcon className="w-4 h-4 text-red-500" />}
          </div>
          
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
            {metric.unit && <span className="text-sm font-medium text-gray-600">{metric.unit}</span>}
          </div>
          
          <div className="flex items-center space-x-3 mt-3">
            <div className={cn(
              'flex items-center space-x-1 text-sm',
              metric.trend === 'down' && metric.status === 'good' ? 'text-green-600' :
              metric.trend === 'up' && metric.status === 'critical' ? 'text-red-600' :
              'text-gray-600'
            )}>
              <TrendIcon className="w-4 h-4" />
              <span>{metric.change}</span>
            </div>
            
            {metric.target && (
              <div className="text-sm text-gray-500">
                Target: {metric.target}
              </div>
            )}
          </div>
        </div>
        
        <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', iconColors[metric.color])}>
          <metric.icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  )
}

function CarbonFootprintChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Carbon Emissions (kg CO₂)',
        data: [450, 420, 380, 360, 340, 320],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Target Reduction',
        data: [450, 435, 420, 405, 390, 375],
        borderColor: '#6b7280',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Carbon Footprint Trend</h3>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

function EnergyBreakdownChart() {
  const data = {
    labels: ['CPU Processing', 'Data Storage', 'Network Transfer', 'ML Training', 'Cooling', 'Other'],
    datasets: [{
      label: 'Energy Consumption (kWh)',
      data: [156, 89, 45, 234, 67, 23],
      backgroundColor: [
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6',
        '#6b7280',
      ],
      borderRadius: 8,
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Consumption Breakdown</h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

function SustainabilityScore() {
  const data = {
    labels: ['Energy Efficiency', 'Carbon Reduction', 'Resource Optimization', 'Green Computing', 'Waste Reduction', 'Renewable Energy'],
    datasets: [{
      label: 'Current Score',
      data: [85, 78, 92, 88, 75, 82],
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: '#10b981',
      borderWidth: 2,
    }, {
      label: 'Industry Average',
      data: [70, 65, 75, 72, 68, 70],
      backgroundColor: 'rgba(107, 114, 128, 0.1)',
      borderColor: '#6b7280',
      borderWidth: 2,
      borderDash: [5, 5],
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sustainability Score</h3>
      <div className="h-64">
        <Radar data={data} options={options} />
      </div>
    </div>
  )
}

export default function GreenITPage() {
  const [timeRange, setTimeRange] = useState('30d')

  const environmentalMetrics: MetricCard[] = [
    {
      title: 'Carbon Footprint',
      value: 320,
      unit: 'kg CO₂/month',
      change: '-28.9% vs last month',
      trend: 'down',
      target: '< 300 kg',
      status: 'good',
      icon: CloudIcon,
      color: 'green'
    },
    {
      title: 'Energy Consumption',
      value: 614,
      unit: 'kWh/month',
      change: '-15.2% vs last month',
      trend: 'down',
      target: '< 600 kWh',
      status: 'warning',
      icon: BoltIcon,
      color: 'yellow'
    },
    {
      title: 'Processing Efficiency',
      value: 94.7,
      unit: '%',
      change: '+3.1% vs last month',
      trend: 'up',
      target: '> 90%',
      status: 'good',
      icon: CpuChipIcon,
      color: 'green'
    },
    {
      title: 'Data Transfer',
      value: 2.3,
      unit: 'TB/month',
      change: '+12.5% vs last month',
      trend: 'up',
      target: '< 3.0 TB',
      status: 'good',
      icon: GlobeAltIcon,
      color: 'blue'
    },
    {
      title: 'Server Uptime',
      value: 99.9,
      unit: '%',
      change: '+0.1% vs last month',
      trend: 'up',
      target: '> 99.5%',
      status: 'good',
      icon: ServerIcon,
      color: 'green'
    },
    {
      title: 'Green Score',
      value: 85,
      unit: '/100',
      change: '+7 points',
      trend: 'up',
      target: '> 80',
      status: 'good',
      icon: BeakerIcon,
      color: 'green'
    }
  ]

  const recommendations = [
    {
      title: 'Optimize ML Model Training',
      description: 'Reduce training frequency and use more efficient algorithms to save 15% energy',
      impact: 'High',
      effort: 'Medium',
      savings: '92 kWh/month'
    },
    {
      title: 'Implement Smart Cooling',
      description: 'AI-driven cooling optimization can reduce energy consumption by 20%',
      impact: 'High',
      effort: 'High',
      savings: '123 kWh/month'
    },
    {
      title: 'Edge Computing Migration',
      description: 'Move processing closer to data sources to reduce network overhead',
      impact: 'Medium',
      effort: 'High',
      savings: '45 kWh/month'
    },
    {
      title: 'Renewable Energy Sources',
      description: 'Switch to renewable energy providers for 40% carbon reduction',
      impact: 'Very High',
      effort: 'Low',
      savings: '128 kg CO₂/month'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <BeakerIcon className="w-8 h-8 text-green-600" />
            <span>Green IT Compliance</span>
          </h1>
          <p className="text-gray-600 mt-1">Environmental impact monitoring and sustainability metrics</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            <EyeIcon className="w-4 h-4 mr-2" />
            View Report
          </button>
        </div>
      </div>

      {/* Environmental Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {environmentalMetrics.map((metric, index) => (
          <EnvironmentalMetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CarbonFootprintChart />
        <EnergyBreakdownChart />
      </div>

      {/* Sustainability Score */}
      <SustainabilityScore />

      {/* Recommendations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Green IT Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{rec.title}</h4>
                <span className={cn(
                  'text-xs px-2 py-1 rounded-full font-medium',
                  rec.impact === 'Very High' && 'bg-red-100 text-red-700',
                  rec.impact === 'High' && 'bg-orange-100 text-orange-700',
                  rec.impact === 'Medium' && 'bg-yellow-100 text-yellow-700',
                  rec.impact === 'Low' && 'bg-green-100 text-green-700'
                )}>
                  {rec.impact} Impact
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500">Effort: {rec.effort}</span>
                  <span className="text-green-600 font-medium">💡 {rec.savings}</span>
                </div>
                <button className="text-green-600 hover:text-green-700 font-medium">
                  Implement →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compliance Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
        <div className="space-y-4">
          {[
            { standard: 'ISO 14001', status: 'Compliant', lastAudit: '2024-01-15', nextAudit: '2024-07-15' },
            { standard: 'Green Software Foundation', status: 'Compliant', lastAudit: '2024-02-01', nextAudit: '2024-08-01' },
            { standard: 'EU Green Deal', status: 'In Progress', lastAudit: '2023-12-10', nextAudit: '2024-06-10' },
            { standard: 'Carbon Trust Standard', status: 'Compliant', lastAudit: '2024-01-20', nextAudit: '2024-07-20' },
          ].map((compliance, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={cn(
                  'w-3 h-3 rounded-full',
                  compliance.status === 'Compliant' ? 'bg-green-500' : 'bg-yellow-500'
                )}></div>
                <div>
                  <h4 className="font-medium text-gray-900">{compliance.standard}</h4>
                  <p className="text-sm text-gray-600">Last audit: {compliance.lastAudit}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  compliance.status === 'Compliant' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                )}>
                  {compliance.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">Next: {compliance.nextAudit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}