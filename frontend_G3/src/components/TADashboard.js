import React, { useState } from 'react';
import './Dashboard.css';

const TADashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for TA dashboard
  const mockAssignedCourses = [
    {
      id: 1,
      code: 'CPEN 208',
      name: 'Software Engineering',
      lecturer: 'Dr. John Smith',
      department: 'Computer Engineering',
      level: '200 Level',
      students: 45
    },
    {
      id: 2,
      code: 'CPEN 301',
      name: 'Database Systems',
      lecturer: 'Dr. Sarah Wilson',
      department: 'Computer Engineering',
      level: '300 Level',
      students: 38
    }
  ];

  const mockLecturers = [
    {
      id: 1,
      name: 'Dr. John Smith',
      email: 'john.smith@university.edu',
      department: 'Computer Engineering',
      specialization: 'Software Engineering'
    },
    {
      id: 2,
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@university.edu',
      department: 'Computer Engineering',
      specialization: 'Database Systems'
    }
  ];

  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Assigned Courses</h3>
          <p className="stat-number">{mockAssignedCourses.length}</p>
          <p className="stat-label">Active Courses</p>
        </div>
        <div className="stat-card">
          <h3>Total Students</h3>
          <p className="stat-number">{mockAssignedCourses.reduce((sum, course) => sum + course.students, 0)}</p>
          <p className="stat-label">Under Supervision</p>
        </div>
        <div className="stat-card">
          <h3>Supervising Lecturers</h3>
          <p className="stat-number">{mockLecturers.length}</p>
          <p className="stat-label">Assigned Lecturers</p>
        </div>
        <div className="stat-card">
          <h3>Department</h3>
          <p className="stat-number">Computer Engineering</p>
          <p className="stat-label">Primary Department</p>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="courses-section">
      <h3>My Assigned Courses</h3>
      <div className="courses-grid">
        {mockAssignedCourses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <h4>{course.code}</h4>
              <span className="course-level">{course.level}</span>
            </div>
            <h5>{course.name}</h5>
            <div className="course-details">
              <p><strong>Supervising Lecturer:</strong> {course.lecturer}</p>
              <p><strong>Department:</strong> {course.department}</p>
              <p><strong>Students:</strong> {course.students}</p>
            </div>
            <div className="course-actions">
              <button className="btn btn-primary">View Materials</button>
              <button className="btn btn-secondary">Upload Material</button>
              <button className="btn btn-secondary">Submit Results</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLecturers = () => (
    <div className="lecturers-section">
      <h3>Supervising Lecturers</h3>
      <div className="lecturers-grid">
        {mockLecturers.map((lecturer) => (
          <div key={lecturer.id} className="lecturer-card">
            <div className="lecturer-header">
              <div className="lecturer-avatar">
                {lecturer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="lecturer-info">
                <h4>{lecturer.name}</h4>
                <p>{lecturer.email}</p>
              </div>
            </div>
            <div className="lecturer-details">
              <p><strong>Department:</strong> {lecturer.department}</p>
              <p><strong>Specialization:</strong> {lecturer.specialization}</p>
            </div>
            <div className="lecturer-actions">
              <button className="btn btn-primary">Schedule Meeting</button>
              <button className="btn btn-secondary">Send Message</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComingSoon = () => (
    <div className="coming-soon">
      <div className="coming-soon-content">
        <h2>🚧 Coming Soon</h2>
        <p>This feature is currently under development and will be available soon!</p>
        <button className="btn btn-primary" onClick={() => setActiveTab('overview')}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'courses':
        return renderCourses();
      case 'lecturers':
        return renderLecturers();
      case 'results':
      case 'department':
      case 'profile':
      case 'schedule':
      case 'messages':
      case 'materials':
        return renderComingSoon();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="ta-dashboard">
      <div className="dashboard-header">
        <div className="logo">
          <h1>Teaching Assistant Dashboard</h1>
        </div>
        <div className="user-info">
          <span className="user-type-badge">Teaching Assistant</span>
          <span className="user-name">{currentUser?.firstName} {currentUser?.lastName}</span>
          <button className="btn btn-secondary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="sidebar">
          <nav className="dashboard-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button 
              className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              📚 Assigned Courses
            </button>
            <button 
              className={`nav-item ${activeTab === 'lecturers' ? 'active' : ''}`}
              onClick={() => setActiveTab('lecturers')}
            >
              👨‍🏫 Supervising Lecturers
            </button>
            <button 
              className={`nav-item ${activeTab === 'results' ? 'active' : ''}`}
              onClick={() => setActiveTab('results')}
            >
              📊 Results Management
            </button>
            <button 
              className={`nav-item ${activeTab === 'department' ? 'active' : ''}`}
              onClick={() => setActiveTab('department')}
            >
              🏢 Department
            </button>
            <button 
              className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              📅 Schedule
            </button>
            <button 
              className={`nav-item ${activeTab === 'materials' ? 'active' : ''}`}
              onClick={() => setActiveTab('materials')}
            >
              📁 Materials
            </button>
            <button 
              className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              💬 Messages
            </button>
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              👤 Profile
            </button>
          </nav>
        </div>

        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default TADashboard; 