/*
  Warnings:

  - You are about to drop the column `certificates` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `certificatesInstitution` on the `Education` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "certificates",
DROP COLUMN "certificatesInstitution";

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
