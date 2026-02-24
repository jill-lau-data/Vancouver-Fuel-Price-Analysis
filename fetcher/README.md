# 🛠️ Automated Data Ingestion Pipeline (Google Apps Script)

**A serverless ETL (Extract, Transform, Load) solution designed to automate the collection of real-time retail fuel pricing data from GasBuddy.**

![Google Apps Script](https://img.shields.io/badge/Google_Apps_Script-4285F4?style=flat&logo=google-apps-script&logoColor=white)
![Google Sheets](https://img.shields.io/badge/Google_Sheets-34A853?style=flat&logo=google-sheets&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active_Production-success)

## 📖 Introduction

This component serves as the **Data Ingestion Layer** for the Vancouver Fuel Price Analysis project. Using Google Apps Script (GAS), it bypasses the need for dedicated server infrastructure to perform scheduled web scraping, ensuring a consistent and cost-effective flow of raw data into our analysis environment.



## ⚙️ How it Works

The script is engineered to handle high-frequency data retrieval for 18 targeted fuel stations across the Greater Vancouver area.

1. **Extraction:** The script targets specific Station IDs on GasBuddy.com using `UrlFetchApp`.
2. **Transformation:** Raw HTML/JSON responses are parsed to isolate the `Regular Price` and `Timestamp`.
3. **Loading:** Data is appended to a centralized Google Sheet, creating a persistent time-series database.

## 🗂️ Data Architecture

The ingestion engine relies on two primary data structures within the spreadsheet:

| Tab Name | Function | Data Source |
| :--- | :--- | :--- |
| **`StationIDs`** | **Master Data:** Contains Station ID, Name, Area, and Brand. | Manual/Static |
| **`GasPrices`** | **Transactional Data:** Stores Timestamp, Station ID, and Regular Price. | Automated (Script) |

## 🚀 Deployment Guide

To deploy this pipeline in your own environment:

1. **Initialize Spreadsheet:** Create a new Google Sheet and define the `StationIDs` and `GasPrices` tabs.
2. **Access Apps Script:** Navigate to `Extensions` > `Apps Script`.
3. **Source Code:** Copy the contents of [`gas_price_fetcher.js`](./gas_price_fetcher.js) into the editor.
4. **Configuration:** Ensure the `Sheet ID` and tab names in the script match your local setup.
5. **Automation:** Click the **Triggers (Clock icon)** in the sidebar. Set the `getGasPrice` function to run on a **Time-driven** trigger (e.g., Hourly) to begin the automated collection.

## 🎯 Selection Logic (The 18-Station Strategy)

The stations were strategically selected based on two criteria:
* **Hypothesis Testing:** Stations in Richmond were chosen to validate the "late-night price drop" theory.
* **Geographical Benchmarking:** Stations in Vancouver, Burnaby, and Port Moody were selected based on proximity to each other to minimize "location noise" when comparing brand-specific pricing.
* **Cheapest Market Selection:** Heavily weighted towards stations consistently ranked as "Top 5 Cheapest" on GasBuddy to ensure the analysis focuses on the competitive edge of the market.

## 📑 Data Dictionary

### GasPrices (Fact Table)
* `Timestamp`: ISO 8601 formatted time of retrieval.
* `Station ID`: Foreign key linked to the Master Data.
* `Regular Price`: Unit price in CAD cents (standardized for calculation).

### StationIDs (Dimension Table)
* `Station ID`: Unique identifier.
* `Station Name / Brand`: Service provider details.
* `Area / Location`: Specific municipality and cross-streets for geospatial grouping.

## 📬 Contact

**Jill Lau** | Senior Analytics Engineer  
Specializing in Serverless Data Pipelines & BI Solutions  
📧 [jill.yt.lau@gmail.com](mailto:jill.yt.lau@gmail.com)
