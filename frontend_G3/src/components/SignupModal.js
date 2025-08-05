import React, { useState } from 'react';
import './SignupModal.css';

const SignupModal = ({ userType, onClose, onSignup, onSwitchToLogin, isLoading = false }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    lecturerId: '',
    taId: '',
    phone: '',
    department: '',
    program: '',
    year: '',
    specialization: ''
  });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const userTypeConfig = {
    student: {
      title: 'Student Registration',
      subtitle: 'Create your student account',
      icon: '🎓',
      fields: ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'studentId', 'phone', 'program', 'year']
    },
    lecturer: {
      title: 'Lecturer Registration',
      subtitle: 'Create your lecturer account',
      icon: '👨‍🏫',
      fields: ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'lecturerId', 'phone', 'department', 'specialization']
    },
    ta: {
      title: 'Teaching Assistant Registration',
      subtitle: 'Create your TA account',
      icon: '👩‍💼',
      fields: ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'taId', 'phone', 'department', 'specialization']
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

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }
    
    if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, and number';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      // Validate ID field based on user type
      const idField = config.fields[5]; // studentId, lecturerId, or taId
      if (!formData[idField]) {
        newErrors[idField] = `${userType.charAt(0).toUpperCase() + userType.slice(1)} ID is required`;
      }
    }
    
    if (step === 3) {
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.department && userType !== 'student') newErrors.department = 'Department is required';
      if (!formData.program && userType === 'student') newErrors.program = 'Program is required';
      if (!formData.year && userType === 'student') newErrors.year = 'Year is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && !isLoading) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isLoading) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep(currentStep) && !isLoading) {
      // Determine the correct ID field based on userType
      let id = '';
      if (userType === 'student') id = formData.studentId;
      else if (userType === 'lecturer') id = formData.lecturerId;
      else if (userType === 'ta') id = formData.taId;

      const signupData = {
        userType,
        ...formData,
        id // Add the correct id field for backend
      };
      
      onSignup(signupData);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const renderStep1 = () => (
    <>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`form-input ${errors.firstName ? 'error' : ''}`}
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            disabled={isLoading}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`form-input ${errors.lastName ? 'error' : ''}`}
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            disabled={isLoading}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
      </div>
      
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
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="form-group">
        <label className="form-label" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className={`form-input ${errors.password ? 'error' : ''}`}
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Create a password"
          disabled={isLoading}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          disabled={isLoading}
        />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor={config.fields[5]}>
          {userType.charAt(0).toUpperCase() + userType.slice(1)} ID
        </label>
        <input
          type="text"
          id={config.fields[5]}
          name={config.fields[5]}
          className={`form-input ${errors[config.fields[5]] ? 'error' : ''}`}
          value={formData[config.fields[5]]}
          onChange={handleInputChange}
          placeholder={`Enter your ${userType} ID`}
          disabled={isLoading}
        />
        {errors[config.fields[5]] && (
          <span className="error-message">{errors[config.fields[5]]}</span>
        )}
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="form-group">
        <label className="form-label" htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={`form-input ${errors.phone ? 'error' : ''}`}
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          disabled={isLoading}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>
      
      {userType === 'student' ? (
        <>
          <div className="form-group">
            <label className="form-label" htmlFor="program">Program</label>
            <select
              id="program"
              name="program"
              className={`form-input ${errors.program ? 'error' : ''}`}
              value={formData.program}
              onChange={handleInputChange}
              disabled={isLoading}
            >
              <option value="">Select your program</option>
              <optgroup label="Biomedical Engineering">
                <option value="bachelor-biomedical">Bachelor of Biomedical Engineering</option>
                <option value="master-biomedical">Master of Biomedical Engineering</option>
                <option value="phd-biomedical">PhD in Biomedical Engineering</option>
              </optgroup>
              <optgroup label="Food Process Engineering">
                <option value="bachelor-food">Bachelor of Food Process Engineering</option>
                <option value="master-food">Master of Food Process Engineering</option>
                <option value="phd-food">PhD in Food Process Engineering</option>
              </optgroup>
              <optgroup label="Agricultural Engineering">
                <option value="bachelor-agricultural">Bachelor of Agricultural Engineering</option>
                <option value="master-agricultural">Master of Agricultural Engineering</option>
                <option value="phd-agricultural">PhD in Agricultural Engineering</option>
              </optgroup>
              <optgroup label="Material Science and Engineering">
                <option value="bachelor-materials">Bachelor of Material Science and Engineering</option>
                <option value="master-materials">Master of Material Science and Engineering</option>
                <option value="phd-materials">PhD in Material Science and Engineering</option>
              </optgroup>
              <optgroup label="Computer Engineering">
                <option value="bachelor-computer">Bachelor of Computer Engineering</option>
                <option value="master-computer">Master of Computer Engineering</option>
                <option value="phd-computer">PhD in Computer Engineering</option>
              </optgroup>
            </select>
            {errors.program && <span className="error-message">{errors.program}</span>}
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="year">Year Level</label>
            <select
              id="year"
              name="year"
              className={`form-input ${errors.year ? 'error' : ''}`}
              value={formData.year}
              onChange={handleInputChange}
              disabled={isLoading}
            >
              <option value="">Select your year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            {errors.year && <span className="error-message">{errors.year}</span>}
          </div>
        </>
      ) : (
        <>
          <div className="form-group">
            <label className="form-label" htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              className={`form-input ${errors.department ? 'error' : ''}`}
              value={formData.department}
              onChange={handleInputChange}
              disabled={isLoading}
            >
              <option value="">Select department</option>
              <option value="biomedical-engineering">Biomedical Engineering</option>
              <option value="food-process-engineering">Food Process Engineering</option>
              <option value="agricultural-engineering">Agricultural Engineering</option>
              <option value="material-science-engineering">Material Science and Engineering</option>
              <option value="computer-engineering">Computer Engineering</option>
            </select>
            {errors.department && <span className="error-message">{errors.department}</span>}
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="specialization">Specialization</label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              className={`form-input ${errors.specialization ? 'error' : ''}`}
              value={formData.specialization}
              onChange={handleInputChange}
              placeholder="Enter your specialization"
              disabled={isLoading}
            />
            {errors.specialization && <span className="error-message">{errors.specialization}</span>}
          </div>
        </>
      )}
    </>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content signup-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="form-container">
          <div className="form-header">
            <div className="form-icon">{config.icon}</div>
            <h2 className="form-title">{config.title}</h2>
            <p className="form-subtitle">{config.subtitle}</p>
          </div>
          
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3</div>
          </div>
          
          <form onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
            {renderStepContent()}
            
            <div className="form-actions">
              {currentStep > 1 && (
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handlePrevious}
                  disabled={isLoading}
                >
                  Previous
                </button>
              )}
              
              {currentStep < 3 ? (
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  Next
                </button>
              ) : (
                <button 
                  type="submit" 
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
          </form>
          
          <div className="form-footer">
            <p>
              Already have an account?{' '}
              <a href="#" onClick={(e) => {
                e.preventDefault();
                onSwitchToLogin();
              }}>
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal; 