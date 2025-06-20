import { Route, Routes } from "react-router-dom";
import Funds from "./Funds";
import Holdings from "./Holdings";
import { useState, useEffect } from 'react';
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import axios from "axios";

const Dashboard = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
  const fetchHoldings = () => {
    axios.get("http://localhost:3002/allHoldings", { withCredentials: true })
      .then(res => setAllHoldings(res.data))
      .catch(err => console.error(err));
  };

  fetchHoldings();

  const interval = setInterval(() => {
    fetchHoldings();
  }, 300000); 

  return () => clearInterval(interval); 
}, []);

  const isSmallScreen = window.innerWidth < 768;

  return (
    <div className="flex h-screen">
      <button
        className="md:hidden top-4 right-29 z-50 bg-gray-300 text-black text-xl p-2 rounded"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? "🠸":"🠺"}
      </button>
      <div
        className={`
          fixed z-40 h-full bg-white
          transition-transform duration-300 ease-in-out
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 
          md:static md:block
          md:w-[34%] w-full
          overflow-y-auto
        `}
      >
      <WatchList />
      </div>
      <div className="flex-1 overflow-y-auto p-4 ">
        <Routes>
          <Route exact path="/" element={<Summary allHoldings={allHoldings} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings allHoldings={allHoldings} />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;