import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_API_URL || "";
    axios
      .get(`${backendUrl}/verifyUser`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      })
      .catch(() => setAuth(false));
  }, []);

  useEffect(() => {
    if (auth === false) {
      const redirectUrl = import.meta.env.VITE_MAIN_URL || "https://trade-nest-six.vercel.app";
      const baseUrl = redirectUrl.startsWith("http") ? redirectUrl : `https://${redirectUrl}`;
      // window.location.href = `${baseUrl}/login`;
    }
  }, [auth]);

  if (auth === null || auth === false) {
    return <p>Loading...</p>;
  }
  return children;
};

export default ProtectedRoute;