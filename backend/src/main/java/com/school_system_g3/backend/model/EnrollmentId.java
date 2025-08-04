package com.school_system_g3.backend.model;

import java.io.Serializable;
import java.util.Objects;

public class EnrollmentId implements Serializable {
    private Long student;
    private String course;

    public EnrollmentId() {}

    public EnrollmentId(Long student, String course) {
        this.student = student;
        this.course = course;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EnrollmentId that = (EnrollmentId) o;
        return Objects.equals(student, that.student) && Objects.equals(course, that.course);
    }

    @Override
    public int hashCode() {
        return Objects.hash(student, course);
    }
}