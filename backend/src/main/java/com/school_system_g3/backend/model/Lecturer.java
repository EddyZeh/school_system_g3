package com.school_system_g3.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "lecturers")
public class Lecturer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lecturer_id;

    @Column(nullable = false)
    private String first_name;

    @Column(nullable = false)
    private String last_name;

    @Column(nullable = false, unique = true)
    private String email;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    public Long getLecturer_id() { return lecturer_id; }
    public void setLecturer_id(Long lecturer_id) { this.lecturer_id = lecturer_id; }
    public String getFirst_name() { return first_name; }
    public void setFirst_name(String first_name) { this.first_name = first_name; }
    public String getLast_name() { return last_name; }
    public void setLast_name(String last_name) { this.last_name = last_name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }
}