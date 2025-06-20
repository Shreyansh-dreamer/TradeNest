import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [allData, setAllData] = useState({});
  const [initialsBgColor, setInitialsBgColor] = useState("#A78BFA");

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
      .get("http://localhost:3002/userData", {
        withCredentials: true,
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
    const res = await axios.post("http://localhost:3002/logout", {}, { withCredentials: true });
    if(res.data.status==="logout") window.location.href = "http://localhost:5173";
  }

  const baseLinkClass = "text-gray-800 px-3 whitespace-nowrap";
  const activeLinkClass = "font-semibold underline";

  return (
    <div className="flex items-center justify-between px-4 h-16 w-full">
      <div>
        <img src="/logo.png" alt="logo" className="w-12" />
      </div>

      <div className="flex items-center ml-auto space-x-4">
        <nav className="hidden lg:flex items-center space-x-6">
          {menuItems.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => handleMenuClick(i)}
              className={`${baseLinkClass} ${selectedMenu === i ? activeLinkClass : ""
                } hover:text-red-600`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="lg:hidden relative">
          <button
            onClick={toggleMobileMenu}
            className="p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-800"
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
            <div className="absolute right-0 mt-3 w-40 bg-white border rounded shadow-lg z-200">
              {menuItems.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => handleMenuClick(i)}
                  className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="inline-block w-px h-10 bg-gray-300"></div>

        <div className="relative min-w-max">
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={toggleProfileDropdown}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold hover:opacity-80"
              style={{ backgroundColor: initialsBgColor }}
            >
              {getInitials(allData.username)}
            </div>
          </div>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-4 w-40 bg-white border rounded shadow-lg z-200">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
