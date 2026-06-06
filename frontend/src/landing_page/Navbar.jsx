import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { useTheme } from "../ThemeContext";

const MotionLink = motion(Link);

function Navbar() {
    const location = useLocation();
    const [show, setShow] = useState(false);
    const { dark, setDark } = useTheme();

    const navLinkClass = (path) =>
        `hidden md:inline-block font-semibold cursor-pointer transition-colors duration-150 ${
            location.pathname === path ? "text-blue-500" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        }`;

    return (
        <div className="w-full h-[4.5rem] bg-[var(--navbar-bg)] border-b border-[var(--border-color)] fixed top-0 z-10 flex items-center shadow-sm backdrop-blur-sm">
            <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-screen-xl mx-auto">
                <div className="w-[9rem] cursor-pointer">
                    <Link to="/"><img src="/media/images/logo.png" alt="TradeNest" /></Link>
                </div>

                <div className="flex items-center gap-5">
                    <NavLink to="/signup" className={navLinkClass("/signup")}>Sign up</NavLink>
                    <NavLink to="/about" className={navLinkClass("/about")}>About</NavLink>
                    <NavLink to="/product" className={navLinkClass("/product")}>Products</NavLink>
                    <NavLink to="/pricing" className={navLinkClass("/pricing")}>Pricing</NavLink>
                    <NavLink to="/support" className={navLinkClass("/support")}>Help</NavLink>

                    <button
                        onClick={() => setDark(!dark)}
                        id="theme-toggle"
                        className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-blue-400 hover:text-blue-500 transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        <FontAwesomeIcon icon={dark ? faSun : faMoon} size="sm" />
                    </button>

                    <motion.button
                        className="relative cursor-pointer flex items-center justify-center"
                        onClick={() => setShow(!show)}
                        transition={{ duration: 0.3 }}
                    >
                        <FontAwesomeIcon
                            icon={show ? faX : faBars}
                            size="lg"
                            className="text-[var(--text-primary)]"
                        />
                        {show && (
                            <div className="absolute z-100 w-[92vw] md:w-[40rem] mt-[1.6rem] border border-[var(--border-color)] shadow-xl bg-[var(--bg-card)] right-0 top-full rounded-b-lg">
                                <div className="grid sm:hidden grid-cols-2 gap-x-6 gap-y-4 font-normal text-[var(--text-secondary)] p-4 text-left border-b border-[var(--border-color)]">
                                    <div><Link to="/signup" className="hover:text-blue-500">Sign up</Link></div>
                                    <div><Link to="/about" className="hover:text-blue-500">About</Link></div>
                                    <div><Link to="/product" className="hover:text-blue-500">Products</Link></div>
                                    <div><Link to="/pricing" className="hover:text-blue-500">Pricing</Link></div>
                                    <div><Link to="/support" className="hover:text-blue-500">Help</Link></div>
                                    <div>
                                        <button onClick={() => setDark(!dark)} className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-blue-500">
                                            <FontAwesomeIcon icon={dark ? faSun : faMoon} size="sm" />
                                            {dark ? "Light mode" : "Dark mode"}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid sm:hidden grid-cols-2 gap-x-6 gap-y-3 md:flex md:justify-between font-semibold text-[var(--text-secondary)] p-4 text-left border-b border-[var(--border-color)]">
                                    <div className="flex md:flex-col items-start md:items-center hover:opacity-75">
                                        <img src="/media/images/kite-logo.svg" alt="nexus" className="w-[2rem] ml-1" />
                                        <span className="text-[var(--text-primary)] p-1 font-medium hover:text-blue-500">Nexus</span>
                                        <span className="text-[var(--text-muted)] font-normal text-sm hidden md:inline-block">Trading Platform</span>
                                    </div>
                                    <div className="flex md:flex-col items-start md:items-center hover:opacity-75">
                                        <img src="/media/images/Console-logo.png" alt="ledger" className="w-[2.3rem]" />
                                        <span className="text-[var(--text-primary)] p-1 font-medium hover:text-blue-500">Ledger</span>
                                        <span className="text-[var(--text-muted)] font-normal text-sm hidden md:inline-block">Back Office</span>
                                    </div>
                                    <div className="flex md:flex-col items-start md:items-center hover:opacity-75">
                                        <img src="/media/images/kite-connect-logo.svg" alt="nestapi" className="w-[2.2rem]" />
                                        <span className="text-[var(--text-primary)] p-1 font-medium hover:text-blue-500">NestAPI</span>
                                        <span className="text-[var(--text-muted)] font-normal text-sm hidden md:inline-block">Market APIs</span>
                                    </div>
                                    <div className="flex md:flex-col items-start md:items-center hover:opacity-75">
                                        <img src="/media/images/coin-logo.svg" alt="invest" className="w-[2rem] ml-1" />
                                        <span className="text-[var(--text-primary)] p-1 font-medium hover:text-blue-500">Invest</span>
                                        <span className="text-[var(--text-muted)] font-normal text-sm hidden md:inline-block">Mutual Funds</span>
                                    </div>
                                    <div className="md:hidden flex items-start hover:opacity-75 ml-2">
                                        <img src="/media/images/varsity-logo.png" alt="academy" className="w-[1.5rem]" />
                                        <span className="text-[var(--text-primary)] font-medium hover:text-blue-500 ml-1.5">Learn</span>
                                    </div>
                                    <div className="md:hidden flex items-start hover:opacity-75 ml-2">
                                        <img src="/media/images/tqna-logo.png" alt="forum" className="w-[1.5rem] mt-1" />
                                        <span className="text-[var(--text-primary)] font-medium hover:text-blue-500 ml-2">Forum</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="md:flex">
                                        <div className="grid grid-cols-2 mt-[0.8rem] pb-[1.5rem] gap-x-11 gap-y-1.5 font-normal text-[var(--text-secondary)] p-2 text-left border-b border-[var(--border-color)] ml-2">
                                            <div className="font-bold mb-2 text-[var(--text-primary)]">Tools</div>
                                            <div className="font-bold mb-2 text-[var(--text-primary)]">Updates</div>
                                            <div><a className="hover:text-blue-500 cursor-pointer">Calculators</a></div>
                                            <div><a className="hover:text-blue-500 cursor-pointer">TradeNest Blog</a></div>
                                            <div><a className="hover:text-blue-500 cursor-pointer">Brokerage calculator</a></div>
                                            <div><a className="hover:text-blue-500 cursor-pointer">Announcements</a></div>
                                            <div><a className="hover:text-blue-500 cursor-pointer">Margin calculator</a></div>
                                            <div><a className="hover:text-blue-500 cursor-pointer">IPOs</a></div>
                                            <div><a className="hover:text-blue-500 cursor-pointer">SIP calculator</a></div>
                                            <div><a className="hover:text-blue-500 cursor-pointer">Markets</a></div>
                                        </div>

                                        <div className="p-2 mt-[0.8rem] pb-[1.5rem] hidden md:block">
                                            <div className="ml-5 text-[var(--text-secondary)] font-bold mb-4 text-left">Education</div>
                                            <div className="flex flex-row hover:text-blue-500">
                                                <div className="ml-5 hover:opacity-80">
                                                    <img src="/media/images/varsity-logo.png" alt="learn" className="ml-1.5 mb-2" />
                                                    <span className="hover:text-blue-500 font-normal text-[var(--text-secondary)]">Learn</span>
                                                </div>
                                                <div className="ml-9 hover:opacity-80">
                                                    <img src="/media/images/tqna-logo.png" alt="forum" className="ml-1.5 mb-3" />
                                                    <span className="hover:text-blue-500 font-normal text-[var(--text-secondary)]">Forum</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;