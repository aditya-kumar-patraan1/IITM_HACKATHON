import { React, useContext } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [table, setTable] = useState([]);

  const getAuthState = async () => {
    try {
      // console.log("Checking authentication state...");
      const response = await axios.get(
        `${BACKEND_URL}/api/auth/isAuthenticated`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        setisLoggedIn(true);
        getUserData();
        getTable();

      } else {
        setisLoggedIn(false);
      }
    } catch (e) {
      // console.log("Error fetching authentication state:", e);
      setisLoggedIn(false);
    }
  };

  const getTable = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/appointment/getTable`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        // console.log("User Data:", response.data.userData);
        setTable(response.data.myTable);
      } else {
        setTable([]);
      }
    } catch (e) {
      // console.log("Error fetching user data:", e);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/userData/getUserData`,
        {
          withCredentials: true,
        }
      );

      if (response.data.status === 1) {
        // console.log("User Data:", response.data.userData);
        setUserData(response.data.userData);
      } else {
        setUserData(false);
      }
    } catch (e) {
      // console.log("Error fetching user data:", e);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    BACKEND_URL,
    isLoggedIn,
    setisLoggedIn,
    userData,
    setUserData,
    getUserData,
    getAuthState,
    table,
    setTable,
    getTable,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
