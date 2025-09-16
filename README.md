structure for now:

phishnet/
├── notebooks/
│   ├── text_spoofing.ipynb
│   ├── audio_spoofing.ipynb
│   └── video_spoofing.ipynb
├── processed/
│   ├── phishing_agentic_fast.csv
│   ├── review_samples.csv
│   └── highrisk_samples.csv
├── scripts/
│   └── push_metrics_from_csv.py
├── dashboards/
│   └── phishnet_overview.json
└── .github/
    └── workflows/
        └── push-metrics.yml
