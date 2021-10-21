
---DB Name: create_mpls

-- RUN THE FOLLOWING CLI COMMANDS FOR INSTALLATION
-- createdb create_mpls
-- psql -d create_mpls -f database.sql



-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE gender (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE grade (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    abbrev VARCHAR(255)
);

CREATE TABLE ethnicity (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    abbrev VARCHAR(255),
    code INT
);

CREATE TABLE "type" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    first_name VARCHAR (255),
    last_name VARCHAR (255),
    is_staff BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    updated_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE "program" (
	id SERIAL PRIMARY KEY,
	name VARCHAR (255),
	location VARCHAR (255),
    is_active BOOLEAN DEFAULT TRUE,
	type_id INT REFERENCES "type",
	updated_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
	created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE staff_program_assignment (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES "user",
	program_id INT REFERENCES "program",
    is_active BOOLEAN DEFAULT TRUE,
	updated_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE ( user_id, program_id )
);

CREATE TABLE program_occurrence (
	id SERIAL PRIMARY KEY,
	assignment_id INT REFERENCES staff_program_assignment,
	duration INT,
	at_date DATE,
	volunteers INT,
	updated_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
	created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE student (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR (255),
    last_name VARCHAR (255),
    gender_id INT REFERENCES gender,
    age INT,
    grade_id INT REFERENCES grade,
    ethnicity_id INT REFERENCES ethnicity,
    is_active BOOLEAN DEFAULT TRUE,
	updated_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
	created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE student_program_assignment (
	id SERIAL PRIMARY KEY,
	student_id INT REFERENCES student,
	program_id INT REFERENCES "program",
	updated_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
	created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE ( student_id, program_id )
);

CREATE TABLE settings (
	id SERIAL PRIMARY KEY,
	variable VARCHAR (255),
    value VARCHAR (255),
    updated_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
	created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE student_program_attendance (
	id SERIAL PRIMARY KEY,
	occurrence_id INT REFERENCES program_occurrence,
	student_id INT REFERENCES student,
	updated_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
	created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE ( student_id, occurrence_id )
);

INSERT INTO gender 
	( name ) 
VALUES
    ( 'Female' ),
    ( 'Male' );
    
INSERT INTO type 
	( name ) 
VALUES
    ( 'Classroom Program' ),
    ( 'Competitive Team' ),
    ( 'Learning Lab' );

INSERT INTO grade 
	( name, abbrev ) 
VALUES
	( 'Pre Kindergarten', 'PK' ),
    ( 'Kindergarten', 'K' ),
    ( '1st Grade', '1' ),
    ( '2nd Grade', '2' ),
    ( '3rd Grade', '3' ),
    ( '4th Grade', '4' ),
    ( '5th Grade', '5' ),
    ( '6th Grade', '6' ),
    ( '7th Grade', '7' ),
    ( '8th Grade', '8' ),
    ( '9th Grade', '9' ),
    ( '10th Grade', '10' ),
    ( '11th Grade', '11' ),
    ( '12th Grade', '12' );
    
INSERT INTO ethnicity
	( name, abbrev )
VALUES
	( 'Hispanic/Latino', '' ),
	( 'American Indian/Alaskan Native', '' ),
	( 'Asian', '' ),
	( 'African-American/Black', '' ),
	( 'Native Hawaiian/Other Pacific Islander', '' ),
	( 'Caucasian/White', '' ),
	( 'Two or more races', '');

INSERT INTO settings 
	( variable, value ) 
VALUES
    ( 'teacherCode', 'team-createMPLS-teacher' ),
    ( 'adminCode', 'team-createMPLS-admin' );
	