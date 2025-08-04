package com.school_system_g3.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "course_assignments")
@IdClass(CourseAssignmentId.class)
public class CourseAssignment {
    @Id
    @ManyToOne
    @JoinColumn(name = "lecturer_id")
    private Lecturer lecturer;

    @Id
    @ManyToOne
    @JoinColumn(name = "course_code")
    private Course course;

    public Lecturer getLecturer() { return lecturer; }
    public void setLecturer(Lecturer lecturer) { this.lecturer = lecturer; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
}