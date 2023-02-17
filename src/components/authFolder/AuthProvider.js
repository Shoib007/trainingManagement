import axios from "axios";
import { useState,useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = (prop) => {
  const [authData, setAuthData] = useState(localStorage.getItem('jwt')?true:false);

  const updateAuth = async () => {
    // fetch authentication data from the Django server
    axios.get("http://localhost:8000/login", {withCredentials:true})
    .then(() => {
        setAuthData(true);
    }).catch((error) => {
        setAuthData(false);
        console.log(error.response.data);
    })
  };

  useEffect(() => {
    updateAuth();
  }, []);

  return (
    <AuthContext.Provider value={{authData, updateAuth}}>
      {prop.children}
    </AuthContext.Provider>
  );
};
