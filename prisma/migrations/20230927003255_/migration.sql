-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Resumes" (
    "resume_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "resume_title" VARCHAR(255) NOT NULL,
    "resume_description" TEXT,
    "full_name" VARCHAR(255) NOT NULL,
    "job_title" VARCHAR(255),
    "email" VARCHAR(255),
    "profile_description" TEXT,
    "phone_number" VARCHAR(20),
    "address" TEXT,
    "website_link" TEXT,
    "linkedin_link" TEXT,
    "github_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resumes_pkey" PRIMARY KEY ("resume_id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "project_id" SERIAL NOT NULL,
    "resume_id" INTEGER NOT NULL,
    "project_title" VARCHAR(255) NOT NULL,
    "project_subtitle" TEXT,
    "project_description" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "project_link" TEXT,
    "is_current" BOOLEAN,
    "last_modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "Educations" (
    "education_id" SERIAL NOT NULL,
    "resume_id" INTEGER NOT NULL,
    "school_name" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255),
    "country" VARCHAR(255),
    "degree" VARCHAR(255),
    "education_description" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "gpa" DOUBLE PRECISION,
    "is_current" BOOLEAN,
    "last_modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Educations_pkey" PRIMARY KEY ("education_id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "skill_id" SERIAL NOT NULL,
    "resume_id" INTEGER NOT NULL,
    "skill_name" VARCHAR(255) NOT NULL,
    "skill_description" TEXT,
    "last_modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("skill_id")
);

-- CreateTable
CREATE TABLE "WorkExperiences" (
    "experience_id" SERIAL NOT NULL,
    "resume_id" INTEGER NOT NULL,
    "job_title" VARCHAR(255) NOT NULL,
    "employer" VARCHAR(255),
    "city" VARCHAR(255),
    "country" VARCHAR(255),
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "is_current" BOOLEAN,
    "experience_description" TEXT,
    "last_modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkExperiences_pkey" PRIMARY KEY ("experience_id")
);

-- CreateTable
CREATE TABLE "Languages" (
    "language_id" SERIAL NOT NULL,
    "resume_id" INTEGER NOT NULL,
    "language_name" VARCHAR(255) NOT NULL,
    "language_level" VARCHAR(255),
    "last_modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("language_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Resumes" ADD CONSTRAINT "Resumes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resumes"("resume_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Educations" ADD CONSTRAINT "Educations_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resumes"("resume_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resumes"("resume_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperiences" ADD CONSTRAINT "WorkExperiences_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resumes"("resume_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Languages" ADD CONSTRAINT "Languages_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resumes"("resume_id") ON DELETE RESTRICT ON UPDATE CASCADE;
