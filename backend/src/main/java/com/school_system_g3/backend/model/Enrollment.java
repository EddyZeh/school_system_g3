package com.school_system_g3.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "enrollments")
@IdClass(EnrollmentId.class)
public class Enrollment {
    @Id
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Id
    @ManyToOne
    @JoinColumn(name = "course_code")
    private Course course;

    private String grade;

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
}