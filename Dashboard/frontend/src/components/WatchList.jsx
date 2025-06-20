import { useState, useRef, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tooltip } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { DoughnutChart } from './DoughnutChart';
import BuyActionWindow from './BuyActionWindow';
import SellActionWindow from './SellActionWindow';

const Watchlist = () => {
  const [activeId, setActiveId] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [mobileActiveId, setMobileActiveId] = useState(null); // toggle ID for showing buttons
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [searchVisible, setSearchVisible] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [watchlistData, setWatchlistData] = useState([]);
  const [watchlistError, setWatchlistError] = useState('');
  const [searchError, setSearchError] = useState('');
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [activeTrade, setActiveTrade] = useState(null);

  const dropdownRef = useRef(null);

  // Toggle action buttons on click for all screens (removed screen size check)
  const handleToggleMobileActive = (i) => {
    setMobileActiveId((prev) => (prev === i ? null : i));
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setSearchData([]);
    setSearchError('');
  };

  const handleSearchSubmit = async () => {
    try {
      setSearchLoading(true);
      const res = await axios.post(
        'http://localhost:3002/get-stocks',
        { data: searchValue },
        { withCredentials: true }
      );
      setSearchData(res.data.response || []);
    } catch (err) {
      if (err.response?.status === 403) setSearchError('No results found!');
    } finally {
      setSearchLoading(false);
    }
  };

  const fetchWatchlist = async () => {
    try {
      setWatchlistLoading(true);
      const res = await axios.get('http://localhost:3002/watchListData', {
        withCredentials: true,
      });
      setWatchlistData(res.data.response || []);
    } catch (err) {
      if (err.response?.status === 400) setWatchlistError('Empty watchlist.');
    } finally {
      setWatchlistLoading(false);
    }
  };

  const handleAdd = async (symbol) => {
    await axios.post(
      'http://localhost:3002/addFavourites',
      { name: symbol },
      { withCredentials: true }
    );
    fetchWatchlist();
    setSearchData([]);
  };

  const handleDelete = async (symbol) => {
    await axios.post(
      'http://localhost:3002/deleteFavourites',
      { name: symbol },
      { withCredentials: true }
    );
    fetchWatchlist();
  };

  const handleTrade = (role, stock) => setActiveTrade({ role, stock });
  const closeTrade = () => setActiveTrade(null);

  useEffect(() => {
    fetchWatchlist();

    // Close dropdown and mobile toggles on outside click
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchVisible(false);
        setSearchError('');
      }
      // Close mobileActiveId if clicking outside watchlist items
      if (!event.target.closest('.watchlist-item')) {
        setMobileActiveId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex flex-col p-4 text-[#424242] border border-black/10 h-screen max-w-full overflow-y-auto">
        {/* Search input and results dropdown */}
        <div
          className={`flex justify-between border border-black/10 shadow p-2 relative ${searchLoading ? 'bg-black/2' : ''
            }`}
          ref={dropdownRef}
          onClick={() => setSearchVisible(true)}
        >
          <input
            type="text"
            placeholder="Search eg:infy bse, nifty fut, index fund, etc"
            className="placeholder:text-xs z-10 placeholder:text-[#9b9b9b] ml-2 md:ml-0 focus:outline-none w-[80%]"
            disabled={searchLoading}
            value={searchValue}
            onChange={handleChange}
          />
          {searchLoading && (
            <p className="text-sm my-auto opacity-40">Searching...</p>
          )}
          <button disabled={searchLoading || searchData.length > 0} onClick={handleSearchSubmit}>
            <SearchIcon style={{ color: 'gray' }} />
          </button>

          {searchData.length > 0 && searchVisible && (
            <div className="absolute bg-white z-40 w-full top-full left-0 flex flex-col border border-t-0 border-black/10">
              {searchError && (
                <p className="text-md text-red-500 text-center">{searchError}</p>
              )}
              {searchData.map((stock, i) => (
                <div
                  key={i}
                  className={`flex justify-between px-4 py-4 watchlist-item cursor-pointer relative
                  ${hoverId === i ? 'bg-black/5' : ''}
                  ${mobileActiveId === i ? 'bg-black/10' : ''}
                `}
                  onMouseEnter={() => setHoverId(i)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => handleToggleMobileActive(i)}
                >
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold text-gray-500">{stock.symbol}</p>
                  </div>

                  <div className="relative flex items-center space-x-3 w-full justify-end">
                    {/* Price and change */}
                    <div
                      className={`flex items-center space-x-3 transition-opacity duration-200 ease-in-out ${hoverId === i || mobileActiveId === i
                          ? 'opacity-0 pointer-events-none'
                          : 'opacity-100'
                        }`}
                    >
                      <span className="text-sm">{stock.change}%</span>
                      {stock.change < 0 ? (
                        <ExpandMoreIcon fontSize="small" className="text-red-500" />
                      ) : (
                        <ExpandLessIcon fontSize="small" className="text-green-500" />
                      )}
                      <p className="text-xs text-gray-500">₹{stock.curr}</p>
                    </div>

                    {/* Buttons overlay */}
                    {(hoverId === i || mobileActiveId === i) && (
                      <div className="absolute right-0 flex items-center space-x-1 bg-white px-1 py-0.5 rounded shadow-md z-45">
                        <Tooltip title="Buy(B)" arrow>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTrade('Buy', stock);
                            }}
                            className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:opacity-70"
                          >
                            Buy
                          </button>
                        </Tooltip>
                        <Tooltip title="Sell(S)" arrow>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTrade('Sell', stock);
                            }}
                            className="bg-red-500 text-white px-3 py-1 text-xs rounded hover:opacity-70"
                          >
                            Sell
                          </button>
                        </Tooltip>
                        {!watchlistData.some((w) => w.symbol === stock.symbol) && (
                          <Tooltip title="Add" arrow>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAdd(stock.symbol);
                              }}
                              className="bg-green-700 px-2 py-1 rounded text-xs hover:opacity-70"
                            >
                              <AddIcon style={{ color: 'white', fontSize: 'small' }} />
                            </button>
                          </Tooltip>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-[0.65rem] text-[#9b9b9b] mt-2 ml-4 md:ml-0">
          Watchlists ({watchlistData.length}/250)
        </p>

        <div className="flex flex-col border border-black/10 rounded bg-black/2">
          {watchlistData.map((stock, i) => (
            <div
              key={i}
              className={`watchlist-item flex justify-between px-4 py-4 cursor-pointer relative
              ${hoverId === i ? 'bg-black/5' : ''}
              ${mobileActiveId === i ? 'bg-black/10' : ''}
            `}
              onMouseEnter={() => setHoverId(i)}
              onMouseLeave={() => setHoverId(null)}
              onClick={() => handleToggleMobileActive(i)}
            >
              <p
                className={`text-sm ${stock.change < 0 ? 'text-red-600' : 'text-green-500'
                  }`}
              >
                {stock.symbol}
              </p>

              <div className="relative flex items-center w-full justify-end">
                <div
                  className={`flex items-center space-x-3 transition-opacity duration-200 ease-in-out ${hoverId === i || mobileActiveId === i
                      ? 'opacity-0 pointer-events-none'
                      : 'opacity-100'
                    }`}
                >
                  <span className="text-sm">{stock.change}%</span>
                  {stock.change < 0 ? (
                    <ExpandMoreIcon fontSize="small" className="text-red-500" />
                  ) : (
                    <ExpandLessIcon fontSize="small" className="text-green-500" />
                  )}
                  <p
                    className={`text-sm w-12 text-right ${stock.change < 0 ? 'text-red-500' : 'text-green-500'
                      }`}
                  >
                    {stock.curr}
                  </p>
                </div>

                {(hoverId === i || mobileActiveId === i) && (
                  <div className="absolute right-0 flex items-center space-x-1 bg-white px-1 py-0.5 rounded shadow-md z-10">
                    <Tooltip title="Buy(B)" arrow>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrade('Buy', stock);
                        }}
                        className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:opacity-70"
                      >
                        Buy
                      </button>
                    </Tooltip>
                    <Tooltip title="Sell(S)" arrow>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrade('Sell', stock);
                        }}
                        className="bg-red-500 text-white px-3 py-1 text-xs rounded hover:opacity-70"
                      >
                        Sell
                      </button>
                    </Tooltip>
                    <Tooltip title="Remove" arrow>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(stock.symbol);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                      </button>
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {watchlistData.length > 0 && (
          <div className="mt-6 flex flex-col items-center w-full px-2">
            <h2 className="text-sm font-semibold mb-4 text-center">
              Watchlist Overview
            </h2>
            <div className="w-full max-w-[500px] aspect-square relative">
              <DoughnutChart
                data={{
                  labels: watchlistData.map((stock) => stock.symbol),
                  datasets: [
                    {
                      data: watchlistData.map((stock) => Math.abs(stock.change)),
                      backgroundColor: [
                        '#4CAF50',
                        '#FF5722',
                        '#2196F3',
                        '#FFC107',
                        '#E91E63',
                        '#9C27B0',
                        '#3F51B5',
                        '#00BCD4',
                        '#8BC34A',
                        '#FF9800',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
        )}
      </div>
      {activeTrade?.role === 'Buy' && (
        <BuyActionWindow stock={activeTrade.stock} onClose={closeTrade} />
      )}
      {activeTrade?.role === 'Sell' && (
        <SellActionWindow stock={activeTrade.stock} onClose={closeTrade} />
      )}
    </>
  );
};

export default Watchlist;
