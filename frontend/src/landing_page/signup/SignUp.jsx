import { useState } from "react";
import { motion } from "framer-motion";
import DiffAccounts from "./DiffAccounts";
import Faqs from "./Faqs";
import axios from "axios";

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleGetOtp = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/getOtp`, { email });
      setOtpSent(true);
      setStatusMessage("OTP sent to your email");
    } catch (error) {
      setStatusMessage("Failed to send OTP: " + (error.response?.data?.message || error.message));
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/verifyOTP`, { email, otp },{withCredentials: true});
      if (res.data.status === "login") {
        setStatusMessage("OTP verified! Redirecting to login...");
        window.location.href = "/Login";
      } else {
        setStatusMessage("OTP verified! Redirecting to signup...");
        window.location.href = "/register";
      }
    } catch (error) {
      setStatusMessage("OTP verification failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <div className="mt-25 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans mb-8">
        <div className="text-center mb-15 max-w-screen-lg w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-600 mb-4 leading-tight">
            Your free demat & trading account awaits
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Join over 1.5 crore investors who trade brokerage-free and invest without boundaries
          </p>
        </div>

        <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden max-w-screen-lg w-full">
          {/* Left Image */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-0 flex items-center justify-center">
            <img
              src="/media/images/signup.png"
              alt="TradeNest account signup"
              className="rounded-lg object-contain w-full h-auto max-h-96 md:max-h-full"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-8 md:p-10">
            <p className="text-gray font-semibold-600 mb-6 text-lg">
              Enter your email to get started — sign up or log in instantly
            </p>

            {/* Email input */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 focus-within:ring-2 focus-within:ring-blue-200 relative">
              <i className="fas fa-envelope text-lg text-gray-700 mr-2"></i>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 outline-none text-gray-800 text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {otpSent ? (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="border border-gray-300 rounded-lg p-3 mb-4 w-full text-lg text-gray-600"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 mb-4 w-full"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </button>

                {/* Resend OTP button */}
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full"
                  onClick={handleGetOtp}
                >
                  Resend OTP
                </button>
              </>
            ) : (
              <button
                className="bg-[#397dd0] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 mb-4 w-full"
                onClick={handleGetOtp}
              >
                Get OTP
              </button>
            )}
            {statusMessage && (
              <p className="text-sm text-center text-gray-600">{statusMessage}</p>
            )}

            <p className="text-gray-500 text-sm text-center mt-2">
              Continuing means you accept our{" "}
              <a href="#" className="text-blue-600 hover:text-black dark:hover:text-gray-200">
                terms & privacy policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Investment Options */}
      <h1 className="text-2xl md:text-4xl text-center font-medium text-gray-700 dark:text-gray-200 mb-14">
        Everything you can grow with TradeNest
      </h1>

      <div className="flex justify-center items-center max-w-screen-lg mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 px-4">
          {[
            {
              src: "/media/images/stocks.svg",
              title: "Stocks",
              desc: "Buy and hold any exchange-listed security with zero brokerage",
            },
            {
              src: "/media/images/mutual-funds.svg",
              title: "Mutual Funds",
              desc: "Direct MF investing at ₹0 commission — every paisa earns for you",
            },
            {
              src: "/media/images/ipo.svg",
              title: "IPO",
              desc: "Apply to the latest IPOs in seconds using UPI — no paperwork",
            },
            {
              src: "/media/images/futures&opinions.svg",
              title: "Futures & Options",
              desc: "Manage risk and capitalize on market moves with intuitive F&O tools",
            },
          ].map((item) => (
            <div className="flex flex-row p-4 m-2" key={item.title}>
              <img src={item.src} alt={item.title} />
              <p className="flex flex-col ml-2">
                <span className="mb-2 text-xl font-medium text-gray-600">{item.title}</span>
                <span className="text-sm text-gray-500">{item.desc}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <motion.button
        className="cursor-pointer px-6 py-3 text-white flex justify-center items-center max-w-screen-lg mx-auto rounded text-xl mb-10 font-semibold"
        style={{ backgroundColor: "#387ed1" }}
        whileHover={{ backgroundColor: "#000000" }}
      >
        Explore investments
      </motion.button>

      {/* Steps */}
      <div style={{ backgroundColor: "#fafafb" }} className="py-20">
        <div className="flex flex-col items-center justify-between max-w-screen-lg mx-auto px-4 gap-8">
          <h1 className="text-xl md:text-4xl text-center text-gray-600 dark:text-gray-200 font-medium">
            You're just 3 steps away from the markets
          </h1>
          <div className="flex flex-col md:flex-row items-center w-full gap-10">
            <div className="w-full md:w-1/2">
              <img src="/media/images/steps-acop.svg" alt="Steps" className="w-full h-auto object-contain rounded-lg" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-6 text-left md:ml-6 lg:ml-10">
              {["Fill in your personal details", "Complete e-sign & KYC verification", "You're live — start investing!"].map((text, i) => (
                <div className="flex items-start gap-4" key={i}>
                  <div className="w-7 h-7 border border-gray-400 rounded-full flex justify-center items-center text-sm font-medium text-gray-800">
                    {`0${i + 1}`}
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">{text}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="flex mt-5 flex-col md:flex-row items-center justify-between max-w-screen-lg mx-auto px-4 py-10 gap-8">
        <div className="w-full md:w-1/2">
          <img src="/media/images/acop-benefits.svg" alt="Benefits" className="w-full h-auto object-contain rounded-lg" />
        </div>
        <div className="px-3 w-full md:w-1/2 text-left md:ml-12">
          {[
            ["Fair, transparent pricing", "₹0 for equity delivery and direct mutual funds. A flat ₹20 per executed intraday and F&O order — no surprises."],
            ["Designed for every trader", "Whether you're placing your first order or managing complex derivatives — the interface stays clean and intuitive throughout."],
            ["Straight talk, always", "No dark patterns, no gamification, no spam. Just an honest broker doing right by your money."],
            ["An ecosystem, not just an app", "Expand your capabilities with research tools, automated strategies, insurance, and more through our partner network."],
          ].map(([title, desc], i) => (
            <div key={i}>
              <h3 className="text-xl text-gray-800 dark:text-gray-200 mb-2 font-medium">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <DiffAccounts />
      <Faqs />

      {/* Final CTA */}
      <div className="mt-15 max-w-screen-lg mx-auto text-center px-4 mb-16">
        <h1 className="font-semibold text-4xl text-gray-700 dark:text-gray-200 mb-5">Begin your investment journey today</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-7">
          Modern platform · ₹0 for equity & MF investments · ₹20 flat for intraday and F&O.
        </p>
        <motion.button
          id="signup-bottom-cta"
          className="cursor-pointer px-8 py-3 text-white rounded-md text-xl font-semibold"
          style={{ backgroundColor: "#2563eb" }}
          whileHover={{ backgroundColor: "#1d4ed8" }}
          whileTap={{ scale: 0.98 }}
        >
          Create free account
        </motion.button>
      </div>
    </>
  );
};

export default SignUp;
