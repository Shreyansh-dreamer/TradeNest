const express = require('express');
const router = express.Router();
const { UsersModel } = require('../model/UsersModel');
const verifyUser = require("../Middlewares/verifyUser");
const axios = require("axios");


router.post("/get-stocks", async (req, res) => {
  let { data } = req.body;
  if (!data) return res.status(200).json({ success: false, message: "Enter name to search" });
  try {
    let response = await axios.get(`https://stock.indianapi.in/stock?name=${data}`, {
      headers: {
        'X-Api-Key': process.env.API_KEY
      }
    });
    const peerList = response.data.companyProfile.peerCompanyList.map(company => ({
      symbol: company.companyName,
      curr: company.price,
      change: company.percentChange,
      net: company.netChange,
    }));
    if (!response.data || response.data.error) {
      return res.status(403).json({ success: false, message: "No results found" })
    }
    else if (response) return res.status(200).json({ response: peerList });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Try again!" });
  }
})

router.get("/search-ticker/:name", async (req, res) => {
  try {
    const query = req.params.name;
    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=1&newsCount=0`;
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const quotes = response.data?.quotes;
    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ success: false, error: "Ticker match not found" });
    }
    const bestMatchTicker = quotes[0].symbol;
    return res.status(200).json({ success: true, ticker: bestMatchTicker });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});


const { spawn } = require('child_process');
const path = require('path');

router.get("/predict/:symbol", verifyUser, async (req, res) => {
  let symbol = req.params.symbol;
  if (!symbol) return res.status(400).json({ success: false, error: "Symbol is required" });
  const scriptPath = path.join(__dirname, "../utils/predict.py");
  let ticker = symbol;
  try {
    const yahooSearchUrl = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(ticker)}&quotesCount=1`;
    const searchRes = await axios.get(yahooSearchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (searchRes.data?.quotes && searchRes.data.quotes.length > 0) {
      ticker = searchRes.data.quotes[0].symbol;
      console.log(`Resolved target to exact Yahoo Ticker: ${ticker}`);
    } else {
      if (!ticker.includes('.')) ticker += '.NS';
    }
  } catch (lookupErr) {
    console.warn("Yahoo autocomplete lookup failed, using fallback tracking structure:", lookupErr.message);
    if (!ticker.includes('.')) ticker += '.NS';
  }

  const runPython = (cmd) => {
    return new Promise((resolve, reject) => {
      const child = spawn(cmd, [scriptPath, ticker]);
      let stdout = "";
      let stderr = "";
      child.stdout.on("data", (data) => { stdout += data.toString(); });
      child.stderr.on("data", (data) => { stderr += data.toString(); });
      child.on("error", (err) => { reject(err); });
      child.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(stderr || `Python process exited with code ${code}`));
        } else {
          resolve(stdout);
        }
      });
    });
  };

  try {
    try {
      const result = await runPython("python3");
      return res.status(200).json(JSON.parse(result));
    } catch (err) {
      console.log("python3 failed, trying python...", err.message);
      const result = await runPython("python");
      return res.status(200).json(JSON.parse(result));
    }
  } catch (err) {
    console.error("Prediction failed:", err);
    return res.status(500).json({ success: false, error: err.message || "Failed to run prediction model" });
  }
});

module.exports = router;