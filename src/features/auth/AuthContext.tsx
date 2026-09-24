'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppUser } from '@/types/api';
import { ApiClient } from '@/lib/apiClient';

interface AuthContextType {
  user: AppUser | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: AppUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('layan_token');
    if (savedToken) {
      setToken(savedToken);
      ApiClient.get<AppUser>('/auth/me').then((res) => {
        if (res.success && res.data) {
          setUser(res.data);
        } else {
          localStorage.removeItem('layan_token');
          setToken(null);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: AppUser) => {
    localStorage.setItem('layan_token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('layan_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
