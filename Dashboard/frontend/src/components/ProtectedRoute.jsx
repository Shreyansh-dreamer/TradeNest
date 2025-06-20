import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3002/verifyUser", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status) setAuth(true);
        else setAuth(false);
      })
      .catch(() => setAuth(false));
  }, []);

  useEffect(() => {
    if (auth === false) {
      window.location.href = "http://localhost:5173/login";
    }
  }, [auth]);

  if (auth === null || auth === false) return <p>Loading...</p>;

  return children;
};

export default ProtectedRoute;
