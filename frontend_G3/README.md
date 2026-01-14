# School Management System Frontend - Group 3

A modern React-based frontend for the Computer Engineering Department's School Management System.

## Features

### 🎯 User Authentication
- **Multi-User Support**: Separate login/signup flows for Students, Lecturers, and Teaching Assistants
- **Modal-Based Interface**: Clean popup authentication forms over dashboard background
- **Form Validation**: Comprehensive client-side validation with error handling
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🎨 User Interface
- **Modern Design**: Clean, professional interface with glassmorphism effects
- **Interactive Dashboard**: Dynamic background with user type selection
- **Step-by-Step Registration**: Multi-step signup process for better UX
- **Real-time Feedback**: Immediate validation and error messages

### 🔧 Technical Features
- **React 18**: Latest React features and hooks
- **React Router**: Client-side routing
- **Styled Components**: CSS-in-JS styling approach
- **Responsive Grid**: CSS Grid and Flexbox for layout
- **Accessibility**: WCAG compliant design

## User Types

### 👨‍🎓 Students
- Access to course enrollment
- View grades and academic progress
- Manage fee payments
- Access course materials

### 👨‍🏫 Lecturers
- Course management
- Student progress tracking
- Grade submission
- Lecture scheduling

### 👩‍💼 Teaching Assistants
- Course support
- Student assistance
- Grade management
- Office hours scheduling

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend_G3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
frontend_G3/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Dashboard.js          # Main dashboard component
│   │   ├── Dashboard.css         # Dashboard styles
│   │   ├── LoginModal.js         # Login modal component
│   │   ├── LoginModal.css        # Login modal styles
│   │   ├── SignupModal.js        # Signup modal component
│   │   └── SignupModal.css       # Signup modal styles
│   ├── App.js                    # Main app component
│   ├── App.css                   # App-level styles
│   ├── index.js                  # App entry point
│   └── index.css                 # Global styles
├── package.json
└── README.md
```

## Component Architecture

### Dashboard Component
- **Purpose**: Main landing page and user type selection
- **Features**: 
  - User type selection cards
  - Authentication buttons
  - Feature showcase
  - Responsive grid layout

### LoginModal Component
- **Purpose**: User authentication interface
- **Features**:
  - Role-specific forms (Student/Lecturer/TA)
  - Form validation
  - Error handling
  - Remember me functionality

### SignupModal Component
- **Purpose**: User registration interface
- **Features**:
  - Multi-step registration process
  - Role-specific fields
  - Password strength validation
  - Progress indicator

## Styling Approach

### Design System
- **Color Palette**: Modern gradient backgrounds with glassmorphism effects
- **Typography**: Inter font family for clean readability
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable button and form components

### CSS Architecture
- **Global Styles**: Base styles and utility classes
- **Component Styles**: Scoped CSS for each component
- **Responsive Design**: Mobile-first approach with breakpoints
- **Animations**: Smooth transitions and hover effects

## Future Enhancements

### Backend Integration
- API integration for authentication
- Real-time data synchronization
- Session management
- Role-based access control

### Additional Features
- Dashboard widgets for each user type
- Notification system
- File upload functionality
- Advanced search and filtering
- Dark mode support

### Performance Optimizations
- Code splitting and lazy loading
- Image optimization
- Caching strategies
- Bundle size optimization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact the development team.

---

**Note**: This frontend is designed to be connected to a Spring Boot backend and PostgreSQL database. The authentication and data management features will be fully functional once the backend integration is complete. 