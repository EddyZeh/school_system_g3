package com.school_system_g3.backend.repository;

import com.school_system_g3.backend.model.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LecturerRepository extends JpaRepository<Lecturer, Long> {
    Optional<Lecturer> findByEmail(String email);
}

