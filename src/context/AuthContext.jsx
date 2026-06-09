// Auth Context - manages login/logout state
// Author: Wajeeha Habib | TechNexus Internship

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// ── Fixed Admin Credentials ──
const ADMIN_EMAIL = 'admin@plumberpro.com';
const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('plumber_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('plumber_user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('plumber_user');
  };

  // ── Admin Login Check ──
  const adminLogin = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminData = {
        name: 'Admin',
        email: ADMIN_EMAIL,
        role: 'admin',
      };
      setUser(adminData);
      localStorage.setItem('plumber_user', JSON.stringify(adminData));
      return true; // success
    }
    return false; // wrong credentials
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, adminLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
