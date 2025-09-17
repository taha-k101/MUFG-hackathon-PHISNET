#  PHISNET - Multi-Modal Threat Detection System
"A Smart net that catches phishing across channels"

> **Advanced Multi-Modal Phishing Detection System** - Leveraging AI-powered analysis across text, audio, and video modalities to detect sophisticated cyber threats with real-time monitoring and comprehensive analytics.

##  Overview

PHISNET is a cutting-edge cybersecurity platform developed for the MUFG Hackathon, designed to combat evolving phishing threats through multi-modal AI detection. The system analyzes text content, audio deepfakes, and video manipulations to provide comprehensive threat assessment and real-time protection.

###  Key Features

-  **Multi-Modal Detection**: Simultaneous analysis of text, audio, and video content
-  **AI-Powered Classification**: Advanced machine learning models for threat identification
-  **Real-Time Analytics**: Live dashboards with interactive visualizations
-  **Green IT Integration**: Carbon footprint tracking and sustainability metrics
-  **Dark Mode Support**: Seamless theme switching for optimal user experience
-  **Responsive Design**: Optimized for desktop, tablet, and mobile devices
-  **High Performance**: Built with Next.js 15 for optimal speed and efficiency
-  **Multimodal Agentic Approach**: We use an agentic multi-stage detection approach that performs fast lightweight triage on MFCC features and selectively invokes heavy pretrained audio spoof detectors for high-risk cases, fusing results into explainable, green, and accurate decisions.

##  Architecture

### Tech Stack

**Frontend Framework:**
- **Next.js 15.5.3** - React framework with App Router
- **React 19.1.0** - UI library with latest features
- **TypeScript 5.6.2** - Type-safe development

**Styling & UI:**
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **Framer Motion** - Smooth animations and transitions

### Project Structure

`
MUFG-hackathon-PHISNET/
 src/
    app/                    # Next.js App Router pages
       analytics/          # Analytics dashboard
       green-it/          # Green IT metrics
       monitoring/        # System monitoring
       reports/           # Reports and insights
       settings/          # Application settings
       threats/           # Threat detection interface
       upload/            # File upload functionality
    components/            # Reusable React components
       Header.tsx         # Application header
       Sidebar.tsx        # Navigation sidebar
       ThemeToggle.tsx    # Dark/light mode toggle
    contexts/              # React contexts
       ThemeContext.tsx   # Theme management
    hooks/                 # Custom React hooks
       useClientOnly.tsx  # Client-side rendering
    lib/                   # Utility functions
        utils.ts           # Helper utilities
 notebook/                  # Jupyter notebooks for ML pipelines
    audio-detection/       # Audio deepfake detection
    text-detection/        # Text classification
    video-detection/       # Video manipulation detection
 public/                    # Static assets
 reports/                   # Project documentation
 README.md                  # Project documentation
`

##  Features Overview

###  Analytics Dashboard
- **Multi-Modal Visualizations**: Interactive charts showing detection performance across text, audio, and video
- **Agentic Risk Classification**: Advanced threat categorization (HIGH_RISK, REVIEW, LOW_RISK)
- **Confusion Matrices**: Real vs. predicted classification accuracy
- **Feature Importance**: Top contributing features for each detection modality
- **Performance Metrics**: Precision, recall, and F1-scores across all models

###  Green IT Dashboard
- **Carbon Footprint Tracking**: Real-time CO emissions monitoring
- **Energy Consumption**: Power usage optimization metrics
- **Sustainability Goals**: Progress tracking toward environmental targets
- **Resource Efficiency**: CPU, memory, and storage optimization insights

###  Threat Detection
- **Real-Time Monitoring**: Live threat feed with instant alerts
- **Multi-Modal Analysis**: Synchronized detection across all content types
- **Risk Scoring**: Automated threat severity assessment
- **Historical Tracking**: Trend analysis and pattern recognition

###  Reporting & Insights
- **Executive Dashboards**: High-level metrics for stakeholders
- **Detailed Analytics**: In-depth performance analysis
- **Export Capabilities**: PDF and CSV report generation
- **Custom Filters**: Flexible data querying and visualization

##  Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository:**
   `ash
   git clone https://github.com/taha-k101/MUFG-hackathon-PHISNET.git
   cd MUFG-hackathon-PHISNET
   `

2. **Install dependencies:**
   `ash
   npm install
   # or
   yarn install
   `

3. **Start the development server:**
   `ash
   npm run dev
   # or
   yarn dev
   `

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

`ash
npm run build
npm start
`

##  Machine Learning Pipelines

### Notebook Overview

The project includes comprehensive Jupyter notebooks for each detection modality:

####  Text Detection (
otebook/text-detection/)
- **03_text_pipeline_agentic.ipynb**: Agentic text classification pipeline
- **06_visualizations.ipynb**: Text analysis visualizations
- **07_dashboard_greenIT.ipynb**: Green IT metrics for text processing

####  Audio Detection (
otebook/audio-detection/)
- **04_audio_detection.ipynb**: Audio deepfake detection models
- **audio_pipeline_visualizations.ipynb**: Audio analysis charts
- **audio_visuals_greenIT.ipynb**: Audio processing sustainability metrics

####  Video Detection (
otebook/video-detection/)
- **05_Video_pipeline.ipynb**: Video manipulation detection
- **video_pipeline_visualizations.ipynb**: Video analysis visualizations
- **video_visuals_greenIT.ipynb**: Video processing carbon footprint

##  Performance Metrics

### Detection Accuracy
- **Text Classification**: 89.5% accuracy with agentic enhancement
- **Audio Deepfake Detection**: 87.2% real vs. fake classification
- **Video Manipulation**: 63% deepfake detection accuracy
- **Multi-Modal Fusion**: 90% combined accuracy across all modalities

### Sustainability Metrics
- **Carbon Footprint Reduction**: 15.2% decrease in CO emissions
- **Energy Efficiency**: 22.8% improvement in power consumption
- **Resource Optimization**: 18.5% reduction in computational overhead

##  Development

### Available Scripts

- 
pm run dev - Start development server
- 
pm run build - Build for production
- 
pm run start - Start production server


### Environment Configuration

Create a .env.local file for environment-specific settings:

`env
# API Configuration
NEXT_PUBLIC_API_URL=your_api_endpoint
NEXT_PUBLIC_ENV=development

# Analytics Configuration
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
`

---

