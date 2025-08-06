/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SoftSkillsCategory" AS ENUM ('COMMUNICATION', 'COLLABORATION', 'LEADERSHIP', 'ADAPTABILITY', 'PROBLEM_SOLVING', 'TIME_MANAGEMENT');

-- CreateEnum
CREATE TYPE "Industries" AS ENUM ('RETAIL', 'BANKING', 'INSURANCE', 'EDUCATION', 'MINING', 'MECS');

-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeSoftSkill" DROP CONSTRAINT "EmployeeSoftSkill_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeSoftSkill" DROP CONSTRAINT "EmployeeSoftSkill_softSkillId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeTechStack" DROP CONSTRAINT "EmployeeTechStack_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeTechStack" DROP CONSTRAINT "EmployeeTechStack_techStackId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTechStack" DROP CONSTRAINT "ProjectTechStack_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTechStack" DROP CONSTRAINT "ProjectTechStack_techStackId_fkey";

-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_employeeId_fkey";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "experience" TEXT;

-- AlterTable
ALTER TABLE "EmployeeSoftSkill" ADD COLUMN     "skillsRating" TEXT;

-- AlterTable
ALTER TABLE "EmployeeTechStack" ADD COLUMN     "Techrating" TEXT;

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "clients" TEXT;

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "certificates" TEXT,
    "certificatesInstitution" TEXT,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "duration" TEXT,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Education_employeeId_key" ON "Education"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Career_employeeId_key" ON "Career"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeTechStack" ADD CONSTRAINT "EmployeeTechStack_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeTechStack" ADD CONSTRAINT "EmployeeTechStack_techStackId_fkey" FOREIGN KEY ("techStackId") REFERENCES "TechStack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSoftSkill" ADD CONSTRAINT "EmployeeSoftSkill_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSoftSkill" ADD CONSTRAINT "EmployeeSoftSkill_softSkillId_fkey" FOREIGN KEY ("softSkillId") REFERENCES "SoftSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTechStack" ADD CONSTRAINT "ProjectTechStack_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTechStack" ADD CONSTRAINT "ProjectTechStack_techStackId_fkey" FOREIGN KEY ("techStackId") REFERENCES "TechStack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
