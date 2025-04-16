CREATE TABLE IF NOT EXISTS "job_skill" (
	"sid" serial NOT NULL,
	"skill" text,
	"user_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"rating_one" numeric,
	"rating_two" numeric,
	"rating_three" numeric,
	"rating_four" numeric,
	"rating_five" numeric,
	"total_rating" numeric,
	"user_rating" numeric,
	"user_feedback" text,
	"candidate_name" text,
	"strength" text,
	"weakness" text,
	"description" text,
	"slot" text NOT NULL,
	"hr_id" text,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"salary_start" text,
	"expiration_date" text,
	"description" text,
	"is_approved" text DEFAULT 'unapproved',
	"feature" text DEFAULT 'none',
	"created_at" timestamp DEFAULT now(),
	"user_id" text,
	"image" text,
	"organization" text,
	"location" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "report" (
	"id" serial PRIMARY KEY NOT NULL,
	"reason" text,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plan" text NOT NULL,
	"txn_ref_no" text NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'PKR',
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"changed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plan" text NOT NULL,
	"txn_ref_no" text NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'PKR',
	"status" text DEFAULT 'PENDING',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "transactions_txn_ref_no_unique" UNIQUE("txn_ref_no")
);
--> statement-breakpoint
ALTER TABLE "experience" DROP CONSTRAINT "experience_user_id_users2_id_fk";
--> statement-breakpoint
ALTER TABLE "interview" DROP CONSTRAINT "interview_hr_id_users2_id_fk";
--> statement-breakpoint
ALTER TABLE "qualification" DROP CONSTRAINT "qualification_user_id_users2_id_fk";
--> statement-breakpoint
ALTER TABLE "service" DROP CONSTRAINT "service_user_id_users2_id_fk";
--> statement-breakpoint
ALTER TABLE "skills" DROP CONSTRAINT "skills_user_id_users2_id_fk";
--> statement-breakpoint
ALTER TABLE "interview" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "interview" ALTER COLUMN "slot" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "slot" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "experience" ADD COLUMN "total_experience" text;--> statement-breakpoint
ALTER TABLE "experience" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "experience" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "hr" ADD COLUMN "is_approve" text DEFAULT 'unapproved';--> statement-breakpoint
ALTER TABLE "hr" ADD COLUMN "calculate_experience" text DEFAULT '0 years, 0 months';--> statement-breakpoint
ALTER TABLE "hr" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "hr" ADD COLUMN "designation" text;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "category" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "experience" ADD CONSTRAINT "experience_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interview" ADD CONSTRAINT "interview_hr_id_users2_id_fk" FOREIGN KEY ("hr_id") REFERENCES "users2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qualification" ADD CONSTRAINT "qualification_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service" ADD CONSTRAINT "service_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills" ADD CONSTRAINT "skills_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_skill" ADD CONSTRAINT "job_skill_user_id_job_id_fk" FOREIGN KEY ("user_id") REFERENCES "job"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feedback" ADD CONSTRAINT "feedback_hr_id_users2_id_fk" FOREIGN KEY ("hr_id") REFERENCES "users2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feedback" ADD CONSTRAINT "feedback_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job" ADD CONSTRAINT "job_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_user_id_users2_id_fk" FOREIGN KEY ("user_id") REFERENCES "users2"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction_history" ADD CONSTRAINT "transaction_history_txn_ref_no_transactions_txn_ref_no_fk" FOREIGN KEY ("txn_ref_no") REFERENCES "transactions"("txn_ref_no") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
