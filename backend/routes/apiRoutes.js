const express = require('express');
const router = express.Router();
const { UsersModel } = require('../model/UsersModel');
const verifyUser = require("../Middlewares/verifyUser");
const axios = require("axios");
const yahooFinance = require("yahoo-finance2").default;

router.get('/niftySensex', async (req, res) => {
  try {
    const nifty = await yahooFinance.quote("^NSEI");
    const sensex = await yahooFinance.quote("^BSESN");

    res.json({
      nifty,
      sensex
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch index data" });
  }
});

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

router.get("/watchlistData", verifyUser, async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await UsersModel.findById(userId);
    const fav = userData.favourites;

    const favData = await Promise.all(
      fav.map(async (el) => {
        const symbol = el.symbol;

        try {
          const stockRes = await axios.get(`https://stock.indianapi.in/stock?name=${symbol}`, {
            headers: {
              "X-Api-Key": process.env.API_KEY,
            },
          });

          const data = stockRes.data;

          const price = parseFloat(data?.currentPrice?.BSE);
          if (isNaN(price)) {
            console.warn(`Invalid data for ${symbol}`, { price });
            return {
              ...el.toObject(),
              curr: null,
              net: null,
              change: null,
            };
          }
          const percentChange = parseFloat(data.percentChange);
          const newPrice = parseFloat(price + (price*percentChange / 100));
          const netChange = Math.abs(newPrice) - price;
          return {
            ...el.toObject(),
            curr: +price.toFixed(2),
            net: +netChange.toFixed(2),
            change: +percentChange.toFixed(2),
          };
        } catch (err) {
          console.error(`API fetch error for ${symbol}:`, err.message);
          return {
            ...el.toObject(),
            curr: null,
            net: null,
            change: null,
          };
        }
      })
    );

    return res.status(200).json({ response: favData });
  } catch (err) {
    console.error("Server error:", err.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;