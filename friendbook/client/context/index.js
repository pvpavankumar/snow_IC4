import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const UserContext = createContext();
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API || "/api";
axios.interceptors.request.use(config => {
  if (typeof window !== "undefined") {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (auth?.token) config.headers.Authorization = `Bearer ${auth.token}`;
      else delete config.headers.Authorization;
    } catch { delete config.headers.Authorization; }
  }
  return config;
});
const UserProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  useEffect(() => {
    try { setState(JSON.parse(localStorage.getItem("auth"))); }
    catch { localStorage.removeItem("auth"); }
    setReady(true);
  }, []);
  useEffect(() => {
    const responseId = axios.interceptors.response.use(response => response, error => {
      if (error.response?.status === 401) {
        setState(null);
        localStorage.removeItem("auth");
        router.replace("/login");
      }
      return Promise.reject(error);
    });
    return () => {
      axios.interceptors.response.eject(responseId);
    };
  }, [state?.token, router]);
  return <UserContext.Provider value={[state, setState, ready]}>{children}</UserContext.Provider>;
};
export { UserContext, UserProvider };
