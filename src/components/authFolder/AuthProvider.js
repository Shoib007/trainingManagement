import axios from "axios";
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../BaseUrl";
import Cookies from "js-cookie";
export const AuthProvider = (prop) => {
  const jwt = Cookies.get('jwt');
  const [authData, setAuthData] = useState(jwt ? true : false);

  const updateAuth = async () => {
    // fetch authentication data from the Django server
    axios.get(`${BASE_URL}/login`, { withCredentials: true })
      .then((res) => {
        if (res.data.is_staff) {
          setAuthData(true);
        } else { setAuthData(false) }
      }).catch((error) => {
        setAuthData(false);
        console.log(error.response.data.detail);
      })
  };

  useEffect(() => {
    updateAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authData, updateAuth }}>
      {prop.children}
    </AuthContext.Provider>
  );
};
