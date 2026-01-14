CREATE TABLE departments (
	department_id SERIAL PRIMARY KEY,
	department_name VARCHAR(100) NOT NULL
);

CREATE TABLE students (
	student_id INT PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	program VARCHAR(100),
	level INTEGER,
	department_id INTEGER REFERENCES departments(department_id)
);

CREATE TABLE lecturers (
    lecturer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department_id INTEGER REFERENCES departments(department_id)
);

CREATE TABLE courses (
    course_code VARCHAR(50) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    credit_hours INTEGER NOT NULL,
    semester VARCHAR(10),
    department_id INTEGER REFERENCES departments(department_id)
);

CREATE TABLE enrollments (
    student_id INTEGER REFERENCES students(student_id),
    course_code VARCHAR(50) REFERENCES courses(course_code),
    grade VARCHAR(2),
    PRIMARY KEY (student_id, course_code)
);

CREATE TABLE course_assignments (
    lecturer_id INTEGER REFERENCES lecturers(lecturer_id),
    course_code VARCHAR(50) REFERENCES courses(course_code),
    PRIMARY KEY (lecturer_id, course_code)
);

INSERT INTO departments (department_name) VALUES ('Computer Engineering');
INSERT INTO departments (department_name) VALUES ('Biomedical Engineering');
INSERT INTO departments (department_name) VALUES ('Materials Engineering');
INSERT INTO departments (department_name) VALUES ('Agricultural Engineering');
INSERT INTO departments (department_name) VALUES ('Food Processing Engineering');



INSERT INTO students (first_name, last_name, email, program, level, department_id)
VALUES ('Mark', 'Ekumah', 'mekumah@st.ug.edu.gh', 'Computer Engineering', 300, 1);
INSERT INTO students (first_name, last_name, email, program, level, department_id)
VALUES ('Ama', 'Mensah', 'amensah@st.ug.edu.gh', 'Biomedical Engineering', 200, 2);
INSERT INTO students (first_name, last_name, email, program, level, department_id)
VALUES ('Kwame', 'Boateng', 'kboateng@st.ug.edu.gh', 'Materials Engineering', 400, 3);
INSERT INTO students (first_name, last_name, email, program, level, department_id)
VALUES ('Esi', 'Osei', 'eosei@st.ug.edu.gh', 'Agricultural Engineering', 100, 4);
INSERT INTO students (first_name, last_name, email, program, level, department_id)
VALUES ('Kojo', 'Appiah', 'kappiah@st.ug.edu.gh', 'Computer Engineering', 200, 1);
INSERT INTO students (first_name, last_name, email, program, level, department_id)
VALUES ('Afia', 'Kumi', 'akumi@st.ug.edu.gh', 'Food Processing Engineering', 300, 5);
INSERT INTO students (first_name, last_name, email, program, level, department_id)
VALUES ('Yaw', 'Darko', 'ydarko@st.ug.edu.gh', 'Biomedical Engineering', 400, 2);
INSERT INTO students (first_name, last_name, email, program, level, department_id)
VALUES ('Nana', 'Asante', 'nasante@st.ug.edu.gh', 'Materials Engineering', 100, 3);
INSERT INTO students (first_name, last_name, email, program, level, department_id)
VALUES ('Adwoa', 'Owusu', 'aowusu@st.ug.edu.gh', 'Computer Engineering', 200, 1);
INSERT INTO students (first_name, last_name, email, program, level, department_id)
VALUES ('Kofi', 'Baah', 'kbaah@st.ug.edu.gh', 'Biomedical Engineering', 300, 2);


