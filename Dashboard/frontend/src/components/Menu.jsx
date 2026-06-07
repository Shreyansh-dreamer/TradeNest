import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../ThemeContext";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [allData, setAllData] = useState({});
  const [initialsBgColor, setInitialsBgColor] = useState("#A78BFA");
  const { dark, setDark } = useTheme();

  useEffect(() => {
    setInitialsBgColor(getRandomColor());
  }, []);

  const getRandomColor = () => {
    const colors = [
      "#F87171",
      "#60A5FA",
      "#34D399",
      "#FBBF24",
      "#A78BFA",
      "#38BDF8",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/userData`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then((res) => {
        setAllData(res.data);
      });
  }, []);

  const getInitials = (username) => {
    if (!username || typeof username !== "string") return "";

    const words = username.trim().split(/\s+/);
    let res = "";
    for (let i = 0; i < words.length && res.length < 2; i++) {
      if (words[i]) res += words[i][0].toUpperCase();
    }
    return res;
  };


  const menuItems = [
    { label: "Dashboard", to: "/" },
    { label: "Orders", to: "/orders" },
    { label: "Holdings", to: "/holdings" },
    { label: "Positions", to: "/positions" },
    { label: "Funds", to: "/funds" },
    { label: "Predict", to: "/predict" },
  ];

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setIsMobileMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogOut = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    if (res.data.status === "logout") {
      localStorage.removeItem("token");
      const redirectUrl = import.meta.env.VITE_MAIN_URL || "https://trade-nest-six.vercel.app";
      window.location.href = redirectUrl.startsWith("http") ? redirectUrl : `https://${redirectUrl}`;
    }
  }

  const baseLinkClass = "text-gray-700 dark:text-gray-600 px-3 whitespace-nowrap text-sm font-medium";
  const activeLinkClass = "font-semibold text-blue-600 dark:text-blue-400 underline underline-offset-4";

  return (
    <div className="flex items-center justify-between px-4 h-16 w-full bg-[var(--navbar-bg)]">
      <div>
        <img src="/logo.png" alt="TradeNest" className="w-12" />
      </div>

      <div className="flex items-center ml-auto space-x-3">
        <nav className="hidden lg:flex items-center space-x-4">
          {menuItems.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => handleMenuClick(i)}
              className={`${baseLinkClass} ${selectedMenu === i ? activeLinkClass : ""
                } hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Dark mode toggle */}
        <button
          id="dashboard-theme-toggle"
          onClick={() => setDark(!dark)}
          className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-color)] text-gray-600 dark:text-gray-600 hover:border-blue-400 hover:text-blue-500 transition-colors"
          aria-label="Toggle dark mode"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07l-.71.71M5.64 18.36l-.71.71m12.73 0l-.71-.71M5.64 5.64l-.71-.71M12 7a5 5 0 100 10A5 5 0 0012 7z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        <div className="lg:hidden relative">
          <button
            onClick={toggleMobileMenu}
            className="p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {isMobileMenuOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg shadow-lg z-200">
              {menuItems.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => handleMenuClick(i)}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 whitespace-nowrap transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-[var(--border-color)] mt-1 pt-1">
                <button
                  onClick={() => setDark(!dark)}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {dark ? "☀️ Light mode" : "🌙 Dark mode"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="inline-block w-px h-10 bg-gray-200 dark:bg-gray-700"></div>

        <div className="relative min-w-max">
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={toggleProfileDropdown}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold hover:opacity-80 text-xs"
              style={{ backgroundColor: initialsBgColor }}
            >
              {getInitials(allData.username)}
            </div>
          </div>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-4 w-40 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg shadow-lg z-200">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                onClick={handleLogOut}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
