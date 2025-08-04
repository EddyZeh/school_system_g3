package com.school_system_g3.backend.controller;

import com.school_system_g3.backend.model.Lecturer;
import com.school_system_g3.backend.repository.LecturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lecturers")
@CrossOrigin(origins = "http://localhost:3000")
public class LecturerController {
    @Autowired
    private LecturerRepository lecturerRepository;

    @GetMapping
    public List<Lecturer> getAllLecturers() {
        return lecturerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lecturer> getById(@PathVariable Long id) {
        return lecturerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Lecturer create(@RequestBody Lecturer lecturer) {
        return lecturerRepository.save(lecturer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lecturer> update(@PathVariable Long id, @RequestBody Lecturer updated) {
        return lecturerRepository.findById(id).map(l -> {
            l.setFirst_name(updated.getFirst_name());
            l.setLast_name(updated.getLast_name());
            l.setEmail(updated.getEmail());
            l.setDepartment(updated.getDepartment());
            lecturerRepository.save(l);
            return ResponseEntity.ok(l);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (lecturerRepository.existsById(id)) {
            lecturerRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