INSERT INTO lecturers (first_name, last_name, email, department_id)
VALUES ('John', 'Asiamah', 'jasiamah@ug.edu.gh', 1);
INSERT INTO lecturers (first_name, last_name, email, department_id)
VALUES ('Jane', 'Smith', 'jsmith@ug.edu.gh', 2);
INSERT INTO lecturers (first_name, last_name, email, department_id)
VALUES ('Michael', 'Owusu', 'mowusu@ug.edu.gh', 3);
INSERT INTO lecturers (first_name, last_name, email, department_id)
VALUES ('Linda', 'Ampofo', 'lampofo@ug.edu.gh', 1);
INSERT INTO lecturers (first_name, last_name, email, department_id)
VALUES ('Eric', 'Mensah', 'emensah@ug.edu.gh', 5);
INSERT INTO lecturers (first_name, last_name, email, department_id)
VALUES ('Grace', 'Tetteh', 'gtetteh@ug.edu.gh', 4);
INSERT INTO lecturers (first_name, last_name, email, department_id)
VALUES ('Samuel', 'Ntim', 'sntim@ug.edu.gh', 2);
INSERT INTO lecturers (first_name, last_name, email, department_id)
VALUES ('Ruth', 'Acheampong', 'racheampong@ug.edu.gh', 4);
INSERT INTO lecturers (first_name, last_name, email, department_id)
VALUES ('Daniel', 'Amankwah', 'damankwah@ug.edu.gh', 2);
INSERT INTO lecturers (first_name, last_name, email, department_id)
VALUES ('Nii', 'Longdon', 'nlongdon@ug.edu.gh', 1);



INSERT INTO courses (course_code, course_name, credit_hours, semester, department_id)
VALUES ('CPEN202', 'Computer Systems Design', 3, '2nd', 1);
INSERT INTO courses (course_code, course_name, credit_hours, semester, department_id)
VALUES ('CPEN203', 'Microprocessors', 3, '2nd', 1);
INSERT INTO courses (course_code, course_name, credit_hours, semester, department_id)
VALUES ('CPEN208', 'Intro to Software Engineering', 3, '1st', 1);
INSERT INTO courses (course_code, course_name, credit_hours, semester, department_id)
VALUES ('SENG206', 'Differential Equations', 3, '2nd', 2);
INSERT INTO courses (course_code, course_name, credit_hours, semester, department_id)
VALUES ('SENG202', 'Thermodynamics I', 3, '1st', 3);
INSERT INTO courses (course_code, course_name, credit_hours, semester, department_id)
VALUES ('MTEN201', 'Fluid Mechanics', 3, '2nd', 3);
INSERT INTO courses (course_code, course_name, credit_hours, semester, department_id)
VALUES ('MTEN201', 'Structural Analysis I', 3, '1st', 3);
INSERT INTO courses (course_code, course_name, credit_hours, semester, department_id)
VALUES ('BMEN101', 'Intro to Biomedical Engineering', 2, '1st', 2);
INSERT INTO courses (course_code, course_name, credit_hours, semester, department_id)
VALUES ('SENG101', 'Industrial Chemistry', 3, '1st', 3);
INSERT INTO courses (course_code, course_name, credit_hours, semester, department_id)
VALUES ('CPEN211', 'Database and System Mgmt', 3, '2nd', 1);


INSERT INTO enrollments (student_id, course_code, grade) VALUES (2000101, 'AREN101', 'C');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (2000102, 'CPEN101', 'F');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (2000103, 'MTEN101', 'B');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (2000104, 'BMEN101', 'A');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (2000105, 'CPEN201', 'A');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (2000106, 'CPEN202', 'A');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (2000107, 'MTEN201', 'D');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (2000108, 'FPEN201', 'A');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (2000109, 'BMEN101', 'B');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (2000123, 'CPEN203', 'B');


INSERT INTO course_assignments (lecturer_id, course_code) VALUES (4, 'MTEN201');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (5, 'SENG101');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (1, 'CPEN101');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (1, 'BMEN201');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (5, 'CPEN202');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (4, 'CPEN202');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (1, 'AREN101');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (3, 'CPEN203');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (6, 'FPEN101');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (2, 'BMEN101');