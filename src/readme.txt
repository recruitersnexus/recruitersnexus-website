Use these queries for the following tables;

//HR 2 is for testing.. Don't create hr. it is just for reference.

hr2 table:
CREATE TABLE hr2 (
    id serial primary key,
    username varchar(255) unique not null,
    fname varchar(255),
    lname varchar(255),
    about varchar(255),
    service varchar(255),
    experience varchar(255),
    certif varchar(255),
    aoe varchar(255)
);

insert:
INSERT INTO hr2 (
    username,
    fname,
    lname,
    about,
    service,
    experience,
    certif,
    aoe
)VALUES ('taha123','Taha','Rizwan','I am programmer','jamStack Developer','WMD','Coding - Logical thinking');





// Project codes start here

NOTE: BEFORE using npm run migrations:push:pg 
PLEASE CHANGE THE DATATYPE OF slot in 3 tables, interview service & feedback from text to timestamp in drizzle schema
otherwise there will be api's issues. after using the command, change it back to text in drizzle schema.ts file.

THERE ARE TOTAL OF 9 TABLES AS PER NOW 
1. users2
2. hr
3. skills
4. service
5. interview
6. verify
7. qualification
8. experience
9. Feedback
    

SKILLS TABLE:
CREATE TABLE skills(sid serial primary key, skill varchar(255), user_id varchar(255) references users2(id));

INSERT INTO skills(skill,user_id)VALUES('react',1);



HR TABLE(FOR USER INFORMATION (NOTHING TO DO WITH ONLY HR, IT'S AN OVERALL DATA FOR ALL USERS)):


CREATE TABLE hr (
    id serial primary key,
    fname varchar(255),
    lname varchar(255),
    about varchar(255),
    user_id varchar(255) unique references users2(id));

CREATE TABLE hr (
    id serial primary key,
    fname varchar(255),
    lname varchar(255),
    about varchar(255),
    father_name varchar(255),
    dob varchar(255),
    gender varchar(255),
    martial_status varchar(255),
    nic varchar(255),
    nationality varchar(255),
    religion varchar(255),
    user_id varchar(255) unique references users2(id) ON DELETE CASCADE);


    INSERT INTO hr(fname,lname,about,user_id
    ) VALUES('Taha','Rizwan','Computer Scientist','5a07d962-ec9c-4200-a9e4-2958349ef96e');

INSERT INTO hr(fname,lname,about,father_name,dob,gender,martial_status,nic,nationality,religion,user_id
) VALUES('Azad','NFT','','','','','','','','','85289dc2-ddf6-4b38-8835-8bea9472a958');



USERS TABLE (MAIN TABLE)

CREATE TABLE IF NOT EXISTS "users2" (
	"id" varchar(50) NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar(256),
	"image" varchar,
	"role" varchar(256),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_id" UNIQUE("id")
);


#ALTER TABLE users2
#ADD CONSTRAINT unique_user_id UNIQUE (id);

OR

CREATE TABLE IF NOT EXISTS "users2" (
	"id" varchar(50) UNIQUE NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar(256),
	"image" varchar,
	"role" varchar(256),
	"created_at" timestamp DEFAULT now()
);


SERVICE TABLE:
CREATE TABLE IF NOT EXISTS service (
	id serial PRIMARY KEY,
	service varchar(255) NOT NULL,
	slot varchar(255) NOT NULL,
    user_id varchar(255) references users2(id) ON DELETE CASCADE,
    category varchar(255)
);

INSERT INTO service (service, slot, user_id)
VALUES ('YourServiceName', '2024-01-31 12:30:00+00:00', '5a07d962-ec9c-4200-a9e4-2958349ef96e');


INTERVIEW TABLE:

CREATE TABLE interview(id varchar(255) primary key, slot varchar(255) NOT NULL, is_conducted varchar(255) DEFAULT 'notConducted', is_confirmed varchar(255) DEFAULT 'unConfirmed', hr_id varchar(255) references users2(id) ON DELETE CASCADE, user_id varchar(255) references users2(id) ON DELETE CASCADE);


INSERT INTO interview(slot,hr_id,user_id) VALUES('2024-01-31 12:30:00+00:00','5a07d962-ec9c-4200-a9e4-2958349ef96e','b003c4e4-1149-479f-a6a1-2ee701804f2d');
INSERT INTO interview(slot,hr_id,user_id) VALUES('2024-01-31 12:30:00+00:00','5a07d962-ec9c-4200-a9e4-2958349ef96e','95c5bbc4-b388-484d-aa25-7e2110215f58');




VERIFY TABLE:

CREATE TABLE verify(id serial primary key, forgot_pass varchar(255) NOT NULL, reg_code varchar(255), verified varchar(255) DEFAULT'unverified', user_id varchar(255) unique references users2(id) ON DELETE CASCADE );

INSERT INTO verify(forgot_pass,reg_code,user_id) VALUES('601233','124522','85289dc2-ddf6-4b38-8835-8bea9472a958');

UPDATE verify SET verified = 'unverified' WHERE user_id = 'bc6b1bf3-1f32-4bba-8ae1-78222eeb0d3c';


QUALIFICATIONS TABLE:
CREATE TABLE qualification(id serial primary key, degree varchar(255) NOT NULL,speciallization varchar(255),cgpa varchar(255),passing_year varchar(255),institute varchar(255),user_id varchar(255) references users2(id));

EXPERIENCE TABLE:
CREATE TABLE experience(id serial primary key, designation varchar(255) NOT NULL, from_date varchar(255),to_date varchar(255),aoe varchar(255),organization varchar(255),user_id varchar(255) references users2(id));



Feedback Table:
CREATE TABLE feedback(id serial primary key, rating_one decimal, rating_two decimal, rating_three decimal, rating_four decimal, rating_five decimal ,total_rating decimal,user_rating decimal,user_feedback varchar(255) ,candidate_name varchar(255), strength varchar(255), weakness varchar(255), description varchar(255) ,slot varchar(255) unique, hr_id varchar(255) references users2(id) ON DELETE CASCADE, user_id varchar(255) references users2(id) ON DELETE CASCADE);

INSERT INTO feedback(rating_one,rating_two,rating_three,rating_four,rating_five,total_rating,user_feedback,candidate_name,strength, weakness, description,slot,hr_id,user_id)VALUES(1.3,2.5,3.5,6.2,1.6,7.3,'','harry','yes','','','2024-02-09 00:30:00+00:00','d48a3407-9626-4c54-800d-f08f885b7e9e','80a5ee28-3435-4497-bc89-1770451d0a54');

Example QUERY:
CREATE TABLE example(id serial primary key, user_id varchar(255) references users2(id) ON DELETE CASCADE );
INSERT INTO users2(id,username,email,password,image,role,created_at)VALUES('85289dc2-ddf6-4b38-8835-8bea9472a900','','','','','','1/2/3');
INSERT INTO example(user_id)VALUES('85289dc2-ddf6-4b38-8835-8bea9472a900');

Report table:
CREATE TABLE report(id serial primary key, reason varchar(255), user_id varchar(255) references users2(id) ON DELETE CASCADE);

Job posting Table:
CREATE TABLE job(id serial primary key, title varchar(255), salary_start decimal, salary_end decimal, description varchar(255), is_approved varchar(255) DEFAULT 'unapproved', feature varchar(255) DEFAULT 'none', created_at timestamp DEFAULT now() ,user_id varchar(255) references users2(id) ON DELETE CASCADE);

Job skills Table:
CREATE TABLE job_skill(sid serial primary key, skill varchar(255), user_id bigint references job(id));

INSERT INTO job_skill(skill,user_id)VALUES('react',1);
