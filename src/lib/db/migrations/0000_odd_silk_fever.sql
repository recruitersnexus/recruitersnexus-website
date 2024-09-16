CREATE TABLE IF NOT EXISTS "experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"designation" text NOT NULL,
	"from_date" text,
	"to_date" text,
	"aoe" text,
	"organization" text,
	"user_id" text
);

CREATE TABLE IF NOT EXISTS "hr" (
	"id" serial PRIMARY KEY NOT NULL,
	"fname" text,
	"lname" text,
	"about" text,
	"father_name" text,
	"dob" text,
	"gender" text,
	"martial_status" text,
	"nic" text,
	"nationality" text,
	"religion" text,
	"user_id" text,
	CONSTRAINT "hr_user_id_unique" UNIQUE("user_id")
);

CREATE TABLE IF NOT EXISTS "interview" (
	"id" serial PRIMARY KEY NOT NULL,
	"slot" timestamp NOT NULL,
	"is_conducted" varchar DEFAULT 'notConducted',
	"is_confirmed" varchar DEFAULT 'unConfirmed',
	"hr_id" text,
	"user_id" text
);

CREATE TABLE IF NOT EXISTS "qualification" (
	"id" serial PRIMARY KEY NOT NULL,
	"degree" text NOT NULL,
	"speciallization" text,
	"cgpa" text,
	"passing_year" text,
	"institute" text,
	"user_id" text
);

CREATE TABLE IF NOT EXISTS "service" (
	"id" serial PRIMARY KEY NOT NULL,
	"service" varchar NOT NULL,
	"slot" timestamp NOT NULL,
	"user_id" text
);

CREATE TABLE IF NOT EXISTS "skills" (
	"sid" serial NOT NULL,
	"skill" text,
	"user_id" text
);

CREATE TABLE IF NOT EXISTS "users2" (
	"id" varchar(50) NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar(256),
	"image" varchar,
	"role" varchar(256),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users2_id_unique" UNIQUE("id")
);

CREATE TABLE IF NOT EXISTS "verify" (
	"id" serial PRIMARY KEY NOT NULL,
	"forgot_pass" varchar NOT NULL,
	"reg_code" text,
	"verified" varchar DEFAULT 'unverified',
	"user_id" text,
	CONSTRAINT "verify_user_id_unique" UNIQUE("user_id")
);

DO $$ BEGIN
 ALTER TABLE "experience" ADD CONSTRAINT "experience_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "hr" ADD CONSTRAINT "hr_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "interview" ADD CONSTRAINT "interview_hr_id_users2_id_fk" FOREIGN KEY ("hr_id") REFERENCES "users2"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "interview" ADD CONSTRAINT "interview_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "qualification" ADD CONSTRAINT "qualification_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "service" ADD CONSTRAINT "service_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "skills" ADD CONSTRAINT "skills_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "verify" ADD CONSTRAINT "verify_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
