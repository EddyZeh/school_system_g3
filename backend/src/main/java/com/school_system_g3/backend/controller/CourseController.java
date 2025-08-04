package com.school_system_g3.backend.controller;

import com.school_system_g3.backend.model.Course;
import com.school_system_g3.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public List<Course> getAll() {
        return courseRepository.findAll();
    }

    @GetMapping("/{code}")
    public ResponseEntity<Course> getByCode(@PathVariable String code) {
        return courseRepository.findById(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Course create(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    @PutMapping("/{code}")
    public ResponseEntity<Course> update(@PathVariable String code, @RequestBody Course updated) {
        return courseRepository.findById(code).map(c -> {
            c.setCourse_name(updated.getCourse_name());
            c.setCredit_hours(updated.getCredit_hours());
            c.setSemester(updated.getSemester());
            c.setDepartment(updated.getDepartment());
            courseRepository.save(c);
            return ResponseEntity.ok(c);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<Void> delete(@PathVariable String code) {
        if (courseRepository.existsById(code)) {
            courseRepository.deleteById(code);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}