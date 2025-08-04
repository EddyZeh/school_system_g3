import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StudentDashboard from './components/StudentDashboard';
import LecturerDashboard from './components/LecturerDashboard';
import TADashboard from './components/TADashboard';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import apiService from './services/api';
import './App.css';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [userType, setUserType] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (userData) => {
    setIsLoading(true);
    try {
      const response = await apiService.login(userData);
      
      if (response.success) {
        setCurrentUser(response.user);
        setUserType(response.user.userType);
        setIsAuthenticated(true);
        setShowLoginModal(false);
        alert(`Successfully logged in as ${response.user.userType}! Welcome back ${response.user.firstName}!`);
      }
    } catch (error) {
      alert(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (userData) => {
    setIsLoading(true);
    try {
      const response = await apiService.signup(userData);
      
      if (response.success) {
        setCurrentUser(response.user);
        setUserType(response.user.userType);
        setIsAuthenticated(true);
        setShowSignupModal(false);
        alert(`Successfully registered as ${response.user.userType}! Welcome ${response.user.firstName} ${response.user.lastName}!`);
      }
    } catch (error) {
      alert(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType('');
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                userType === 'student' ? (
                  <StudentDashboard 
                    currentUser={currentUser}
                    onLogout={handleLogout}
                  />
                ) : userType === 'lecturer' ? (
                  <LecturerDashboard 
                    currentUser={currentUser}
                    onLogout={handleLogout}
                  />
                ) : userType === 'ta' ? (
                  <TADashboard 
                    currentUser={currentUser}
                    onLogout={handleLogout}
                  />
                ) : (
                  <Dashboard 
                    onLoginClick={(type) => {
                      setUserType(type);
                      setShowLoginModal(true);
                    }}
                    onSignupClick={(type) => {
                      setUserType(type);
                      setShowSignupModal(true);
                    }}
                    isAuthenticated={isAuthenticated}
                    onLogout={handleLogout}
                    userType={userType}
                    currentUser={currentUser}
                  />
                )
              ) : (
                <Dashboard 
                  onLoginClick={(type) => {
                    setUserType(type);
                    setShowLoginModal(true);
                  }}
                  onSignupClick={(type) => {
                    setUserType(type);
                    setShowSignupModal(true);
                  }}
                  isAuthenticated={isAuthenticated}
                  onLogout={handleLogout}
                  userType={userType}
                  currentUser={currentUser}
                />
              )
            } 
          />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Login Modal */}
        {showLoginModal && (
          <LoginModal
            userType={userType}
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
            onSwitchToSignup={() => {
              setShowLoginModal(false);
              setShowSignupModal(true);
            }}
            isLoading={isLoading}
          />
        )}

        {/* Signup Modal */}
        {showSignupModal && (
          <SignupModal
            userType={userType}
            onClose={() => setShowSignupModal(false)}
            onSignup={handleSignup}
            onSwitchToLogin={() => {
              setShowSignupModal(false);
              setShowLoginModal(true);
            }}
            isLoading={isLoading}
          />
        )}
      </div>
    </Router>
  );
}

export default App; 