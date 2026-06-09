// Main App - All routes defined here
// Author: Wajeeha Habib | TechNexus Internship

import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';

// Public Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingPage from './pages/BookingPage';

// Components as pages
import Services from './components/Services';
import About from './components/about';
import Contact from './components/contact';

// Client Dashboard
import DashboardLayout from './components/DashboardLayout';
import Profile from './pages/dashboard/Profile';
import MyBookings from './pages/dashboard/MyBookings';
import Invoices from './pages/dashboard/Invoices';
import SupportTickets from './pages/dashboard/SupportTickets';

// Admin Panel
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import PlumberManagement from './pages/admin/PlumberManagement';
import BookingAssignment from './pages/admin/BookingAssignment';
import AllUsers from './pages/admin/AllUsers';

// Dummy Data
import {
  INITIAL_PLUMBERS,
  INITIAL_BOOKINGS,
  INITIAL_USERS,
} from './data/dummyData';

// ── Protected Route - sirf logged in client ──
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== 'client') {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// ── Admin Route - sirf admin ──
function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [plumbers, setPlumbers] = useState(INITIAL_PLUMBERS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [users] = useState(INITIAL_USERS);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Routes>
        {/* ══ PUBLIC ROUTES ══ */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/services"
          element={
            <MainLayout>
              <Services />
            </MainLayout>
          }
        />
        <Route
          path="/blog"
          element={
            <MainLayout>
              <Blog />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/booking"
          element={
            <MainLayout>
              <BookingPage />
            </MainLayout>
          }
        />

        {/* ══ AUTH ROUTES ══ */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ══ CLIENT DASHBOARD ══ */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="tickets" element={<SupportTickets />} />
        </Route>

        {/* ══ ADMIN PANEL ══ */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route
            index
            element={
              <AdminDashboard
                plumbers={plumbers}
                bookings={bookings}
                users={users}
              />
            }
          />
          <Route
            path="plumbers"
            element={
              <PlumberManagement
                plumbers={plumbers}
                setPlumbers={setPlumbers}
              />
            }
          />
          <Route
            path="bookings"
            element={
              <BookingAssignment
                bookings={bookings}
                setBookings={setBookings}
                plumbers={plumbers}
              />
            }
          />
          <Route path="users" element={<AllUsers users={users} />} />
        </Route>

        {/* ══ 404 - Page not found ══ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
