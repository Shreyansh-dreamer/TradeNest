import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";

const TopBar = () => {
  const [indices, setIndices] = useState({ nifty: null, sensex: null });

  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const res = await axios.get("http://localhost:3002/niftySensex", {
          withCredentials: true,
        });
        setIndices({
          nifty: res.data.nifty?.regularMarketPrice || null,
          sensex: res.data.sensex?.regularMarketPrice || null,
        });
      } catch (err) {
        console.error("Failed to fetch indices", err);
      }
    };

    fetchIndices();
    const interval = setInterval(fetchIndices, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row w-full border-b border-gray-200 text-xs sm:text-sm">
      <div className="min-w-[34%] flex justify-around items-center border-r-2 border-gray-200 h-16 px-2">
        <div className="flex flex-col items-center space-x-1">
          <span className="font-medium whitespace-nowrap">NIFTY 50</span>
          <p className="text-green-500">
            {indices.nifty !== null ? indices.nifty.toLocaleString("en-IN") : "Loading..."}
          </p>
        </div>
        <div className="flex flex-col items-center space-x-1">
          <span className="font-medium whitespace-nowrap">SENSEX</span>
          <p className="text-green-500">
            {indices.sensex !== null ? indices.sensex.toLocaleString("en-IN") : "Loading..."}
          </p>
        </div>
      </div>
      <div className="w-full">
        <Menu />
      </div>
    </div>
  );
};

export default TopBar;
