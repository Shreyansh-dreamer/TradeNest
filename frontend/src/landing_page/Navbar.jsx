import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"; 
import { NavLink } from "react-router-dom";

const MotionLink = motion(Link);

function Navbar() {
    const location=useLocation()
    const [show, setShow] = useState(false);
    return (
        <div className="w-full h-[4.5rem] bg-white border-b-2 relative border-gray-200 items-center fixed top-0 z-10 py-[1rem] mt-[0.6rem]">
            <div className="flex justify-between md:justify-around">
                <div className="inline w-[10rem] p-2 mt-1 cursor-pointer">
                    <Link to="/"><img src="/media/images/logo.svg" alt="logo" /></Link>
                </div>
                <div className=" p-2 ml-[4rem]">
                    <div className="flex justify-between gap-[1.5rem]">
                        <NavLink
                            to="/signup"
                            className={`hidden md:inline-block font-semibold cursor-pointer ${location.pathname === "/signup" ? "text-blue-500" : "text-gray-500"}`}
                        >
                            Signup
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={`hidden md:inline-block font-semibold cursor-pointer ${location.pathname === "/about" ? "text-blue-500" : "text-gray-500"}`}
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/product"
                            className={`hidden md:inline-block font-semibold cursor-pointer ${location.pathname === "/product" ? "text-blue-500" : "text-gray-500"}`}
                        >
                            Products
                        </NavLink>
                        <NavLink
                            to="/pricing"
                            className={`hidden md:inline-block font-semibold cursor-pointer ${location.pathname === "/pricing" ? "text-blue-500" : "text-gray-500"}`}
                        >
                            Pricing
                        </NavLink>
                        <NavLink
                            to="/support"
                            className={`hidden md:inline-block font-semibold cursor-pointer ${location.pathname === "/support" ? "text-blue-500" : "text-gray-500"}`}
                        >
                            Support
                        </NavLink>
                        <motion.button className="relative cursor-pointer mr-[1rem] inline-block flex flex-end md:justify-center"
                            onClick={() => setShow(!show)} transition={{ duration: 0.8 }}
                        >
                            <FontAwesomeIcon
                                icon={show ? faX : faBars}
                                size="lg"
                                style={{ color: "#050505" }}
                            />
                            {show && (
                                <div className="absolute z-50 w-[92vw] ml-2 md:w-[40rem] 
                                mt-[1.6rem] z-15 border border-gray-200 shadow-lg bg-white
                                right-0 h-auto top-full"
                                >
                                    <div className="relative grid sm:hidden grid-cols-2
                                    gap-x-6 gap-y-4 font-normal text-gray-500 p-2 text-left border-b
                                    border-gray-200 pb-[1.5rem] pt-[1rem] ml-2"
                                    >
                                        <div><Link to="/signup">Signup</Link></div>
                                        <div><Link to="/about">About</Link></div>
                                        <div><Link to="/product">Products</Link></div>
                                        <div><Link to="/pricing">Pricing</Link></div>
                                        <div><Link to="/support">Support</Link></div>
                                    </div>

                                    <div className="relative grid sm:hidden grid-cols-2 mt-2 pb-[1.5rem]
                                    gap-x-6 gap-y-3 md:flex md:justify-between font-semibold text-gray-500 p-2 text-left border-b
                                    border-gray-200">
                                        <div className="flex md:flex-col items-start md:items-center md:hover:opacity-75">
                                            <img src="/media/images/kite-logo.svg" alt="kite-logo" className="w-[2rem] hover:opacity-75 ml-1" />
                                            <span className="text-gray-700 p-1 font-medium md:hover:text-blue-500">Kite</span>
                                            <span className="text-gray-250 font-normal text-sm hidden md:inline-block">Trading Platform</span>
                                        </div>
                                        <div className="flex md:flex-col items-start md:items-center md:hover:opacity-75">
                                            <img src="/media/images/Console-logo.png" alt="console-logo" className="w-[2.3rem] hover:opacity-75" />
                                            <span className="text-gray-700 p-1 font-medium md:hover:text-blue-500">Console</span>
                                            <span className="text-gray-250 font-normal text-sm hidden md:inline-block">Backoffice</span>
                                        </div>

                                        <div className="flex md:flex-col items-start md:items-center md:hover:opacity-75">
                                            <img src="/media/images/kite-connect-logo.svg" alt="kiteconnect-logo" className="w-[2.2rem] hover:opacity-75" />
                                            <span className="text-gray-700 p-1 font-medium md:hover:text-blue-500">Kite Connect</span>
                                            <span className="text-gray-250 font-normal text-sm hidden md:inline-block">Trading APIs</span>
                                        </div>

                                        <div className="flex md:flex-col items-start md:items-center md:hover:opacity-75">
                                            <img src="/media/images/coin-logo.svg" alt="coin-logo" className="w-[2rem] hover:opacity-75 ml-1" />
                                            <span className="text-gray-700 p-1 font-medium md:hover:text-blue-500">Coin</span>
                                            <span className="text-gray-250 font-normal text-sm hidden md:inline-block">Mutual funds</span>
                                        </div>

                                        <div className="md:hidden flex md:flex-row md:flex-col items-start md:items-center md:hover:opacity-75 ml-2">
                                            <img src="/media/images/varsity-logo.png" alt="varsity-logo" className="w-[1.5rem] hover:opacity-75" />
                                            <span className="text-gray-700 font-medium md:hover:text-blue-500 ml-1.5 md:ml-0">Varsity</span>
                                        </div>

                                        <div className="md:hidden flex md:flex-row md:flex-col items-start md:items-center md:hover:opacity-75 ml-2">
                                            <img src="/media/images/tqna-logo.png" alt="tqna-logo" className="w-[1.5rem] hover:opacity-75 mt-1" />
                                            <span className="text-gray-700 font-medium md:hover:text-blue-500 ml-2 md:ml-0">Trading Q&A</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="md:flex">
                                            <div className="grid grid-cols-2 mt-[0.8rem] pb-[1.5rem]
                                            gap-x-11 gap-y-1.5 font-normal text-gray-500 p-2 text-left border-b
                                            border-gray-200 ml-2">
                                                <div className="!font-bold mb-2">Utilities</div>
                                                <div className="!font-bold mb-2">Updates</div>
                                                <div><a>Calculators</a></div>
                                                <div><a>Z-Connect blog</a></div>
                                                <div><a>Brokerage calculator</a></div>
                                                <div><a>Circulars/Bulletin</a></div>
                                                <div><a>Margin calculator</a></div>
                                                <div><a>IPOs</a></div>
                                                <div><a>SIP calculator</a></div>
                                                <div><a>Market</a></div>
                                            </div>

                                            <div className="p-2 mt-[0.8rem] pb-[1.5rem] hidden md:block">
                                                <div className="ml-5 text-gray-500 font-bold mb-4.5 text-left">Education</div>
                                                <div className="flex flex-row hover:text-blue-500">
                                                    <div className="ml-5 hover:opacity-80">
                                                        <img src="/media/images/varsity-logo.png" alt="varsity-logo" className="ml-1.5 mb-2" />
                                                        <span className="hover:text-blue-500 font-normal text-gray-500">Varsity</span>
                                                    </div>
                                                    <div className="ml-9 hover:opacity-80">
                                                        <img src="/media/images/tqna-logo.png" alt="tqna-logo" className="ml-1.5 mb-3" />
                                                        <span className="hover:text-blue-500 font-normal text-gray-500">Trading Q&A</span>
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
        </div>
    );
}

export default Navbar;