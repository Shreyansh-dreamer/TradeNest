import { useEffect, useState } from "react";
import axios from "axios";

export const useStockData = (searchSymbol = "") => {
    const [stockData, setStockData] = useState([]);
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3002/userData", {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data && Array.isArray(res.data.favourites)) {
                    setAllData(res.data.favourites);
                } else {
                    console.warn("User data or 'favourites' array not found or invalid in response:", res.data);
                    setAllData([]); 
                }
            })
            .catch((err) => {
                console.error("Error fetching user favourites:", err);
                setAllData([]);
            });
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:3002/userData", {
                withCredentials: true,
            })
            .then((res) => {
                setAllData(res.data.favourites);
            })
            .catch((err) => {
                console.error("Error fetching user favourites", err);
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let symbolsToFetch = ["RELIANCE"]; //, "TCS","HDFCBANK", "INFY", "AXISBANK", "WIPRO"
            if (allData.length > 0) {
                const favsUpper = allData.map((f) => f.toUpperCase());
                symbolsToFetch = [...new Set([...symbolsToFetch, ...favsUpper])];
            }
            if (searchSymbol) {
                symbolsToFetch = [searchSymbol.toUpperCase()];
            }
            const fetchedData = [];
            for (const symbol of symbolsToFetch) {
                try {
                    const res = await axios.get(`https://stock.indianapi.in/stock?name=${symbol}`, {
                        headers: {
                            // 'X-Api-Key': '' // Keep your API key secure
                        }
                    });
                    const d = res.data;
                    if (!d || typeof d.currentPrice?.NSE === 'undefined' || typeof d.percentChange === 'undefined') {
                        console.warn(`Skipping invalid data for ${symbol}:`, d);
                        continue; 
                    }
                    const price = +d.currentPrice.NSE;
                    const percentChange = +d.percentChange;
                    const netChange = (price * percentChange) / 100;

                    fetchedData.push({
                        name: (d.companyName || d.tickerId).split(" ")[0],
                        price: price,
                        percent: percentChange.toFixed(2),
                        netChange: netChange.toFixed(2),
                        isDown: percentChange < 0
                    });

                } catch (err) {
                    console.error(`Error fetching data for ${symbol}:`, err);
                }
            }
            setStockData(fetchedData);
        };
        fetchData();
    }, [searchSymbol, allData]);
    return stockData;
};




