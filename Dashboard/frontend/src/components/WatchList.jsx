import { useState, useRef, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tooltip } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { emitSocket, onSocket, getLastWatchlist } from '../socket';
import { DoughnutChart } from './DoughnutChart';
import BuyActionWindow from './BuyActionWindow';
import SellActionWindow from './SellActionWindow';

const Watchlist = () => {
  const [activeId, setActiveId] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [mobileActiveId, setMobileActiveId] = useState(null); 
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
        `${import.meta.env.VITE_API_URL}/get-stocks`,
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
    setWatchlistLoading(true);
    setWatchlistData(getLastWatchlist() || []);
    setWatchlistLoading(false);
  };

  const handleAdd = async (symbol) => {
    emitSocket('addFavourite', symbol, (res) => {
      if (res?.error) console.error(res.error);
      setSearchData([]);
    });
  };

  const handleDelete = async (symbol) => {
    emitSocket('deleteFavourite', symbol, (res) => {
      if (res?.error) console.error(res.error);
    });
  };

  const handleTrade = (role, stock) => setActiveTrade({ role, stock });
  const closeTrade = () => setActiveTrade(null);

  useEffect(() => {
    fetchWatchlist();
    const off = onSocket('watchlist', (data) => setWatchlistData(data || []));

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchVisible(false);
        setSearchError('');
      }
      if (!event.target.closest('.watchlist-item')) {
        setMobileActiveId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      off();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col p-4 text-[var(--text-primary)] bg-[var(--bg-primary)] border-r border-[var(--border-color)] h-[calc(100vh-4rem)] max-w-full overflow-y-auto w-full min-w-[34%]">
        <div
          className={`flex justify-between border border-[var(--border-color)] bg-[var(--bg-card)] rounded-md shadow-sm p-2 relative ${searchLoading ? 'opacity-80' : ''
            }`}
          ref={dropdownRef}
          onClick={() => setSearchVisible(true)}
        >
          <input
            type="text"
            placeholder="Search eg: infy bse, nifty fut..."
            className="placeholder:text-xs z-10 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] ml-2 focus:outline-none w-full"
            disabled={searchLoading}
            value={searchValue}
            onChange={handleChange}
          />
          {searchLoading && (
            <p className="text-xs my-auto opacity-50 whitespace-nowrap px-2">Searching...</p>
          )}
          <button disabled={searchLoading || searchData.length > 0} onClick={handleSearchSubmit} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <SearchIcon fontSize="small" />
          </button>

          {searchData.length > 0 && searchVisible && (
            <div className="absolute bg-[var(--bg-card)] z-40 w-full top-full left-0 flex flex-col border border-[var(--border-color)] shadow-lg rounded-b-md max-h-64 overflow-y-auto">
              {searchError && (
                <p className="text-sm text-red-500 text-center py-2">{searchError}</p>
              )}
              {searchData.map((stock, i) => (
                <div
                  key={i}
                  className={`flex justify-between px-4 py-3 watchlist-item cursor-pointer relative border-b border-[var(--border-color)] last:border-0
                  ${hoverId === i || mobileActiveId === i ? 'bg-[var(--bg-secondary)]' : ''}
                `}
                  onMouseEnter={() => setHoverId(i)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => handleToggleMobileActive(i)}
                >
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold text-[var(--text-primary)]">{stock.symbol}</p>
                  </div>

                  <div className="relative flex items-center space-x-3 w-full justify-end">
                    <div
                      className={`flex items-center space-x-2 transition-opacity duration-200 ease-in-out ${hoverId === i || mobileActiveId === i
                          ? 'opacity-0 pointer-events-none'
                          : 'opacity-100'
                        }`}
                    >
                      <span className="text-xs">{stock.change}%</span>
                      {stock.change < 0 ? (
                        <ExpandMoreIcon fontSize="small" className="text-red-500" />
                      ) : (
                        <ExpandLessIcon fontSize="small" className="text-green-500" />
                      )}
                      <p className="text-xs font-medium text-[var(--text-primary)]">₹{stock.curr}</p>
                    </div>

                    {(hoverId === i || mobileActiveId === i) && (
                      <div className="absolute right-0 flex items-center space-x-1 bg-[var(--bg-secondary)] px-1 py-0.5 rounded z-45">
                        <Tooltip title="Buy(B)" arrow>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTrade('Buy', stock);
                            }}
                            className="bg-blue-600 text-white px-3 py-1 text-xs font-medium rounded hover:bg-blue-700 transition-colors"
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
                            className="bg-red-500 text-white px-3 py-1 text-xs font-medium rounded hover:bg-red-600 transition-colors"
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
                              className="bg-green-600 px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors"
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

        <div className="flex justify-between items-center mt-4 mb-2">
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">My Watchlist</h2>
            <p className="text-xs text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded-full">
              {watchlistData.length}/250
            </p>
        </div>

        <div className="flex flex-col flex-1 border border-[var(--border-color)] rounded-md bg-[var(--bg-card)] overflow-y-auto shadow-sm">
          {watchlistData.map((stock, i) => (
            <div
              key={i}
              className={`watchlist-item flex justify-between px-4 py-3 cursor-pointer relative border-b border-[var(--border-color)] last:border-0
              ${hoverId === i || mobileActiveId === i ? 'bg-[var(--bg-secondary)]' : ''}
            `}
              onMouseEnter={() => setHoverId(i)}
              onMouseLeave={() => setHoverId(null)}
              onClick={() => handleToggleMobileActive(i)}
            >
              <p
                className={`text-sm font-medium ${stock.change < 0 ? 'text-red-500' : 'text-green-500'
                  }`}
              >
                {stock.symbol}
              </p>

              <div className="relative flex items-center justify-end w-2/3">
                <div
                  className={`flex items-center space-x-2 transition-opacity duration-200 ease-in-out ${hoverId === i || mobileActiveId === i
                      ? 'opacity-0 pointer-events-none'
                      : 'opacity-100'
                    }`}
                >
                  <span className="text-xs text-[var(--text-muted)]">{stock.change}%</span>
                  {stock.change < 0 ? (
                    <ExpandMoreIcon fontSize="small" className="text-red-500" />
                  ) : (
                    <ExpandLessIcon fontSize="small" className="text-green-500" />
                  )}
                  <p
                    className={`text-sm font-medium w-16 text-right ${stock.change < 0 ? 'text-red-500' : 'text-green-500'
                      }`}
                  >
                    {stock.curr}
                  </p>
                </div>

                {(hoverId === i || mobileActiveId === i) && (
                  <div className="absolute right-0 flex items-center space-x-1 bg-[var(--bg-secondary)] px-1 py-0.5 rounded shadow-sm z-10 border border-[var(--border-color)]">
                    <Tooltip title="Buy(B)" arrow>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrade('Buy', stock);
                        }}
                        className="bg-blue-600 text-white px-3 py-1 text-xs font-medium rounded hover:bg-blue-700 transition-colors"
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
                        className="bg-red-500 text-white px-3 py-1 text-xs font-medium rounded hover:bg-red-600 transition-colors"
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
                        className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ml-1"
                      >
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                      </button>
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          ))}
          {watchlistData.length === 0 && (
             <div className="flex flex-col items-center justify-center h-48 text-[var(--text-muted)] p-4 text-center">
                <p className="text-sm">Your watchlist is empty.</p>
                <p className="text-xs mt-2">Use the search bar above to add instruments.</p>
             </div>
          )}
        </div>

        {watchlistData.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex flex-col items-center w-full px-2">
            <h2 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4 text-center">
              Watchlist Volatility Overview
            </h2>
            <div className="w-full max-w-[200px] aspect-square relative opacity-80 hover:opacity-100 transition-opacity">
              <DoughnutChart
                data={{
                  labels: watchlistData.map((stock) => stock.symbol),
                  datasets: [
                    {
                      data: watchlistData.map((stock) => Math.abs(stock.change)),
                      backgroundColor: [
                        '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
                        '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
                      ],
                      borderWidth: 0,
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
