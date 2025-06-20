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
        const res = await axios.post("http://localhost:3002/getEmailFromToken", {}, { withCredentials: true });
        const fetchedEmail = res.data.email;

        if (!fetchedEmail) {
          // Only redirect if not in a "forgot password" flow and no token exists
          if (!forgotPassword) { // Add this check
            window.location.href = "http://localhost:5173/signup";
          }
        } else {
          setEmail(fetchedEmail);
          const res2 = await axios.post("http://localhost:3002/getUsername", {}, { withCredentials: true });
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
        // Only redirect if not in a "forgot password" flow and an error occurs
        if (!forgotPassword) { // Add this check
          window.location.href = "http://localhost:5173/signup";
        }
      }
    };
    fetchEmailAndUserData();
  }, [forgotPassword]); // Add forgotPassword to dependency array to re-run effect when it changes


  const handleGetOtp = async () => {
    if (!email) { // Ensure email is entered before trying to send OTP
        setStatusMessage("Please enter your email to send OTP.");
        return;
    }
    try {
      const res = await axios.post("http://localhost:3002/getOtp1",{email},
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
      const res = await axios.post("http://localhost:3002/verifyOTP1", {email, otp },{ withCredentials: true });
      // CRITICAL FIX: Change "login" to "otp_verified" as per backend response
      if (res.data.status === "otp_verified") {
        setStatusMessage("OTP verified! You may reset your password.");
        setIsOtpVerified(true);
        setOtpSent(false); // OTP is verified, hide the OTP input
      } else {
        // This 'else' block should ideally not be hit if status is always 'otp_verified' on success
        // but it's good to have a fallback.
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
      const res = await axios.post(
        "http://localhost:3002/resetPassword",
        { newPassword },
        { withCredentials: true }
      );

      if (res.data.message === "Password updated successfully.") {
        setStatusMessage("Password updated successfully! Logging you in...");
        window.location.href = "http://localhost:5174"; // Redirect after successful reset and assumed auto-login
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
      const res = await axios.post("http://localhost:3002/login",{
        password,
      }, {
        withCredentials: true,
      });
      if (res.data.success) {
        window.location.href = "http://localhost:5174";
      } else {
        setStatusMessage("Login failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatusMessage("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-2xl font-medium text-indigo-700">
          {initials || "?"}
        </div>
        <p className="mt-4 text-lg font-semibold">{username || "Loading..."}</p>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded border-gray-300 bg-gray-100 text-gray-500"
          value={email}
          // Enable email input if forgotPassword is true AND email is not already fetched
          onChange={(e) => setEmail(e.target.value)}
          disabled={!forgotPassword && email !== ""} // Disable only if not forgotPassword AND email is already set
        />
        {statusMessage && <p className="mt-2 text-sm text-blue-600">{statusMessage}</p>}

        {!forgotPassword && (
          <div className="relative mt-6 text-left">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {forgotPassword && !isOtpVerified && (
          <div className="mt-6">
            {/* Added "Get OTP" button for the forgot password flow */}
            {!otpSent && ( // Only show Get OTP button if OTP hasn't been sent yet
                <button
                    onClick={handleGetOtp}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4"
                >
                    Get OTP
                </button>
            )}
            {otpSent && ( // Only show OTP input if OTP has been sent
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 border rounded border-gray-300"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={handleVerifyOtp}
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
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
              className="w-full px-4 py-2 border rounded border-gray-300"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Reset Password
            </button>
          </div>
        )}

        {!forgotPassword && (
          <button
            onClick={handleLogin}
            className="w-full mt-6 bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
          >
            Login
          </button>
        )}

        {!forgotPassword && !isOtpVerified && (
          <p className="mt-4 text-sm text-gray-600">
            <button
              onClick={() => {
                setForgotPassword(true);
                setStatusMessage("");
                setPassword(""); // Clear password when entering forgot flow
                setOtpSent(false); // Ensure OTP sending state is reset
                setIsOtpVerified(false); // Ensure OTP verification state is reset
                setOtp(""); // Clear OTP input
                setNewPassword(""); // Clear new password input
                // Do not clear email here, let the user input it if it wasn't fetched
              }}
              className="text-blue-600 hover:underline"
            >
              Forgot user ID or password?
            </button>
          </p>
        )}

        {forgotPassword && (
          <p className="mt-4 text-sm text-gray-600">
            <button
              onClick={() => {
                setForgotPassword(false);
                setIsOtpVerified(false);
                setOtp("");
                setNewPassword("");
                setOtpSent(false);
                setStatusMessage("");
                // Email should remain if it was pre-filled, or be cleared if the user wants to start fresh
                // For 'Back to Login', it's usually better to keep the email if it was already there.
              }}
              className="text-blue-600 hover:underline"
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