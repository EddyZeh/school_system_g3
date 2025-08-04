package com.school_system_g3.backend.repository;

import com.school_system_g3.backend.model.CourseAssignment;
import com.school_system_g3.backend.model.CourseAssignmentId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment, CourseAssignmentId> {}

