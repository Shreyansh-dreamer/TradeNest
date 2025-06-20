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
      const res = await axios.post("http://localhost:3002/getOtp", { email });
      setOtpSent(true);
      setStatusMessage("OTP sent to your email");
    } catch (error) {
      setStatusMessage("Failed to send OTP: " + error.response?.data?.message || error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:3002/verifyOTP", { email, otp },{withCredentials: true});
      if (res.data.status === "login") {
        setStatusMessage("OTP verified! Redirecting to login...");
        window.location.href = "/login";
      } else {
        setStatusMessage("OTP verified! Redirecting to signup...");
        window.location.href = "/register";
      }
    } catch (error) {
      setStatusMessage("OTP verification failed: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <div className="mt-25 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans mb-8">
        <div className="text-center mb-15 max-w-screen-lg w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-600 mb-4 leading-tight">
            Open a free demat & trading account online
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Start investing brokerage free and join a community of 1.5+ crore investors and traders
          </p>
        </div>

        <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden max-w-screen-lg w-full">
          {/* Left Image */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-0 flex items-center justify-center">
            <img
              src="/media/images/signup.png"
              alt="Zerodha Kite Platform Screenshot"
              className="rounded-lg object-contain w-full h-auto max-h-96 md:max-h-full"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-8 md:p-10">
            <p className="text-gray font-semibold-600 mb-6 text-lg">
              To signup or login, enter your email ID
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
                  className="border border-gray-300 rounded-lg p-3 mb-4 w-full text-lg"
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
              By proceeding, you agree to the Zerodha{" "}
              <a href="#" className="text-blue-600 hover:text-black">
                terms & privacy policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Investment Options */}
      <h1 className="text-2xl md:text-4xl text-center font-medium text-gray-700 mb-14">
        Investment options with Zerodha demat account
      </h1>

      <div className="flex justify-center items-center max-w-screen-lg mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 px-4">
          {[
            {
              src: "/media/images/stocks.svg",
              title: "Stocks",
              desc: "Invest in all exchange-listed securities",
            },
            {
              src: "/media/images/mutual-funds.svg",
              title: "Mutual funds",
              desc: "Invest in commission-free direct mutual funds",
            },
            {
              src: "/media/images/ipo.svg",
              title: "IPO",
              desc: "Apply to the latest IPOs instantly via UPI",
            },
            {
              src: "/media/images/futures&opinions.svg",
              title: "Futures & options",
              desc: "Hedge and mitigate market risk through simplified F&O trading",
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
          <h1 className="text-xl md:text-4xl text-center text-gray-600 font-medium">
            Steps to open a demat account with Zerodha
          </h1>
          <div className="flex flex-col md:flex-row items-center w-full gap-10">
            <div className="w-full md:w-1/2">
              <img src="/media/images/steps-acop.svg" alt="Steps" className="w-full h-auto object-contain rounded-lg" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-6 text-left md:ml-6 lg:ml-10">
              {["Enter the requested details", "Complete e-sign & verification", "Start investing!"].map((text, i) => (
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
            ["Unbeatable pricing", "Zero charges for equity & mutual fund investments. Flat ₹20 fees for intraday and F&O trades."],
            ["Best investing experience", "Simple and intuitive trading platform with an easy-to-understand user interface."],
            ["No spam or gimmicks", "Committed to transparency — no gimmicks, spam, 'gamification', or intrusive push notifications."],
            ["The Zerodha universe", "More than just an app — gain free access to the entire ecosystem of our partner products."],
          ].map(([title, desc], i) => (
            <div key={i}>
              <h3 className="text-xl text-gray-800 mb-2 font-medium">{title}</h3>
              <p className="text-gray-600 mb-4">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <DiffAccounts />
      <Faqs />

      {/* Final CTA */}
      <div className="mt-15 max-w-screen-lg mx-auto text-center px-4 mb-16">
        <h1 className="font-semibold text-4xl text-gray-700 mb-5">Open a Zerodha account</h1>
        <p className="text-gray-600 text-lg mb-7">
          Simple and intuitive apps · ₹0 for investments · ₹20 for intraday and F&O trades.
        </p>
        <motion.button
          className="cursor-pointer px-6 py-3 text-white rounded text-xl font-semibold"
          style={{ backgroundColor: "#387ed1" }}
          whileHover={{ backgroundColor: "#000000" }}
        >
          Sign up for free
        </motion.button>
      </div>
    </>
  );
};

export default SignUp;
