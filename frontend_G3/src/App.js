import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StudentDashboard from './components/StudentDashboard';
import LecturerDashboard from './components/LecturerDashboard';
import TADashboard from './components/TADashboard';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import './App.css';

/*
TESTING GUIDE FOR SIGNUP PAGE (No Backend Required):

1. START THE DEVELOPMENT SERVER:
   npm start

2. TEST SIGNUP FLOW:
   - Click on any user type (Student, Lecturer, or TA)
   - Click "Sign Up as [User Type]"
   - Fill out the 3-step form:
     Step 1: First Name, Last Name, Email
     Step 2: Password, Confirm Password, ID
     Step 3: Phone, Program/Department, Year/Specialization
   - Click "Create Account"
   - You'll see a success message and be logged in

3. TEST LOGIN FLOW:
   - Logout first
   - Click "Login as [User Type]"
   - Use the email and password from your signup
   - You'll be logged in successfully

4. TEST VALIDATION:
   - Try submitting with empty fields
   - Try using an invalid email format
   - Try using a weak password
   - Try using different passwords in confirm field
   - Try signing up with the same email twice

5. TEST USER PERSISTENCE:
   - Sign up a new user
   - Logout and login with the same credentials
   - Your user data is stored in localStorage

6. VIEW STORED USERS:
   - Open browser DevTools (F12)
   - Go to Application tab > Local Storage
   - Look for 'mockUsers' key to see all registered users

The signup form includes comprehensive validation and simulates a real backend experience!
*/

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [userType, setUserType] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Mock user storage
  const getMockUsers = () => {
    const users = localStorage.getItem('mockUsers');
    return users ? JSON.parse(users) : [];
  };

  const saveMockUser = (userData) => {
    const users = getMockUsers();
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('mockUsers', JSON.stringify(users));
    return newUser;
  };

  const handleLogin = (userData) => {
    // This will be connected to backend later
    console.log('Login attempt:', userData);
    
    // Simulate API call delay
    setTimeout(() => {
      // Check if user exists
      const users = getMockUsers();
      const user = users.find(u => u.email === userData.email && u.userType === userData.userType);
      
      if (!user) {
        alert('User not found. Please sign up first!');
        return;
      }
      
      // Check password (in real app, this would be hashed)
      if (user.password !== userData.password) {
        alert('Invalid password!');
        return;
      }
      
      setCurrentUser(user);
      alert(`Successfully logged in as ${userData.userType}! Welcome back ${user.firstName}!`);
      setIsAuthenticated(true);
      setShowLoginModal(false);
    }, 1000);
  };

  const handleSignup = (userData) => {
    // This will be connected to backend later
    console.log('Signup attempt:', userData);
    
    // Simulate API call delay
    setTimeout(() => {
      // Check if user already exists
      const users = getMockUsers();
      const existingUser = users.find(user => user.email === userData.email);
      
      if (existingUser) {
        alert('User with this email already exists!');
        return;
      }
      
      // Save new user
      const newUser = saveMockUser(userData);
      setCurrentUser(newUser);
      
      // Simulate successful signup
      alert(`Successfully registered as ${userData.userType}! Welcome ${userData.firstName} ${userData.lastName}!`);
      setIsAuthenticated(true);
      setShowSignupModal(false);
    }, 1000);
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
          />
        )}
      </div>
    </Router>
  );
}

export default App; 