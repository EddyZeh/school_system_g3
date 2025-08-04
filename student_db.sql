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
    student_id INT REFERENCES students(student_id),
    course_code VARCHAR(50) REFERENCES courses(course_code),
    grade VARCHAR(2),
    PRIMARY KEY (student_id, course_code)
);

CREATE TABLE course_assignments (
    lecturer_id INTEGER REFERENCES lecturers(lecturer_id),
    course_code VARCHAR(50) REFERENCES courses(course_code),
    PRIMARY KEY (lecturer_id, course_code)
);

CREATE TABLE teaching_assistants (
	ta_id SERIAL PRIMARY KEY,
	ta_name VARCHAR(100),
	lecturer_id INTEGER REFERENCES lecturers(lecturer_id),
	course_code VARCHAR(50) REFERENCES courses(course_code)
);

CREATE TABLE student_fees (
    fee_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(student_id),
    semester VARCHAR(10),
    year INTEGER,
    amount_due DECIMAL(10,2) NOT NULL,
    amount_paid DECIMAL(10,2) NOT NULL,
    balance DECIMAL(10,2) GENERATED ALWAYS AS (amount_due - amount_paid) STORED
);


INSERT INTO departments (department_name) VALUES ('Computer Engineering');
INSERT INTO departments (department_name) VALUES ('Biomedical Engineering');
INSERT INTO departments (department_name) VALUES ('Materials Engineering');
INSERT INTO departments (department_name) VALUES ('Agricultural Engineering');
INSERT INTO departments (department_name) VALUES ('Food Processing Engineering');



INSERT INTO students (student_id, first_name, last_name, email, program, level, department_id)
VALUES (22163947, 'Mark', 'Ekumah', 'mekumah@st.ug.edu.gh', 'Computer Engineering', 300, 1);
INSERT INTO students (student_id, first_name, last_name, email, program, level, department_id)
VALUES (22024613, 'Ama', 'Mensah', 'amensah@st.ug.edu.gh', 'Materials Engineering', 200, 3);
INSERT INTO students (student_id, first_name, last_name, email, program, level, department_id)
VALUES (22132456, 'Kwame', 'Boateng', 'kboateng@st.ug.edu.gh', 'Materials Engineering', 400, 3);
INSERT INTO students (student_id, first_name, last_name, email, program, level, department_id)
VALUES (22231440, 'Esi', 'Osei', 'eosei@st.ug.edu.gh', 'Agricultural Engineering', 100, 4);
INSERT INTO students (student_id, first_name, last_name, email, program, level, department_id)
VALUES (11045678, 'Kojo', 'Appiah', 'kappiah@st.ug.edu.gh', 'Computer Engineering', 200, 1);
INSERT INTO students (student_id, first_name, last_name, email, program, level, department_id)
VALUES (23456789, 'Afia', 'Kumi', 'akumi@st.ug.edu.gh', 'Food Processing Engineering', 300, 5);
INSERT INTO students (student_id, first_name, last_name, email, program, level, department_id)
VALUES (22398750, 'Yaw', 'Darko', 'ydarko@st.ug.edu.gh', 'Biomedical Engineering', 400, 2);
INSERT INTO students (student_id, first_name, last_name, email, program, level, department_id)
VALUES (22034569, 'Nana', 'Asante', 'nasante@st.ug.edu.gh', 'Materials Engineering', 100, 3);
INSERT INTO students (student_id, first_name, last_name, email, program, level, department_id)
VALUES (11014582, 'Adwoa', 'Owusu', 'aowusu@st.ug.edu.gh', 'Computer Engineering', 200, 1);
INSERT INTO students (student_id, first_name, last_name, email, program, level, department_id)
VALUES (22223491, 'Kofi', 'Baah', 'kbaah@st.ug.edu.gh', 'Biomedical Engineering', 300, 2);


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
VALUES ('MTEN202', 'Structural Analysis I', 3, '1st', 3);
INSERT INTO courses (course_code, course_name, credit_hours, semester, department_id)
VALUES ('BMEN101', 'Intro to Biomedical Engineering', 2, '1st', 2);
INSERT INTO courses (course_code, course_name, credit_hours, semester, department_id)
VALUES ('SENG101', 'Industrial Chemistry', 3, '1st', 3);
INSERT INTO courses (course_code, course_name, credit_hours, semester, department_id)
VALUES ('CPEN211', 'Database and System Mgmt', 3, '2nd', 1);


