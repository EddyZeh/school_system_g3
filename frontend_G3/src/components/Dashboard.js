import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ onLoginClick, onSignupClick, isAuthenticated, onLogout, userType, currentUser }) => {
  const [selectedUserType, setSelectedUserType] = useState('');

  const userTypes = [
    {
      id: 'student',
      title: 'Student',
      description: 'Access courses, grades, and payments',
      icon: '🎓',
      color: '#667eea'
    },
    {
      id: 'lecturer',
      title: 'Lecturer',
      description: 'Manage courses and student progress',
      icon: '👨‍🏫',
      color: '#f093fb'
    },
    {
      id: 'ta',
      title: 'Teaching Assistant',
      description: 'Support courses and student assistance',
      icon: '👩‍💼',
      color: '#4facfe'
    }
  ];

  const handleUserTypeSelect = (type) => {
    setSelectedUserType(type);
  };

  const handleLogin = () => {
    if (selectedUserType) {
      onLoginClick(selectedUserType);
    }
  };

  const handleSignup = () => {
    if (selectedUserType) {
      onSignupClick(selectedUserType);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="logo">
            <h1>School of Engineering Sciences Platform</h1>
          </div>
          <div className="user-info">
            <span className="user-type-badge">{userType}</span>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
        
        <div className="dashboard-content">
          <div className="welcome-section">
            <h2>Welcome to your Dashboard</h2>
            <p>You are logged in as a {userType}</p>
            {currentUser && (
              <div className="user-details">
                <p><strong>Name:</strong> {currentUser.firstName} {currentUser.lastName}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                {currentUser.studentId && <p><strong>Student ID:</strong> {currentUser.studentId}</p>}
                {currentUser.lecturerId && <p><strong>Lecturer ID:</strong> {currentUser.lecturerId}</p>}
                {currentUser.taId && <p><strong>TA ID:</strong> {currentUser.taId}</p>}
                {currentUser.program && <p><strong>Program:</strong> {currentUser.program}</p>}
                {currentUser.year && <p><strong>Year:</strong> {currentUser.year}</p>}
                {currentUser.department && <p><strong>Department:</strong> {currentUser.department}</p>}
                {currentUser.specialization && <p><strong>Specialization:</strong> {currentUser.specialization}</p>}
              </div>
            )}
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Courses</h3>
                <p>5 Active</p>
              </div>
              <div className="stat-card">
                <h3>Assignments</h3>
                <p>12 Pending</p>
              </div>
              <div className="stat-card">
                <h3>Messages</h3>
                <p>3 Unread</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
              <div className="dashboard-header">
          <div className="logo">
            <h1>School of Engineering Sciences Platform</h1>
          </div>
        </div>
      
      <div className="dashboard-content">
        <div className="hero-section">
          <h2>Welcome to the School of Engineering Sciences Platform</h2>
          <p>Choose your role to get started</p>
          
          <div className="user-type-grid">
            {userTypes.map((type) => (
              <div
                key={type.id}
                className={`user-type-card ${selectedUserType === type.id ? 'selected' : ''}`}
                onClick={() => handleUserTypeSelect(type.id)}
                style={{ borderColor: selectedUserType === type.id ? type.color : '#e5e7eb' }}
              >
                <div className="user-type-icon" style={{ color: type.color }}>
                  {type.icon}
                </div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </div>
            ))}
          </div>
          
          {selectedUserType && (
            <div className="auth-buttons">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login as {userTypes.find(t => t.id === selectedUserType)?.title}
              </button>
              <button className="btn btn-secondary" onClick={handleSignup}>
                Sign Up as {userTypes.find(t => t.id === selectedUserType)?.title}
              </button>
            </div>
          )}
        </div>
        
        <div className="features-section">
          <h3>System Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>📚 Course Management</h4>
              <p>Enroll in courses, view schedules, and access materials</p>
            </div>
            <div className="feature-card">
              <h4>💰 Fee Management</h4>
              <p>Track payments, view statements, and manage finances</p>
            </div>
            <div className="feature-card">
              <h4>📊 Grade Tracking</h4>
              <p>Monitor academic progress and performance</p>
            </div>
            <div className="feature-card">
              <h4>📅 Schedule Management</h4>
              <p>View timetables and manage appointments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 