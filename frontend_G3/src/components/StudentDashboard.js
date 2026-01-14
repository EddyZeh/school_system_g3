import React, { useState } from 'react';
import './Dashboard.css';

const StudentDashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mock data for student dashboard
  const mockCourses = [
    {
      id: 1,
      code: 'CPEN 208',
      name: 'Software Engineering',
      lecturer: 'Dr. John Smith',
      ta: 'Alice Johnson',
      credits: 3,
      materials: [
        { id: 1, name: 'Syllabus.pdf', type: 'pdf', uploadedBy: 'Dr. John Smith', date: '2024-01-15' },
        { id: 2, name: 'Lecture 1 - Introduction.pptx', type: 'ppt', uploadedBy: 'Dr. John Smith', date: '2024-01-20' },
        { id: 3, name: 'Assignment 1.pdf', type: 'pdf', uploadedBy: 'Alice Johnson', date: '2024-01-25' }
      ]
    },
    {
      id: 2,
      code: 'CPEN 301',
      name: 'Database Systems',
      lecturer: 'Dr. Sarah Wilson',
      ta: 'Bob Brown',
      credits: 4,
      materials: [
        { id: 4, name: 'Course Outline.pdf', type: 'pdf', uploadedBy: 'Dr. Sarah Wilson', date: '2024-01-10' },
        { id: 5, name: 'Database Design.pdf', type: 'pdf', uploadedBy: 'Dr. Sarah Wilson', date: '2024-01-18' }
      ]
    },
    {
      id: 3,
      code: 'CPEN 401',
      name: 'Computer Networks',
      lecturer: 'Dr. Michael Chen',
      ta: 'Carol Davis',
      credits: 3,
      materials: [
        { id: 6, name: 'Network Protocols.pdf', type: 'pdf', uploadedBy: 'Dr. Michael Chen', date: '2024-01-12' }
      ]
    }
  ];

  const mockFees = {
    totalTuition: 5000,
    paid: 3500,
    outstanding: 1500,
    dueDate: '2024-03-15',
    paymentHistory: [
      { id: 1, amount: 2000, date: '2024-01-15', method: 'Bank Transfer' },
      { id: 2, amount: 1500, date: '2024-02-01', method: 'Credit Card' }
    ]
  };

  const mockGrades = [
    { courseCode: 'CPEN 208', courseName: 'Software Engineering', grade: 'A', percentage: 85, assignments: 4, exams: 2 },
    { courseCode: 'CPEN 301', courseName: 'Database Systems', grade: 'B+', percentage: 78, assignments: 3, exams: 2 },
    { courseCode: 'CPEN 401', courseName: 'Computer Networks', grade: 'A-', percentage: 82, assignments: 5, exams: 1 }
  ];

  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Registered Courses</h3>
          <p className="stat-number">{mockCourses.length}</p>
          <p className="stat-label">Active Courses</p>
        </div>
        <div className="stat-card">
          <h3>Total Credits</h3>
          <p className="stat-number">{mockCourses.reduce((sum, course) => sum + course.credits, 0)}</p>
          <p className="stat-label">This Semester</p>
        </div>
        <div className="stat-card">
          <h3>Average Grade</h3>
          <p className="stat-number">A-</p>
          <p className="stat-label">Current GPA</p>
        </div>
        <div className="stat-card">
          <h3>Outstanding Fees</h3>
          <p className="stat-number">${mockFees.outstanding}</p>
          <p className="stat-label">Due: {mockFees.dueDate}</p>
        </div>
      </div>

      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">📚</span>
            <div className="activity-content">
              <p>New material uploaded: Assignment 1.pdf</p>
              <small>CPEN 208 - 2 hours ago</small>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">📊</span>
            <div className="activity-content">
              <p>Grade updated: Database Systems - B+</p>
              <small>CPEN 301 - 1 day ago</small>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">💰</span>
            <div className="activity-content">
              <p>Payment received: $1500</p>
              <small>2 days ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="courses-section">
      <h3>My Registered Courses</h3>
      <div className="courses-grid">
        {mockCourses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <h4>{course.code}</h4>
              <span className="course-credits">{course.credits} credits</span>
            </div>
            <h5>{course.name}</h5>
            <div className="course-details">
              <p><strong>Lecturer:</strong> {course.lecturer}</p>
              <p><strong>Teaching Assistant:</strong> {course.ta}</p>
            </div>
            <div className="course-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setSelectedCourse(course)}
              >
                View Materials
              </button>
              <button className="btn btn-secondary">
                View Grades
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="course-materials-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedCourse.code} - Course Materials</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedCourse(null)}
              >
                ×
              </button>
            </div>
            <div className="materials-list">
              {selectedCourse.materials.map((material) => (
                <div key={material.id} className="material-item">
                  <div className="material-info">
                    <span className="material-icon">
                      {material.type === 'pdf' ? '📄' : '📊'}
                    </span>
                    <div>
                      <p className="material-name">{material.name}</p>
                      <small>Uploaded by {material.uploadedBy} on {material.date}</small>
                    </div>
                  </div>
                  <button className="btn btn-primary">Download</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFees = () => (
    <div className="fees-section">
      <h3>Fees & Payments</h3>
      
      <div className="fees-summary">
        <div className="fee-card">
          <h4>Total Tuition</h4>
          <p className="fee-amount">${mockFees.totalTuition}</p>
        </div>
        <div className="fee-card">
          <h4>Amount Paid</h4>
          <p className="fee-amount paid">${mockFees.paid}</p>
        </div>
        <div className="fee-card">
          <h4>Outstanding</h4>
          <p className="fee-amount outstanding">${mockFees.outstanding}</p>
        </div>
        <div className="fee-card">
          <h4>Due Date</h4>
          <p className="fee-date">{mockFees.dueDate}</p>
        </div>
      </div>

      <div className="payment-history">
        <h4>Payment History</h4>
        <div className="payment-list">
          {mockFees.paymentHistory.map((payment) => (
            <div key={payment.id} className="payment-item">
              <div className="payment-info">
                <p className="payment-amount">${payment.amount}</p>
                <p className="payment-method">{payment.method}</p>
              </div>
              <p className="payment-date">{payment.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="payment-actions">
        <button className="btn btn-primary">Make Payment</button>
        <button className="btn btn-secondary">Download Statement</button>
      </div>
    </div>
  );

  const renderGrades = () => (
    <div className="grades-section">
      <h3>Academic Performance</h3>
      
      <div className="grades-summary">
        <div className="grade-stat">
          <h4>Current GPA</h4>
          <p className="gpa">3.7</p>
        </div>
        <div className="grade-stat">
          <h4>Total Courses</h4>
          <p className="course-count">{mockGrades.length}</p>
        </div>
      </div>

      <div className="grades-table">
        <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Grade</th>
              <th>Percentage</th>
              <th>Assignments</th>
              <th>Exams</th>
            </tr>
          </thead>
          <tbody>
            {mockGrades.map((grade, index) => (
              <tr key={index}>
                <td>{grade.courseCode}</td>
                <td>{grade.courseName}</td>
                <td className={`grade-${grade.grade.toLowerCase().replace('+', 'plus').replace('-', 'minus')}`}>
                  {grade.grade}
                </td>
                <td>{grade.percentage}%</td>
                <td>{grade.assignments}</td>
                <td>{grade.exams}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="profile-section">
      <h3>My Profile</h3>
      
      <div className="profile-content">
        <div className="profile-picture">
          <div className="avatar">
            {currentUser?.firstName?.charAt(0)}{currentUser?.lastName?.charAt(0)}
          </div>
          <button className="btn btn-secondary">Change Photo</button>
        </div>

        <div className="profile-details">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" defaultValue={currentUser?.firstName || ''} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" defaultValue={currentUser?.lastName || ''} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue={currentUser?.email || ''} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" defaultValue={currentUser?.phone || ''} />
          </div>
          <div className="form-group">
            <label>Student ID</label>
            <input type="text" defaultValue={currentUser?.studentId || ''} />
          </div>
          <div className="form-group">
            <label>Program</label>
            <input type="text" defaultValue={currentUser?.program || ''} />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input type="text" defaultValue={currentUser?.year || ''} />
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn btn-primary">Save Changes</button>
          <button className="btn btn-secondary">Change Password</button>
        </div>
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
      case 'fees':
        return renderFees();
      case 'grades':
        return renderGrades();
      case 'profile':
        return renderProfile();
      case 'schedule':
      case 'messages':
      case 'assignments':
        return renderComingSoon();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <div className="logo">
          <h1>Student Dashboard</h1>
        </div>
        <div className="user-info">
          <span className="user-type-badge">Student</span>
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
              📚 My Courses
            </button>
            <button 
              className={`nav-item ${activeTab === 'fees' ? 'active' : ''}`}
              onClick={() => setActiveTab('fees')}
            >
              💰 Fees & Payments
            </button>
            <button 
              className={`nav-item ${activeTab === 'grades' ? 'active' : ''}`}
              onClick={() => setActiveTab('grades')}
            >
              📈 Grades
            </button>
            <button 
              className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              📅 Schedule
            </button>
            <button 
              className={`nav-item ${activeTab === 'assignments' ? 'active' : ''}`}
              onClick={() => setActiveTab('assignments')}
            >
              📝 Assignments
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

export default StudentDashboard; 