INSERT INTO enrollments (student_id, course_code, grade) VALUES (22231440, 'MTEN202', 'C');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (22163947, 'CPEN203', 'A');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (22132456, 'SENG206', 'B');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (22398750, 'BMEN101', 'A');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (11045678, 'CPEN208', 'A');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (23456789, 'SENG202', 'A');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (22034569, 'MTEN201', 'D');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (22223491, 'BMEN101', 'F');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (22034569, 'MTEN202', 'B');
INSERT INTO enrollments (student_id, course_code, grade) VALUES (22163947, 'CPEN211', 'B');


INSERT INTO course_assignments (lecturer_id, course_code) VALUES (3, 'MTEN201');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (5, 'SENG101');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (1, 'CPEN211');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (2, 'BMEN101');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (5, 'CPEN203');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (1, 'CPEN202');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (1, 'SENG206');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (1, 'CPEN208');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (6, 'SENG101');
INSERT INTO course_assignments (lecturer_id, course_code) VALUES (3, 'MTEN202');


INSERT INTO teaching_assistants (ta_name, lecturer_id, course_code) 
VALUES 
	('Josephine Addo', 1, 'CPEN202'),
	('Kwesi Appiah', 3, 'MTEN201'),
	('Akosua Serwaa', 2, 'BMEN101'),
	('Yaw Agyeman', 5, 'SENG101'),
	('Linda Boateng', 6, 'SENG101'),
	('Michael Nartey', 4, 'CPEN208'),
	('Afia Bonsu', 10, 'CPEN211'),
	('Kojo Ofori', 7, 'SENG206'),
	('Esi Adjei', 8, 'SENG202'),
	('Kwaku Owusu', 9, 'MTEN202');


INSERT INTO student_fees (student_id, semester, year, amount_due, amount_paid)
VALUES (22163947, '1st', 2025, 2800.00, 2800.00);
INSERT INTO student_fees (student_id, semester, year, amount_due, amount_paid)
VALUES (22024613, '1st', 2025, 2900.00, 1000.00);
INSERT INTO student_fees (student_id, semester, year, amount_due, amount_paid)
VALUES (22132456, '2nd', 2025, 2700.00, 2700.00);
INSERT INTO student_fees (student_id, semester, year, amount_due, amount_paid)
VALUES (22231440, '2nd', 2025, 2600.00, 1500.00);
INSERT INTO student_fees (student_id, semester, year, amount_due, amount_paid)
VALUES (11045678, '1st', 2025, 3000.00, 3200.00);
INSERT INTO student_fees (student_id, semester, year, amount_due, amount_paid)
VALUES (23456789, '2nd', 2025, 2500.00, 2500.00);
INSERT INTO student_fees (student_id, semester, year, amount_due, amount_paid)
VALUES (22398750, '1st', 2025, 2800.00, 2000.00);
INSERT INTO student_fees (student_id, semester, year, amount_due, amount_paid)
VALUES (22034569, '2nd', 2025, 2700.00, 2700.00);
INSERT INTO student_fees (student_id, semester, year, amount_due, amount_paid)
VALUES (11014582, '1st', 2025, 2600.00, 1000.00);
INSERT INTO student_fees (student_id, semester, year, amount_due, amount_paid)
VALUES (22223491, '2nd', 2025, 2900.00, 2900.00);


SELECT * from departments;
SELECT * from students;
SELECT * from lecturers;
SELECT * from courses;
SELECT * from enrollments;
SELECT * from course_assignments;
SELECT * from teaching_assistants;
SELECT * from student_fees;