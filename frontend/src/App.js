import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import StudentDashboard from './pages/StudentDashboard';
import BorrowHistory from './pages/BorrowHistory';
import AdminDashboard from './pages/AdminDashboard';
import EquipmentManagement from './pages/EquipmentManagement';
import BorrowEquipment from './pages/BorrowEquipment';
import RequestsManagement from './pages/RequestsManagement';
import './App.css';

/**
 * App Component - Main Application Component
 * 
 * IMPORTS VERIFICATION:
 * ✅ Navbar imported from './components/Navbar'
 * ✅ LoginForm imported from './components/LoginForm'
 * ✅ StudentDashboard imported from './pages/StudentDashboard'
 * ✅ BorrowHistory imported from './pages/BorrowHistory'
 * ✅ AdminDashboard imported from './pages/AdminDashboard'
 * ✅ EquipmentManagement imported from './pages/EquipmentManagement'
 */

const App = () => {
  // Global user state - manage login/logout here
  const [user, setUser] = useState(null);

  /**
   * Handle user login
   * This function will be called from LoginPage
   * It receives user data and stores it
   */
  const handleLogin = (userData) => {
    setUser(userData);
    console.log('User logged in:', userData);
  };

  /**
   * Handle user logout
   * Clear the user state
   */
  const handleLogout = () => {
    setUser(null);
    console.log('User logged out');
  };

  return (
    <Router>
      <div className="app-container">
        {/* Navbar - displayed on all pages */}
        <Navbar user={user} onLogout={handleLogout} />

        {/* Main content area */}
        <main className="main-content">
          <Routes>
            {/* LOGIN ROUTE */}
            <Route 
              path="/login" 
              element={<LoginForm onLogin={handleLogin} />}
            />

            {/* STUDENT DASHBOARD ROUTE */}
            <Route 
              path="/student-dashboard" 
              element={
                user && (user.role === 'student' || user.role === 'staff') ? (
                  <StudentDashboard user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* ADMIN DASHBOARD ROUTE */}
            <Route 
              path="/admin-dashboard" 
              element={
                user && user.role === 'admin' ? (
                  <AdminDashboard user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* BORROW HISTORY ROUTE */}
            <Route 
              path="/borrow-history" 
              element={
                user ? (
                  <BorrowHistory user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* EQUIPMENT MANAGEMENT ROUTE - VERIFIED CONNECTED */}
            <Route 
              path="/equipment-management" 
              element={
                user && user.role === 'admin' ? (
                  <EquipmentManagement user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* BORROW EQUIPMENT ROUTE - VERIFIED */}
            <Route 
              path="/borrow-equipment" 
              element={
                user ? (
                  <BorrowEquipment user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* REQUESTS ROUTE */}
            <Route 
              path="/requests" 
              element={
                user && user.role === 'admin' ? (
                  <RequestsManagement user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* HOME ROUTE */}
            <Route 
              path="/" 
              element={
                user ? (
                  user.role === 'admin' ? 
                    <Navigate to="/admin-dashboard" /> : 
                    <Navigate to="/student-dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* CATCH-ALL ROUTE */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-light text-center py-4 mt-5">
          <p className="mb-0">&copy; 2025 School Equipment Lending Portal. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;