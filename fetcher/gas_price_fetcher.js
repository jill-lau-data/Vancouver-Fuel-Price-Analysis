/**
 * Global Configuration
 */
const CONFIG = {
  STATION_SHEET_NAME: "StationIDs",
  PRICE_SHEET_NAME: "GasPrices",
  PRICE_REGEX: />([\d\.]+¢?)<\/span>/,
  BASE_URL: "https://www.gasbuddy.com/station/",
  HEADERS: ["Timestamp", "Station ID", "Regular Price"]
};

/**
 * Main function to ingest gas prices into Google Sheets.
 * Optimized for performance using batch updates.
 */
function getGasPrice() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const stationIdSheet = ss.getSheetByName(CONFIG.STATION_SHEET_NAME);
  let gasPricesSheet = ss.getSheetByName(CONFIG.PRICE_SHEET_NAME);

  // 1. Initial Validation
  if (!stationIdSheet) {
    Logger.log(`[Error] Sheet "${CONFIG.STATION_SHEET_NAME}" not found.`);
    return;
  }

  if (!gasPricesSheet) {
    gasPricesSheet = ss.insertSheet(CONFIG.PRICE_SHEET_NAME);
    gasPricesSheet.appendRow(CONFIG.HEADERS);
  }

  // 2. Fetch Station IDs (Batch Read)
  const stationIds = stationIdSheet.getRange("A2:A")
    .getValues()
    .filter(row => row[0] !== "");

  if (stationIds.length === 0) {
    Logger.log("[Warning] No station IDs found.");
    return;
  }

  // 3. Extraction Loop
  const timestamp = new Date();
  const results = []; // Buffer to store data for batch write

  stationIds.forEach(row => {
    const stationId = row[0];
    const url = `${CONFIG.BASE_URL}${stationId}`;
    let priceResult = "N/A";

    try {
      const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      
      if (response.getResponseCode() === 200) {
        const content = response.getContentText();
        const match = content.match(CONFIG.PRICE_REGEX);
        priceResult = match ? match[1] : "Not Found";
        Logger.log(`[Success] ID ${stationId}: ${priceResult}`);
      } else {
        priceResult = `HTTP ${response.getResponseCode()}`;
        Logger.log(`[Error] ID ${stationId}: ${priceResult}`);
      }
    } catch (e) {
      priceResult = "Exception";
      Logger.log(`[Exception] ID ${stationId}: ${e.message}`);
    }
    
    results.push([timestamp, stationId, priceResult]);
  });

  // 4. Batch Write to Sheet (Performance Optimization)
  // Instead of appendRow inside loop, we write all at once
  if (results.length > 0) {
    const lastRow = gasPricesSheet.getLastRow();
    gasPricesSheet.getRange(lastRow + 1, 1, results.length, CONFIG.HEADERS.length).setValues(results);
    Logger.log(`[Complete] Ingested ${results.length} records.`);
  }
}

/**
 * Automates the data collection by setting up a time-based trigger.
 */
function setupHourlyTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  
  // Clean up existing triggers to prevent duplicates
  triggers.forEach(t => {
    if (t.getHandlerFunction() === "getGasPrice") {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Create new hourly trigger
  ScriptApp.newTrigger("getGasPrice")
    .timeBased()
    .everyHours(1)
    .create();
    
  Logger.log("[Trigger] Hourly trigger established for getGasPrice().");
}
