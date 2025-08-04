package com.school_system_g3.backend.repository;

import com.school_system_g3.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {}
