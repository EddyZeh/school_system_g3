package com.school_system_g3.backend.repository;

import com.school_system_g3.backend.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {}
