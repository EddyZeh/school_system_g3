package com.school_system_g3.backend.controller;

import com.school_system_g3.backend.model.CourseAssignment;
import com.school_system_g3.backend.model.CourseAssignmentId;
import com.school_system_g3.backend.repository.CourseAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course-assignments")
public class CourseAssignmentController {
    @Autowired
    private CourseAssignmentRepository courseAssignmentRepository;

    @GetMapping
    public List<CourseAssignment> getAll() {
        return courseAssignmentRepository.findAll();
    }

    @GetMapping("/{lecturerId}/{courseCode}")
    public ResponseEntity<CourseAssignment> getById(@PathVariable Long lecturerId, @PathVariable String courseCode) {
        return courseAssignmentRepository.findById(new CourseAssignmentId(lecturerId, courseCode))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CourseAssignment create(@RequestBody CourseAssignment ca) {
        return courseAssignmentRepository.save(ca);
    }

    @PutMapping("/{lecturerId}/{courseCode}")
    public ResponseEntity<CourseAssignment> update(@PathVariable Long lecturerId, @PathVariable String courseCode, @RequestBody CourseAssignment updated) {
        CourseAssignmentId id = new CourseAssignmentId(lecturerId, courseCode);
        return courseAssignmentRepository.findById(id).map(e -> {
            courseAssignmentRepository.save(updated);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{lecturerId}/{courseCode}")
    public ResponseEntity<Void> delete(@PathVariable Long lecturerId, @PathVariable String courseCode) {
        CourseAssignmentId id = new CourseAssignmentId(lecturerId, courseCode);
        if (courseAssignmentRepository.existsById(id)) {
            courseAssignmentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
