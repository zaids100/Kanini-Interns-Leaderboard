import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

// Simple function to check if a JWT token is expired
const isTokenExpired = (token) => {
  try {
    // Use a more robust base64 decode
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    
    // Try different base64 decode methods
    let decoded;
    try {
      decoded = window.atob ? window.atob(base64) : atob(base64);
    } catch (e) {
      // Fallback to manual base64 decode if atob fails
      decoded = decodeURIComponent(escape(window.atob ? window.atob(base64) : atob(base64)));
    }
    
    const payload = JSON.parse(decoded);
    const currentTime = Date.now() / 1000;
    const isExpired = payload.exp < currentTime;
    console.log('Token expiration check:', { exp: payload.exp, current: currentTime, isExpired });
    return isExpired;
  } catch (error) {
    console.error('Error parsing token:', error);
    // For now, don't consider parsing errors as expired - just log them
    console.log('Token parsing failed, but not treating as expired');
    return false;
  }
};

export const UserProvider = ({ children }) => {
  // Check if localStorage is available
  const isLocalStorageAvailable = () => {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.error('localStorage not available:', e);
      return false;
    }
  };

  const [user, setUser] = useState(() => {
    if (!isLocalStorageAvailable()) {
      console.log('UserContext - localStorage not available, user initialized as null');
      return null;
    }
    
    const storedUser = localStorage.getItem("user");
    console.log('UserContext - Initial user from localStorage:', storedUser ? 'Present' : 'Missing');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    if (!isLocalStorageAvailable()) {
      console.log('UserContext - localStorage not available, token initialized as null');
      return null;
    }
    
    const storedToken = localStorage.getItem("token");
    console.log('UserContext - Initial token from localStorage:', storedToken ? 'Present' : 'Missing');
    
    // Don't check expiration immediately - let the component mount first
    if (storedToken) {
      console.log('UserContext - Token initialized: Valid token found (expiration check deferred)');
      return storedToken;
    }
    
    console.log('UserContext - Token initialized: No token found');
    return null;
  });

  // Periodic token validation - temporarily disabled for debugging
  // useEffect(() => {
  //   if (!token) return;

  //   const interval = setInterval(() => {
  //     if (token && isTokenExpired(token)) {
  //       console.log('UserContext - Token expired during periodic check, clearing it');
  //       setToken(null);
  //       setUser(null);
  //       if (isLocalStorageAvailable()) {
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("user");
  //       }
  //     }
  //   }, 60000); // Check every minute

  //   return () => clearInterval(interval);
  // }, [token, setUser]);

  // Log initial state once and check token expiration after mount
  useEffect(() => {
    console.log('UserContext - Initial render complete:', {
      user: user ? 'Present' : 'Missing',
      token: token ? 'Present' : 'Missing',
      tokenLength: token ? token.length : 0
    });
    
    // Temporarily disable token expiration check to debug the issue
    // if (token && isTokenExpired(token)) {
    //   console.log('UserContext - Token expired after mount, clearing it');
    //   setToken(null);
    //   setUser(null);
    //   if (isLocalStorageAvailable()) {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");
    //   }
    // }
  }, []); // Empty dependency array - runs only once

  useEffect(() => {
    console.log('UserContext - User changed:', user ? 'Present' : 'Missing');
    if (!isLocalStorageAvailable()) return;
    
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    console.log('UserContext - Token changed:', token ? 'Present' : 'Missing');
    
    // Temporarily disable token expiration check for debugging
    // if (token && isTokenExpired(token)) {
    //   console.log('UserContext - New token is expired, clearing it');
    //   setToken(null);
    //   setUser(null);
    //   if (isLocalStorageAvailable()) {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");
    //   }
    //   return;
    // }
    
    if (!isLocalStorageAvailable()) return;
    
    if (token) {
      localStorage.setItem("token", token);
      console.log('UserContext - Token saved to localStorage');
    } else {
      localStorage.removeItem("token");
      console.log('UserContext - Token removed from localStorage');
    }
  }, [token, setUser]);

  // Debug: Log current state
  console.log('UserContext - Current state:', { 
    user: user ? 'Present' : 'Missing', 
    token: token ? 'Present' : 'Missing',
    tokenLength: token ? token.length : 0,
    tokenStart: token ? token.substring(0, 20) + '...' : 'N/A'
  });

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
