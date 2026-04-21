import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);
const STORAGE_KEY = "mindpark-auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (payload) => {
    setLoading(true);
    try {
      const data = await api.post("/auth/login", payload);
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (payload) => {
    setLoading(true);
    try {
      const data = await api.post("/auth/signup", payload);
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

  const refreshProfile = async () => {
    if (!user?.token) return null;
    const profile = await api.get("/auth/me", user.token);
    setUser((current) => ({
      ...current,
      ...profile,
      token: current?.token,
    }));
    return profile;
  };

  const toggleWishlist = async (productId) => {
    if (!user?.token) return [];
    const wishlist = await api.put(`/auth/wishlist/${productId}`, {}, user.token);
    setUser((current) => ({ ...current, wishlist }));
    return wishlist;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, refreshProfile, toggleWishlist }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
