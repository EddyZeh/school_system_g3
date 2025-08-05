import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import './Dashboard.css';

const LecturerDashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showGradingModal, setShowGradingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for courses, TAs, and students (since these endpoints don't exist yet)
  const mockCourses = [
    {
      id: 1,
      code: 'CPEN 208',
      name: 'Software Engineering',
      ta: 'Alice Johnson',
      department: 'Computer Engineering',
      level: '200 Level',
      students: 45,
      materials: [
        { id: 1, name: 'Syllabus.pdf', type: 'pdf', uploadedBy: 'Dr. John Smith', date: '2024-01-15' },
        { id: 2, name: 'Lecture 1 - Introduction.pptx', type: 'ppt', uploadedBy: 'Dr. John Smith', date: '2024-01-20' }
      ]
    },
    {
      id: 2,
      code: 'CPEN 301',
      name: 'Database Systems',
      ta: 'Bob Brown',
      department: 'Computer Engineering',
      level: '300 Level',
      students: 38,
      materials: [
        { id: 3, name: 'Course Outline.pdf', type: 'pdf', uploadedBy: 'Dr. Sarah Wilson', date: '2024-01-10' },
        { id: 4, name: 'Database Design.pdf', type: 'pdf', uploadedBy: 'Dr. Sarah Wilson', date: '2024-01-18' }
      ]
    }
  ];

  const mockTAs = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@university.edu',
      course: 'CPEN 208 - Software Engineering',
      department: 'Computer Engineering',
      level: '200 Level'
    },
    {
      id: 2,
      name: 'Bob Brown',
      email: 'bob.brown@university.edu',
      course: 'CPEN 301 - Database Systems',
      department: 'Computer Engineering',
      level: '300 Level'
    }
  ];

  const mockStudents = [
    {
      id: 1,
      name: 'John Doe',
      studentId: '2021001',
      course: 'CPEN 208',
      assignments: [
        { id: 1, name: 'Assignment 1', score: 85, maxScore: 100, submittedBy: 'Alice Johnson' },
        { id: 2, name: 'Assignment 2', score: 92, maxScore: 100, submittedBy: 'Alice Johnson' }
      ],
      exams: [
        { id: 1, name: 'Midterm Exam', score: 78, maxScore: 100, submittedBy: 'Alice Johnson' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      studentId: '2021002',
      course: 'CPEN 208',
      assignments: [
        { id: 3, name: 'Assignment 1', score: 90, maxScore: 100, submittedBy: 'Alice Johnson' },
        { id: 4, name: 'Assignment 2', score: 88, maxScore: 100, submittedBy: 'Alice Johnson' }
      ],
      exams: [
        { id: 2, name: 'Midterm Exam', score: 85, maxScore: 100, submittedBy: 'Alice Johnson' }
      ]
    }
  ];

  useEffect(() => {
    // Debug: Log current user data
    console.log('Current user data:', currentUser);
    
    // Set loading to false immediately since we have the data from login/signup
    setIsLoading(false);
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading lecturer dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  // Use currentUser directly since it has all the data from login/signup
  const lecturer = currentUser;

  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Teaching Courses</h3>
          <p className="stat-number">{mockCourses.length}</p>
          <p className="stat-label">Active Courses</p>
        </div>
        <div className="stat-card">
          <h3>Total Students</h3>
          <p className="stat-number">{mockCourses.reduce((sum, course) => sum + course.students, 0)}</p>
          <p className="stat-label">Enrolled Students</p>
        </div>
        <div className="stat-card">
          <h3>Teaching Assistants</h3>
          <p className="stat-number">{mockTAs.length}</p>
          <p className="stat-label">Assigned TAs</p>
        </div>
        <div className="stat-card">
          <h3>Department</h3>
          <p className="stat-number">{lecturer?.department || 'Computer Engineering'}</p>
          <p className="stat-label">Primary Department</p>
        </div>
      </div>

      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">📚</span>
            <div className="activity-content">
              <p>New material uploaded: Lecture 2 - Requirements Engineering</p>
              <small>CPEN 208 - 1 hour ago</small>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">📊</span>
            <div className="activity-content">
              <p>Grades submitted by TA: Assignment 2 results</p>
              <small>CPEN 208 - 3 hours ago</small>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">👥</span>
            <div className="activity-content">
              <p>New student enrolled: CPEN 301</p>
              <small>1 day ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="courses-section">
      <h3>My Teaching Courses</h3>
      <div className="courses-grid">
        {mockCourses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <h4>{course.code}</h4>
              <span className="course-level">{course.level}</span>
            </div>
            <h5>{course.name}</h5>
            <div className="course-details">
              <p><strong>Department:</strong> {course.department}</p>
              <p><strong>Teaching Assistant:</strong> {course.ta}</p>
              <p><strong>Students:</strong> {course.students}</p>
            </div>
            <div className="course-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setSelectedCourse(course)}
              >
                View Materials
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowUploadModal(true)}
              >
                Upload Material
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowGradingModal(true)}
              >
                Grade Students
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
                  <div className="material-actions">
                    <button className="btn btn-primary">Download</button>
                    <button className="btn btn-secondary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTAs = () => (
    <div className="tas-section">
      <h3>Teaching Assistants</h3>
      <div className="tas-grid">
        {mockTAs.map((ta) => (
          <div key={ta.id} className="ta-card">
            <div className="ta-header">
              <div className="ta-avatar">
                {ta.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="ta-info">
                <h4>{ta.name}</h4>
                <p>{ta.email}</p>
              </div>
            </div>
            <div className="ta-details">
              <p><strong>Assigned Course:</strong> {ta.course}</p>
              <p><strong>Department:</strong> {ta.department}</p>
              <p><strong>Level:</strong> {ta.level}</p>
            </div>
            <div className="ta-actions">
              <button className="btn btn-primary">View Performance</button>
              <button className="btn btn-secondary">Send Message</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGrading = () => (
    <div className="grading-section">
      <h3>Student Grading</h3>
      
      <div className="grading-filters">
        <select className="form-select">
          <option>Select Course</option>
          {mockCourses.map(course => (
            <option key={course.id}>{course.code} - {course.name}</option>
          ))}
        </select>
        <select className="form-select">
          <option>Select Assignment/Exam</option>
          <option>Assignment 1</option>
          <option>Assignment 2</option>
          <option>Midterm Exam</option>
          <option>Final Exam</option>
        </select>
      </div>

      <div className="students-grading-table">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student ID</th>
              <th>Course</th>
              <th>Assignment/Exam</th>
              <th>Score</th>
              <th>Max Score</th>
              <th>Percentage</th>
              <th>Submitted By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockStudents.flatMap(student => 
              [...student.assignments, ...student.exams].map((item, index) => (
                <tr key={`${student.id}-${item.id}`}>
                  <td>{student.name}</td>
                  <td>{student.studentId}</td>
                  <td>{student.course}</td>
                  <td>{item.name}</td>
                  <td>{item.score}</td>
                  <td>{item.maxScore}</td>
                  <td>{Math.round((item.score / item.maxScore) * 100)}%</td>
                  <td>{item.submittedBy}</td>
                  <td>
                    <button className="btn btn-primary btn-sm">Review</button>
                    <button className="btn btn-secondary btn-sm">Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDepartment = () => (
    <div className="department-section">
      <h3>Department Information</h3>
      
      <div className="department-info">
        <div className="info-card">
          <h4>{lecturer?.department || 'Computer Engineering'} Department</h4>
          <p><strong>Head of Department:</strong> Prof. David Wilson</p>
          <p><strong>Location:</strong> Engineering Building, Floor 3</p>
          <p><strong>Contact:</strong> cpen@university.edu</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        </div>

        <div className="department-stats">
          <div className="stat-item">
            <h5>Total Faculty</h5>
            <p>25</p>
          </div>
          <div className="stat-item">
            <h5>Total Students</h5>
            <p>450</p>
          </div>
          <div className="stat-item">
            <h5>Active Courses</h5>
            <p>35</p>
          </div>
          <div className="stat-item">
            <h5>Research Areas</h5>
            <p>12</p>
          </div>
        </div>
      </div>

      <div className="department-levels">
        <h4>Course Levels</h4>
        <div className="levels-grid">
          <div className="level-card">
            <h5>100 Level</h5>
            <p>Foundation courses for first-year students</p>
            <span className="level-count">8 courses</span>
          </div>
          <div className="level-card">
            <h5>200 Level</h5>
            <p>Core engineering principles and fundamentals</p>
            <span className="level-count">12 courses</span>
          </div>
          <div className="level-card">
            <h5>300 Level</h5>
            <p>Advanced topics and specialization courses</p>
            <span className="level-count">10 courses</span>
          </div>
          <div className="level-card">
            <h5>400 Level</h5>
            <p>Capstone projects and advanced electives</p>
            <span className="level-count">5 courses</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="profile-section">
      <h3>My Profile</h3>
      
      <div className="profile-content">
        <div className="profile-picture">
          <div className="avatar">
            {lecturer?.firstName?.charAt(0)}{lecturer?.lastName?.charAt(0)}
          </div>
          <button className="btn btn-secondary">Change Photo</button>
        </div>

        <div className="profile-details">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" defaultValue={lecturer?.firstName || ''} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" defaultValue={lecturer?.lastName || ''} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue={lecturer?.email || ''} />
          </div>
          <div className="form-group">
            <label>Lecturer ID</label>
            <input type="text" defaultValue={lecturer?.id || ''} />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input type="text" defaultValue={lecturer?.department || 'Computer Engineering'} />
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
      case 'tas':
        return renderTAs();
      case 'grading':
        return renderGrading();
      case 'department':
        return renderDepartment();
      case 'profile':
        return renderProfile();
      case 'schedule':
      case 'messages':
      case 'materials':
        return renderComingSoon();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="lecturer-dashboard">
      <div className="dashboard-header">
        <div className="logo">
          <h1>Lecturer Dashboard</h1>
        </div>
        <div className="user-info">
          <span className="user-type-badge">Lecturer</span>
          <span className="user-name">{lecturer?.firstName} {lecturer?.lastName}</span>
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
              className={`nav-item ${activeTab === 'tas' ? 'active' : ''}`}
              onClick={() => setActiveTab('tas')}
            >
              👥 Teaching Assistants
            </button>
            <button 
              className={`nav-item ${activeTab === 'grading' ? 'active' : ''}`}
              onClick={() => setActiveTab('grading')}
            >
              📈 Grading
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

export default LecturerDashboard; 