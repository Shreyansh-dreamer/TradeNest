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
      symbol:  company.companyName,
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



const { spawn } = require('child_process');
const path = require('path');

router.get("/predict/:symbol", verifyUser, async (req, res) => {
  const symbol = req.params.symbol;
  if (!symbol) return res.status(400).json({ success: false, error: "Symbol is required" });

  const scriptPath = path.join(__dirname, "../utils/predict.py");
  
  const runPython = (cmd) => {
    return new Promise((resolve, reject) => {
      const child = spawn(cmd, [scriptPath, symbol]);
      let stdout = "";
      let stderr = "";
      child.stdout.on("data", (data) => { stdout += data.toString(); });
      child.stderr.on("data", (data) => { stderr += data.toString(); });
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