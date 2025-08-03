package com.school_system_g3.backend.controller;

import com.school_system_g3.backend.model.Enrollment;
import com.school_system_g3.backend.model.EnrollmentId;
import com.school_system_g3.backend.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {
    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @GetMapping
    public List<Enrollment> getAll() {
        return enrollmentRepository.findAll();
    }

    @GetMapping("/{studentId}/{courseCode}")
    public ResponseEntity<Enrollment> getById(@PathVariable Long studentId, @PathVariable String courseCode) {
        return enrollmentRepository.findById(new EnrollmentId(studentId, courseCode))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Enrollment create(@RequestBody Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    @PutMapping("/{studentId}/{courseCode}")
    public ResponseEntity<Enrollment> update(@PathVariable Long studentId, @PathVariable String courseCode, @RequestBody Enrollment updated) {
        EnrollmentId id = new EnrollmentId(studentId, courseCode);
        return enrollmentRepository.findById(id).map(e -> {
            e.setGrade(updated.getGrade());
            enrollmentRepository.save(e);
            return ResponseEntity.ok(e);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{studentId}/{courseCode}")
    public ResponseEntity<Void> delete(@PathVariable Long studentId, @PathVariable String courseCode) {
        EnrollmentId id = new EnrollmentId(studentId, courseCode);
        if (enrollmentRepository.existsById(id)) {
            enrollmentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
