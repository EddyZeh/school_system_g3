package com.school_system_g3.backend.repository;

import com.school_system_g3.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, String> {}
