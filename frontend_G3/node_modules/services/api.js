const API_BASE_URL = 'http://localhost:7070/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(loginData) {
    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  }

  async signup(signupData) {
    return this.makeRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(signupData),
    });
  }

  // Student methods
  async getStudents() {
    return this.makeRequest('/students');
  }

  async getStudentById(id) {
    return this.makeRequest(`/students/${id}`);
  }

  async createStudent(studentData) {
    return this.makeRequest('/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  }

  async updateStudent(id, studentData) {
    return this.makeRequest(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    });
  }

  async deleteStudent(id) {
    return this.makeRequest(`/students/${id}`, {
      method: 'DELETE',
    });
  }

  // Lecturer methods
  async getLecturers() {
    return this.makeRequest('/lecturers');
  }

  async getLecturerById(id) {
    return this.makeRequest(`/lecturers/${id}`);
  }

  async createLecturer(lecturerData) {
    return this.makeRequest('/lecturers', {
      method: 'POST',
      body: JSON.stringify(lecturerData),
    });
  }

  async updateLecturer(id, lecturerData) {
    return this.makeRequest(`/lecturers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(lecturerData),
    });
  }

  async deleteLecturer(id) {
    return this.makeRequest(`/lecturers/${id}`, {
      method: 'DELETE',
    });
  }

  // Course methods (if needed)
  async getCourses() {
    return this.makeRequest('/courses');
  }

  async getCourseById(id) {
    return this.makeRequest(`/courses/${id}`);
  }

  // Department methods (if needed)
  async getDepartments() {
    return this.makeRequest('/departments');
  }

  async getDepartmentById(id) {
    return this.makeRequest(`/departments/${id}`);
  }
}

export default new ApiService(); 