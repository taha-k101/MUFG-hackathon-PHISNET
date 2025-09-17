# 🚀 PHISNET - Multi-Modal Threat Detection System 🎣

*"A Smart net that catches phishing across channels"*

> **Advanced Multi-Modal Phishing Detection System** – Leveraging AI-powered analysis across text, audio, and video modalities to detect sophisticated cyber threats with real-time monitoring and comprehensive analytics.

---

## 🌐 Overview

**PHISNET** is a cutting-edge cybersecurity platform developed for the **MUFG Hackathon**, designed to combat evolving phishing threats through **multi-modal AI detection**.
The system analyzes **text content, audio deepfakes, and video manipulations** to provide comprehensive threat assessment and real-time protection.

---

## ✨ Key Features

* **Multi-Modal Detection** – Simultaneous analysis of text, audio, and video content
* **AI-Powered Classification** – Advanced machine learning models for threat identification
* **Real-Time Analytics** – Live dashboards with interactive visualizations
* **Green IT Integration** – Carbon footprint tracking and sustainability metrics
* **Dark Mode Support** – Seamless theme switching for optimal user experience
* **Responsive Design** – Optimized for desktop, tablet, and mobile devices
* **High Performance** – Built with Next.js 15 for optimal speed and efficiency
* **Multimodal Agentic Approach** – *We use an agentic multi-stage detection approach that performs fast lightweight triage on MFCC features and selectively invokes heavy pretrained audio spoof detectors for high-risk cases, fusing results into explainable, green, and accurate decisions.*

---

## 🏗️ Architecture

### Tech Stack

**Frontend Framework**

* Next.js **15.5.3** – React framework with App Router
* React **19.1.0** – UI library with latest features
* TypeScript **5.6.2** – Type-safe development

**Styling & UI**

* Tailwind CSS **3.4.1** – Utility-first CSS framework
* Heroicons – Beautiful SVG icons
* Framer Motion – Smooth animations and transitions

---

### Project Structure

```
MUFG-hackathon-PHISNET/
 src/
    app/                    # Next.js App Router pages
       analytics/           # Analytics dashboard
       green-it/            # Green IT metrics
       monitoring/          # System monitoring
       reports/             # Reports and insights
       settings/            # Application settings
       threats/             # Threat detection interface
       upload/              # File upload functionality
    components/             # Reusable React components
       Header.tsx
       Sidebar.tsx
       ThemeToggle.tsx
    contexts/
       ThemeContext.tsx
    hooks/
       useClientOnly.tsx
    lib/
       utils.ts
 notebook/                  # Jupyter notebooks for ML pipelines
    audio-detection/
    text-detection/
    video-detection/
 public/                    # Static assets
 reports/                   # Project documentation
 README.md                  # Project documentation
```

---

## 📊 Features Overview

### Analytics Dashboard

* Multi-Modal Visualizations – Detection performance across text, audio, and video
* Agentic Risk Classification – Categorization into HIGH\_RISK, REVIEW, LOW\_RISK
* Confusion Matrices – Real vs predicted classification accuracy
* Feature Importance – Top contributing features for each modality
* Performance Metrics – Precision, recall, F1-scores across models

### Green IT Dashboard

* Carbon Footprint Tracking – Real-time CO₂ emissions monitoring
* Energy Consumption – Power usage optimization metrics
* Sustainability Goals – Progress tracking toward targets
* Resource Efficiency – CPU, memory, storage optimization insights

### Threat Detection

* Real-Time Monitoring – Live threat feed with instant alerts
* Multi-Modal Analysis – Synchronized detection across modalities
* Risk Scoring – Automated threat severity assessment
* Historical Tracking – Trend analysis and pattern recognition

### Reporting & Insights

* Executive Dashboards – High-level metrics for stakeholders
* Detailed Analytics – In-depth performance analysis
* Export Capabilities – PDF and CSV report generation
* Custom Filters – Flexible data querying and visualization

---

## ⚙️ Getting Started

### Prerequisites

* Node.js **18.0+**
* npm or yarn
* Git

### Installation

```bash
# Clone repository
git clone https://github.com/taha-k101/MUFG-hackathon-PHISNET.git
cd MUFG-hackathon-PHISNET

# Install dependencies
npm install
# or
yarn install

# Start dev server
npm run dev
# or
yarn dev
```

Open your browser → [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 🤖 Machine Learning Pipelines

### Notebook Overview

#### Text Detection (`notebook/text-detection/`)

* **03\_text\_pipeline\_agentic.ipynb** – Agentic text classification
* **06\_visualizations.ipynb** – Text analysis visualizations
* **07\_dashboard\_greenIT.ipynb** – Green IT metrics for text

#### Audio Detection (`notebook/audio-detection/`)

* **04\_audio\_detection.ipynb** – Audio deepfake detection models
* **audio\_pipeline\_visualizations.ipynb** – Audio analysis charts
* **audio\_visuals\_greenIT.ipynb** – Sustainability metrics for audio

#### Video Detection (`notebook/video-detection/`)

* **05\_video\_pipeline.ipynb** – Video manipulation detection
* **video\_pipeline\_visualizations.ipynb** – Video analysis visualizations
* **video\_visuals\_greenIT.ipynb** – Carbon footprint of video detection

---

## 📈 Performance Metrics

### Detection Accuracy

* Text Classification – **89.5%** with agentic enhancement
* Audio Deepfake Detection – **87.2%** real vs fake classification
* Video Manipulation – **63%** deepfake detection accuracy
* Multi-Modal Fusion – **90%** combined accuracy across all modalities

### Sustainability Metrics

* Carbon Footprint Reduction – **15.2%** decrease in CO₂ emissions
* Energy Efficiency – **22.8%** improvement in power consumption
* Resource Optimization – **18.5%** reduction in computational overhead

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run start   # Start production server
```

### Environment Configuration

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=your_api_endpoint
NEXT_PUBLIC_ENV=development

# Analytics Configuration
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

---

✨ **PHISNET** – Bridging AI, cybersecurity, and Green IT for next-gen phishing defense.

---

