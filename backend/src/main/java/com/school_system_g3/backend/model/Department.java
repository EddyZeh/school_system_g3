package com.school_system_g3.backend.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "departments")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long department_id;

    @Column(nullable = false)
    private String department_name;

    public Long getDepartment_id() { return department_id; }
    public void setDepartment_id(Long department_id) { this.department_id = department_id; }
    public String getDepartment_name() { return department_name; }
    public void setDepartment_name(String department_name) { this.department_name = department_name; }
}