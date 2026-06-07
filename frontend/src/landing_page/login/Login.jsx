import React, { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [initials, setInitials] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchEmailAndUserData = async () => {
      try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/getEmailFromToken`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem("tempToken")}` }
      });        
      const fetchedEmail = res.data.email;
        if (!fetchedEmail) {
          if (!forgotPassword) { 
            window.location.href = "/signup";
          }
        } else {
          setEmail(fetchedEmail);
          const res2 = await axios.post(`${import.meta.env.VITE_API_URL}/getUsername`, {}, { withCredentials: true });
          if (res2.data.success) {
            setUsername(res2.data.username);
            const initials = res2.data.username
              .split(" ")
              .map(n => n[0])
              .join("")
              .toUpperCase();
            setInitials(initials);
          }
        }
      } catch (error) {
        console.error("Error fetching initial user data or no tempToken:", error);
        if (!forgotPassword) { 
          window.location.href = "/signup";
        }
      }
    };
    fetchEmailAndUserData();
  }, [forgotPassword]); 


  const handleGetOtp = async () => {
    if (!email) { 
        setStatusMessage("Please enter your email to send OTP.");
        return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/getOtp1`,{email},
        { withCredentials: true });
      setOtpSent(true);
      setStatusMessage("Enter the OTP sent to your email");
    } catch (error) {
      setStatusMessage("Failed to send OTP: " + (error.response?.data?.message || error.message));
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
        setStatusMessage("Please enter the OTP.");
        return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/verifyOTP1`, {email, otp },{ withCredentials: true });
      if (res.data.status === "otp_verified") {
        setStatusMessage("OTP verified! You may reset your password.");
        setIsOtpVerified(true);
        setOtpSent(false); 
      } else {
        setStatusMessage(res.data.message || "OTP verification failed due to unknown status.");
      }
    } catch (error) {
      setStatusMessage("OTP verification failed: " + (error.response?.data?.message || error.message));
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
        setStatusMessage("Please enter a new password.");
        return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/resetPassword`, { newPassword }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("tempToken")}` }
      });
      if (res.data.message === "Password updated successfully.") {
        setStatusMessage("Password updated successfully! Logging you in...");
        const redirectUrl = import.meta.env.VITE_DASHBOARD_URL || "https://trade-nest-dboard.vercel.app";
        window.location.href = redirectUrl.startsWith("http") ? redirectUrl : `https://${redirectUrl}`;
      } else {
        setStatusMessage("Password reset failed: " + (res.data.message || "Unknown error."));
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setStatusMessage("Error occurred while resetting password: " + (error.response?.data?.message || error.message));
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { password }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("tempToken")}` }
    });
    if (res.data.success) {
        localStorage.setItem("token", res.data.token); 
        window.location.href = redirectUrl;
    } else {
        setStatusMessage("Login failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatusMessage("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-sm text-center border border-transparent dark:border-gray-700">
        <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl font-medium text-indigo-700 dark:text-indigo-400">
          {initials || "?"}
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{username || "Loading..."}</p>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!forgotPassword && email !== ""}
        />
        {statusMessage && <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">{statusMessage}</p>}

        {!forgotPassword && (
          <div className="relative mt-6 text-left">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {forgotPassword && !isOtpVerified && (
          <div className="mt-6">
            {!otpSent && ( 
                <button
                    onClick={handleGetOtp}
                    className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 mb-4 transition-colors"
                >
                    Get OTP
                </button>
            )}
            {otpSent && ( 
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={handleVerifyOtp}
                  className="w-full mt-4 bg-blue-600 dark:bg-blue-500 text-white py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Verify OTP
                </button>
              </>
            )}
          </div>
        )}

        {isOtpVerified && (
          <div className="mt-6">
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="w-full mt-4 bg-green-600 dark:bg-green-500 text-white py-2 rounded hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
            >
              Reset Password
            </button>
          </div>
        )}

        {!forgotPassword && (
          <button
            onClick={handleLogin}
            className="w-full mt-6 bg-orange-600 dark:bg-orange-500 text-white py-2 rounded hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors"
          >
            Login
          </button>
        )}

        {!forgotPassword && !isOtpVerified && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <button
              onClick={() => {
                setForgotPassword(true);
                setStatusMessage("");
                setPassword(""); 
                setOtpSent(false);
                setIsOtpVerified(false); 
                setOtp(""); 
                setNewPassword(""); 
                
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot user ID or password?
            </button>
          </p>
        )}

        {forgotPassword && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <button
              onClick={() => {
                setForgotPassword(false);
                setIsOtpVerified(false);
                setOtp("");
                setNewPassword("");
                setOtpSent(false);
                setStatusMessage("");
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Back to Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;