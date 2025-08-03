package com.school_system_g3.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @Column(name = "course_code")
    private String course_code;

    @Column(nullable = false)
    private String course_name;

    private Integer credit_hours;
    private String semester;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    public String getCourse_code() { return course_code; }
    public void setCourse_code(String course_code) { this.course_code = course_code; }
    public String getCourse_name() { return course_name; }
    public void setCourse_name(String course_name) { this.course_name = course_name; }
    public Integer getCredit_hours() { return credit_hours; }
    public void setCredit_hours(Integer credit_hours) { this.credit_hours = credit_hours; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }
}
