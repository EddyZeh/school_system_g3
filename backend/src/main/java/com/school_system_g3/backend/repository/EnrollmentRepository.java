package com.school_system_g3.backend.repository;

import com.school_system_g3.backend.model.Enrollment;
import com.school_system_g3.backend.model.EnrollmentId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentId> {}

