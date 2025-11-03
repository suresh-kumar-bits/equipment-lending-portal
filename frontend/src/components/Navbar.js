import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthData } from '../services/api';
import 'font-awesome/css/font-awesome.min.css';

/**
 * Navbar Component
 * 
 * UPDATES (Phase 2 Integration):
 * ✅ Import clearAuthData from api service
 * ✅ Clear token and user from localStorage on logout
 * ✅ Proper cleanup before redirect
 * 
 * This component displays the navigation bar at the top of the application.
 * It shows different menu items based on user role (Student, Staff, Admin).
 * Users can logout from this navbar.
 * 
 * Props:
 * - user: Current logged-in user object {_id, name, email, role}
 * - onLogout: Function to call when user clicks logout
 */

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  /**
   * Handle logout functionality
   * ✅ Clear token and user from localStorage
   * ✅ Call parent component's logout function
   * ✅ Redirect to login page
   */
  const handleLogout = () => {
    // Clear all authentication data from localStorage
    clearAuthData();
    
    // Call the parent component's logout function (clears React state)
    onLogout();
    
    // Redirect to login page
    navigate('/login');
    
    console.log('User logged out and auth data cleared');
  };

  // Function to render menu items based on user role
  const renderMenuItems = () => {
    if (!user) {
      // If no user is logged in, show minimal menu
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/login">
              Login
            </Link>
          </li>
        </>
      );
    }

    // Different menu items for different roles
    if (user.role === 'admin') {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/admin-dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/equipment-management">
              Manage Equipment
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/requests">
              Requests
            </Link>
          </li>
        </>
      );
    }

    if (user.role === 'staff') {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/student-dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/borrow-equipment">
              Borrow Equipment
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/borrow-history">
              My Requests
            </Link>
          </li>
        </>
      );
    }

    // Default menu for student role
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/student-dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/borrow-equipment">
            Borrow Equipment
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/borrow-history">
            My Requests
          </Link>
        </li>
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid ps-4 pe-4">
        {/* Brand/Logo */}
        <Link className="navbar-brand fw-bold fs-5" to="/">
          <i className="fa fa-toolbox me-2"></i>Equipment Portal
        </Link>

        {/* Hamburger Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Menu Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Render menu items based on user role */}
            {renderMenuItems()}

            {/* Logout Button - For logged in users */}
            {user && (
              <li className="nav-item ms-3">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <i className="fa fa-sign-out me-2"></i>Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;