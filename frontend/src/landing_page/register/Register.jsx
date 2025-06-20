import { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
  const fetchEmail = async () => {
    try {
      const res = await axios.post("http://localhost:3002/getEmailFromToken", {}, { withCredentials: true });
      if (res.data.email) setEmail(res.data.email);
      else window.location.href = "http://localhost:5173/signup"; // no email found
    } catch (err) {
      console.error("Could not fetch email:", err);
      window.location.href = "http://localhost:5173/signup";
    }
  };
  fetchEmail();
}, []);

  const handleSignup = async () => {
    if (!username || !password) {
      setStatusMessage("Username and password are required.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3002/signup",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.status === "yes") {
        window.location.href = "http://localhost:5174/"; // Redirect to Frontend B
      } else {
        setStatusMessage(res.data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setStatusMessage("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-2xl font-medium text-indigo-700">
          {username ? username[0].toUpperCase() : "?"}
        </div>
        <p className="mt-4 text-lg font-semibold">Create an Account</p>

        {statusMessage && (
          <p className="mt-2 text-sm text-red-600">{statusMessage}</p>
        )}

        <div className="mt-6 text-left space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
