import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";
import { onSocket, getLastIndices } from '../socket';

const TopBar = () => {
  const [indices, setIndices] = useState({ nifty: null, sensex: null });

  useEffect(() => {
    const current = getLastIndices();
    if (current) {
      setIndices({ nifty: current.nifty?.regularMarketPrice || null, sensex: current.sensex?.regularMarketPrice || null });
    }
    const off = onSocket('indices', (data) => {
      setIndices({ nifty: data.nifty?.regularMarketPrice || null, sensex: data.sensex?.regularMarketPrice || null });
    });
    return () => off();
  }, []);

  return (
    <div className="flex flex-row w-full border-b border-[var(--border-color)] text-xs sm:text-sm bg-[var(--navbar-bg)] shadow-sm">
      <div className="min-w-[34%] flex justify-around items-center border-r-2 border-[var(--border-color)] h-16 px-2">
        <div className="flex flex-col items-center space-x-1">
          <span className="font-semibold text-gray-600 dark:text-gray-600 whitespace-nowrap text-xs tracking-wide">NIFTY 50</span>
          <p className="text-green-600 dark:text-green-400 font-medium">
            {indices.nifty !== null ? indices.nifty.toLocaleString("en-IN") : "—"}
          </p>
        </div>
        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex flex-col items-center space-x-1">
          <span className="font-semibold text-gray-600 dark:text-gray-600 whitespace-nowrap text-xs tracking-wide">SENSEX</span>
          <p className="text-green-600 dark:text-green-400 font-medium">
            {indices.sensex !== null ? indices.sensex.toLocaleString("en-IN") : "—"}
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
