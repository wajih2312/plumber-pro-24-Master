// Protected Route - bina login ke dashboard nahi khulega
// Author: Wajeeha Habib | TechNexus Internship

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // Agar user logged in nahi hai to login page pe bhejo
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Agar logged in hai to page show karo
  return children;
}
