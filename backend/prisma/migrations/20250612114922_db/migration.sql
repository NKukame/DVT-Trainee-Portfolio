/*
  Warnings:

  - The `role` column on the `ProjectMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `name` on the `Testimonial` table. All the data in the column will be lost.
  - Changed the type of `title` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `company` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserTitle" AS ENUM ('MR', 'MRS', 'MS', 'DR');

-- AlterEnum
ALTER TYPE "TechCategory" ADD VALUE 'MOBILE';

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "title",
ADD COLUMN     "title" "UserTitle" NOT NULL;

-- AlterTable
ALTER TABLE "ProjectMember" DROP COLUMN "role",
ADD COLUMN     "role" "EmployeeRole";

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "name",
ADD COLUMN     "company" TEXT NOT NULL;
