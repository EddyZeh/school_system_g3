package com.school_system_g3.backend.model;

import java.io.Serializable;
import java.util.Objects;

public class CourseAssignmentId implements Serializable {
    private Long lecturer;
    private String course;

    public CourseAssignmentId() {}

    public CourseAssignmentId(Long lecturer, String course) {
        this.lecturer = lecturer;
        this.course = course;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CourseAssignmentId that = (CourseAssignmentId) o;
        return Objects.equals(lecturer, that.lecturer) && Objects.equals(course, that.course);
    }

    @Override
    public int hashCode() {
        return Objects.hash(lecturer, course);
    }
}