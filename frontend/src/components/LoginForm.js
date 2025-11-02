import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * LoginForm Component
 * 
 * This component displays a professional login form where users can:
 * - Enter email and password
 * - Select their role (Student, Staff, Admin)
 * - Login to the system
 * 
 * Props:
 * - onLogin: Function called when user successfully logs in
 *           Receives user object {id, name, email, role}
 * 
 * Future Integration with Backend:
 * - Replace mockData with real API call
 * - Send credentials to: POST /api/auth/login
 * - Receive JWT token and user data
 */

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();

  // Form state - stores user input
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student', // Default role
  });

  // Error and loading state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handle input change
   * Updates form state as user types
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    setError('');
  };

  /**
   * Mock Authentication Data
   * In Phase 1: Using mock data stored locally
   * In Phase 2: Will be replaced with real backend API call
   * 
   * API Documentation (for backend team):
   * Endpoint: POST /api/auth/login
   * Request Body:
   * {
   *   "email": "user@example.com",
   *   "password": "password123",
   *   "role": "student" | "staff" | "admin"
   * }
   * Response:
   * {
   *   "success": true,
   *   "token": "jwt_token_here",
   *   "user": {
   *     "id": "user_id",
   *     "name": "John Doe",
   *     "email": "user@example.com",
   *     "role": "student" | "staff" | "admin"
   *   }
   * }
   */

  const mockUsers = [
    {
      id: '1',
      name: 'John Student',
      email: 'student@example.com',
      password: 'password123',
      role: 'student',
    },
    {
      id: '2',
      name: 'Jane Staff',
      email: 'staff@example.com',
      password: 'password123',
      role: 'staff',
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    },
  ];

  /**
   * Handle form submission (login)
   * Validates credentials against mock data
   * In Phase 2: Will call real backend API
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form inputs
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Simulate API delay (500ms)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock authentication - find user in mockUsers array
      const user = mockUsers.find(
        (u) =>
          u.email === formData.email &&
          u.password === formData.password &&
          u.role === formData.role
      );

      if (!user) {
        setError('Invalid email, password, or role. Please check your credentials.');
        setLoading(false);
        return;
      }

      // Successful login
      console.log('Login successful:', user);

      // Call parent component's onLogin function
      // Pass user data (without password)
      onLogin({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });

      // Redirect to appropriate dashboard
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            {/* Login Card */}
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold text-dark mb-2">
                    <i className="fa fa-toolbox me-2"></i>Equipment Portal
                  </h1>
                  <p className="text-muted small">Sign in to your account</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="fa fa-exclamation-circle me-2"></i>
                    <strong>Error!</strong> {error}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                      onClick={() => setError('')}
                    ></button>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-600 text-dark">
                      <i className="fa fa-envelope me-2"></i>Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                    <small className="text-muted d-block mt-1">
                      Try: student@example.com, staff@example.com, or admin@example.com
                    </small>
                  </div>

                  {/* Password Input */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-600 text-dark">
                      <i className="fa fa-lock me-2"></i>Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                    <small className="text-muted d-block mt-1">
                      Try password: password123 (for all accounts)
                    </small>
                  </div>

                  {/* Role Selection */}
                  <div className="mb-4">
                    <label htmlFor="role" className="form-label fw-600 text-dark">
                      <i className="fa fa-user-tag me-2"></i>Role
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      disabled={loading}
                    >
                      <option value="student">Student</option>
                      <option value="staff">Staff</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 fw-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <i className="fa fa-sign-in me-2"></i>Sign In
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <hr className="my-4" />

                {/* Demo Credentials Info */}
                <div className="alert alert-info alert-sm" role="alert">
                  <strong>
                    <i className="fa fa-info-circle me-2"></i>Demo Credentials
                  </strong>
                  <ul className="small mb-0 mt-2">
                    <li>
                      <strong>Student:</strong> student@example.com / password123
                    </li>
                    <li>
                      <strong>Staff:</strong> staff@example.com / password123
                    </li>
                    <li>
                      <strong>Admin:</strong> admin@example.com / password123
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Text */}
            <p className="text-center text-muted small mt-4">
              &copy; 2025 School Equipment Lending Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;