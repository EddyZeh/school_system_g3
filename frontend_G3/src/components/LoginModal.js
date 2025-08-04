import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ userType, onClose, onLogin, onSwitchToSignup, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    studentId: '',
    lecturerId: '',
    taId: ''
  });
  const [errors, setErrors] = useState({});

  const userTypeConfig = {
    student: {
      title: 'Student Login',
      subtitle: 'Access your courses, grades, and payments',
      icon: '🎓',
      fields: ['email', 'password', 'studentId']
    },
    lecturer: {
      title: 'Lecturer Login',
      subtitle: 'Manage your courses and student progress',
      icon: '👨‍🏫',
      fields: ['email', 'password', 'lecturerId']
    },
    ta: {
      title: 'Teaching Assistant Login',
      subtitle: 'Support courses and assist students',
      icon: '👩‍💼',
      fields: ['email', 'password', 'taId']
    }
  };

  const config = userTypeConfig[userType] || userTypeConfig.student;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Validate ID field based on user type
    const idField = config.fields[2]; // studentId, lecturerId, or taId
    if (!formData[idField]) {
      newErrors[idField] = `${userType.charAt(0).toUpperCase() + userType.slice(1)} ID is required`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm() && !isLoading) {
      const loginData = {
        userType,
        email: formData.email,
        password: formData.password,
        id: formData[config.fields[2]]
      };
      
      onLogin(loginData);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="form-container">
          <div className="form-header">
            <div className="form-icon">{config.icon}</div>
            <h2 className="form-title">{config.title}</h2>
            <p className="form-subtitle">{config.subtitle}</p>
          </div>
          
          <form onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor={config.fields[2]}>
                {userType.charAt(0).toUpperCase() + userType.slice(1)} ID
              </label>
              <input
                type="text"
                id={config.fields[2]}
                name={config.fields[2]}
                className={`form-input ${errors[config.fields[2]] ? 'error' : ''}`}
                value={formData[config.fields[2]]}
                onChange={handleInputChange}
                placeholder={`Enter your ${userType} ID`}
                disabled={isLoading}
              />
              {errors[config.fields[2]] && (
                <span className="error-message">{errors[config.fields[2]]}</span>
              )}
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" disabled={isLoading} />
                <span className="checkbox-text">Remember me</span>
              </label>
            </div>
            
            <button 
              type="submit" 
              className={`btn btn-primary form-submit ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="form-footer">
            <p>
              Don't have an account?{' '}
              <a href="#" onClick={(e) => {
                e.preventDefault();
                onSwitchToSignup();
              }}>
                Sign up here
              </a>
            </p>
            <p>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Forgot your password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 