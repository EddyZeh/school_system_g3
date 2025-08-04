package com.school_system_g3.backend.controller;

import com.school_system_g3.backend.model.Student;
import com.school_system_g3.backend.model.Lecturer;
import com.school_system_g3.backend.repository.StudentRepository;
import com.school_system_g3.backend.repository.LecturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private LecturerRepository lecturerRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String userType = loginRequest.get("userType");
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        String id = loginRequest.get("id");

        if (email == null || password == null || userType == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields"));
        }

        try {
            switch (userType.toLowerCase()) {
                case "student":
                    return handleStudentLogin(email, password, id);
                case "lecturer":
                    return handleLecturerLogin(email, password, id);
                case "ta":
                    return handleTALogin(email, password, id);
                default:
                    return ResponseEntity.badRequest().body(Map.of("error", "Invalid user type"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", "Login failed: " + e.getMessage()));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, Object> signupRequest) {
        String userType = (String) signupRequest.get("userType");
        
        if (userType == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "User type is required"));
        }

        // Debug: Print the received data
        System.out.println("Received signup request: " + signupRequest);

        try {
            switch (userType.toLowerCase()) {
                case "student":
                    return handleStudentSignup(signupRequest);
                case "lecturer":
                    return handleLecturerSignup(signupRequest);
                case "ta":
                    return handleTASignup(signupRequest);
                default:
                    return ResponseEntity.badRequest().body(Map.of("error", "Invalid user type"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", "Signup failed: " + e.getMessage()));
        }
    }

    private ResponseEntity<?> handleStudentLogin(String email, String password, String id) {
        Optional<Student> studentOpt = studentRepository.findByEmail(email);
        
        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "User not found"));
        }

        Student student = studentOpt.get();
        
        // Check if student ID matches (assuming student_id is the ID)
        if (!student.getStudent_id().toString().equals(id)) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid student ID"));
        }

        // Check password (in production, this should be hashed)
        if (!password.equals(student.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid password"));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login successful");
        response.put("user", Map.of(
            "id", student.getStudent_id(),
            "firstName", student.getFirst_name(),
            "lastName", student.getLast_name(),
            "email", student.getEmail(),
            "userType", "student",
            "program", student.getProgram(),
            "level", student.getLevel(),
            "department", student.getDepartment() != null ? student.getDepartment().getDepartment_name() : null
        ));

        return ResponseEntity.ok(response);
    }

    private ResponseEntity<?> handleLecturerLogin(String email, String password, String id) {
        Optional<Lecturer> lecturerOpt = lecturerRepository.findByEmail(email);
        
        if (lecturerOpt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "User not found"));
        }

        Lecturer lecturer = lecturerOpt.get();
        
        // Check if lecturer ID matches
        if (!lecturer.getLecturer_id().toString().equals(id)) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid lecturer ID"));
        }

        // Check password
        if (!password.equals(lecturer.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid password"));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login successful");
        response.put("user", Map.of(
            "id", lecturer.getLecturer_id(),
            "firstName", lecturer.getFirst_name(),
            "lastName", lecturer.getLast_name(),
            "email", lecturer.getEmail(),
            "userType", "lecturer",
            "department", lecturer.getDepartment() != null ? lecturer.getDepartment().getDepartment_name() : null
        ));

        return ResponseEntity.ok(response);
    }

    private ResponseEntity<?> handleTALogin(String email, String password, String id) {
        // For now, we'll treat TAs as lecturers since there's no TA model
        // In a real application, you'd create a separate TA model
        return handleLecturerLogin(email, password, id);
    }

    private ResponseEntity<?> handleStudentSignup(Map<String, Object> signupRequest) {
        String email = (String) signupRequest.get("email");
        String firstName = (String) signupRequest.get("firstName");
        String lastName = (String) signupRequest.get("lastName");
        String password = (String) signupRequest.get("password");
        String program = (String) signupRequest.get("program");
        
        // Validate required fields
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is required"));
        }
        if (firstName == null || firstName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "First name is required"));
        }
        if (lastName == null || lastName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Last name is required"));
        }
        if (password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password is required"));
        }
        if (program == null || program.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Program is required"));
        }
        
        // Check if user already exists
        if (studentRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "User with this email already exists"));
        }

        Student student = new Student();
        student.setFirst_name(firstName.trim());
        student.setLast_name(lastName.trim());
        student.setEmail(email.trim());
        student.setPassword(password);
        student.setProgram(program.trim());
        
        // Handle year conversion from string to integer
        Object yearObj = signupRequest.get("year");
        if (yearObj != null) {
            try {
                if (yearObj instanceof String) {
                    student.setYear(Integer.parseInt((String) yearObj));
                } else if (yearObj instanceof Integer) {
                    student.setYear((Integer) yearObj);
                } else if (yearObj instanceof Number) {
                    student.setYear(((Number) yearObj).intValue());
                }
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid year format"));
            }
        } else {
            // Set default year if not provided
            student.setYear(1);
        }
        
        // Also set level to the same value for compatibility
        student.setLevel(student.getYear());
        
        // Note: Department would need to be set based on department ID
        // For now, we'll leave it null

        try {
            Student savedStudent = studentRepository.save(student);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Student registered successfully");
            response.put("user", Map.of(
                "id", savedStudent.getStudent_id(),
                "firstName", savedStudent.getFirst_name(),
                "lastName", savedStudent.getLast_name(),
                "email", savedStudent.getEmail(),
                "userType", "student",
                "program", savedStudent.getProgram(),
                "level", savedStudent.getYear() // Use year value for level in response
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to save student: " + e.getMessage()));
        }
    }

    private ResponseEntity<?> handleLecturerSignup(Map<String, Object> signupRequest) {
        String email = (String) signupRequest.get("email");
        String firstName = (String) signupRequest.get("firstName");
        String lastName = (String) signupRequest.get("lastName");
        String password = (String) signupRequest.get("password");
        
        // Validate required fields
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is required"));
        }
        if (firstName == null || firstName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "First name is required"));
        }
        if (lastName == null || lastName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Last name is required"));
        }
        if (password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password is required"));
        }
        
        // Check if user already exists
        if (lecturerRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "User with this email already exists"));
        }

        Lecturer lecturer = new Lecturer();
        lecturer.setFirst_name(firstName.trim());
        lecturer.setLast_name(lastName.trim());
        lecturer.setEmail(email.trim());
        lecturer.setPassword(password);
        
        // Note: Department would need to be set based on department ID
        // For now, we'll leave it null

        try {
            Lecturer savedLecturer = lecturerRepository.save(lecturer);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Lecturer registered successfully");
            response.put("user", Map.of(
                "id", savedLecturer.getLecturer_id(),
                "firstName", savedLecturer.getFirst_name(),
                "lastName", savedLecturer.getLast_name(),
                "email", savedLecturer.getEmail(),
                "userType", "lecturer"
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to save lecturer: " + e.getMessage()));
        }
    }

    private ResponseEntity<?> handleTASignup(Map<String, Object> signupRequest) {
        // For now, we'll treat TAs as lecturers
        return handleLecturerSignup(signupRequest);
    }
} 