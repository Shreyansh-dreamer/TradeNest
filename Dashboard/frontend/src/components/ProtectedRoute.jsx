import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_API_URL || "";
    axios
      .get(`${backendUrl}/verifyUser`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status) setAuth(true);
        else setAuth(false);
      })
      .catch(() => setAuth(false));
  }, []);

  if (auth === false) {
    return <Navigate to="/login" replace />;
  }

  if (auth === null || auth === false) return <p>Loading...</p>;

  return children;
};

export default ProtectedRoute;
