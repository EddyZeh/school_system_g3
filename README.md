# School System G3 Backend Integration

This project has been updated to use backend API responses instead of mock data, with most logic moved to the backend.

## Changes Made

### Backend Changes

1. **New Authentication Controller** (`AuthController.java`)
   - Added `/api/auth/login` endpoint for user authentication
   - Added `/api/auth/signup` endpoint for user registration
   - Supports students, lecturers, and TAs
   - Includes proper error handling and validation

2. **Updated Repositories**
   - Added `findByEmail()` method to `StudentRepository` and `LecturerRepository`
   - Enables email-based user lookup for authentication

3. **CORS Configuration**
   - Added `@CrossOrigin(origins = "http://localhost:3000")` to all controllers
   - Allows frontend to communicate with backend

### Frontend Changes

1. **New API Service** (`services/api.js`)
   - Centralized API communication layer
   - Handles all HTTP requests to backend
   - Includes error handling and response processing

2. **Updated Authentication Flow**
   - Removed mock data storage (localStorage)
   - Login and signup now use real API calls
   - Added loading states and error handling
   - Form inputs disabled during API calls

3. **Updated Dashboard Components**
   - `StudentDashboard` and `LecturerDashboard` now fetch real user data
   - Added loading and error states
   - Profile information displays actual backend data

4. **Enhanced UI/UX**
   - Added loading spinners and disabled states
   - Better error messages and retry functionality
   - Improved form validation and user feedback

## How to Run

### Backend Setup

1. **Database Setup**
   ```bash
   # Ensure PostgreSQL is running
   # Create database 'school_db' if not exists
   ```

2. **Start Backend**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   Backend will run on `http://localhost:7070`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend_G3
   npm install
   ```

2. **Start Frontend**
   ```bash
   npm start
   ```
   Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Students
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `POST /api/students` - Create student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Lecturers
- `GET /api/lecturers` - Get all lecturers
- `GET /api/lecturers/{id}` - Get lecturer by ID
- `POST /api/lecturers` - Create lecturer
- `PUT /api/lecturers/{id}` - Update lecturer
- `DELETE /api/lecturers/{id}` - Delete lecturer

## Features

### Authentication
- ✅ Real backend authentication
- ✅ User registration with validation
- ✅ Login with email/password/ID
- ✅ Loading states and error handling
- ✅ Form validation

### Dashboard Features
- ✅ Real user data from backend
- ✅ Profile information from database
- ✅ Loading and error states
- ✅ Responsive design maintained

### Mock Data (Still Used For)
- Course materials and assignments
- Grades and academic records
- Payment information
- Teaching assistant assignments

## Next Steps

To complete the backend integration, consider implementing:

1. **Course Management APIs**
   - Course enrollment
   - Course materials upload/download
   - Assignment submission and grading

2. **Academic Records APIs**
   - Grade management
   - Transcript generation
   - GPA calculation

3. **Payment System APIs**
   - Fee management
   - Payment processing
   - Financial records

4. **Communication APIs**
   - Messaging system
   - Notifications
   - Announcements

## Technical Notes

- Backend uses Spring Boot with JPA/Hibernate
- Frontend uses React with functional components and hooks
- API communication uses fetch API with proper error handling
- CORS is configured for local development
- Database is PostgreSQL with automatic schema generation 