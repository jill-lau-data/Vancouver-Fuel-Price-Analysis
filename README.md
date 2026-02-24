# ⛽ Vancouver Fuel Price Analysis Project 🚗💨

**An automated data ingestion and statistical analysis pipeline designed to uncover temporal pricing anomalies in the Greater Vancouver retail fuel market.**

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Pandas](https://img.shields.io/badge/Pandas-Data_Analysis-green.svg)
![Google Apps Script](https://img.shields.io/badge/GAS-Automated_ETL-orange.svg)
![Jupyter](https://img.shields.io/badge/Jupyter-Notebook-orange.svg)

## 📊 Project Overview

Can consumer fuel prices be reliably forecasted based on geographic and temporal factors? A common local heuristic in Greater Vancouver suggests that fueling up in Richmond late at night yields significant savings. 

To move beyond anecdotal evidence, I built this project to systematically ingest, process, and analyze fuel pricing data. By applying statistical testing (ANOVA), this project validates geographic pricing hypotheses and provides actionable insights for cost optimization—beneficial for both individual consumers and fleet operators.

## ⚙️ Technical Architecture

This project is divided into two main components: **Data Ingestion (ETL)** and **Data Science (Analysis)**.



1. **Automated Data Ingestion (Google Apps Script):** * Engineered a lightweight, serverless scraper that fetches real-time gas prices from GasBuddy.com for 18 targeted stations across Greater Vancouver.
   * Automates the transformation and loading (ETL) of this data into a centralized Google Sheet for persistent storage.
   * *See the `fetcher/` directory for source code and deployment instructions.*

2. **Exploratory Data Analysis & Statistical Testing (Python/Jupyter):**
   * Processed the raw datasets using **Pandas** and **NumPy**.
   * Conducted rigorous statistical analysis, including Analysis of Variance (ANOVA), to identify significant price discrepancies across different timeframes and municipalities.
   * *See the `analysis/` directory for the comprehensive Jupyter Notebook.*

## 📈 Key Data Insights

* **The "Richmond Night Drop" is Real:** Statistical modeling confirmed that fuel prices in Richmond systematically decrease late at night, hitting optimal lows of **149.8 cents/liter around 11:00 PM**.
* **Geographic Variance:** Identified clear pricing tiers between municipalities (e.g., Richmond vs. Port Moody vs. Vancouver core), proving that location-based fueling strategies can yield measurable cost savings.

## 📂 Repository Structure

```text
├── fetcher/
│   ├── gas_price_fetcher.js      # Serverless ETL script for data extraction
│   └── README.md                 # Deployment guide for the GAS pipeline
├── analysis/
│   ├── Vancouver_Gas_Price_Analysis.ipynb  # Main Jupyter notebook with EDA & ANOVA
│   ├── requirements.txt          # Python dependencies
│   └── README.md                 # Instructions to replicate the analysis
├── README.md                     # Project overview (You are here)
└── LICENSE                       # MIT License
