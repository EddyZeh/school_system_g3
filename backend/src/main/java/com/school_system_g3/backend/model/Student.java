package com.school_system_g3.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {
    @Id
    private Long student_id;

    @Column(nullable = false)
    private String first_name;

    @Column(nullable = false)
    private String last_name;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;
    
    private String program;
    private Integer level;
    private Integer year; // Added to match database schema

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    public Long getStudent_id() { return student_id; }
    public void setStudent_id(Long student_id) { this.student_id = student_id; }
    public String getFirst_name() { return first_name; }
    public void setFirst_name(String first_name) { this.first_name = first_name; }
    public String getLast_name() { return last_name; }
    public void setLast_name(String last_name) { this.last_name = last_name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }
    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }  
}