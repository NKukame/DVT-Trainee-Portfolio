-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.
 
 
ALTER TYPE "public"."EmployeeRole" ADD VALUE 'FULLSTACK_DEVELOPER';
ALTER TYPE "public"."EmployeeRole" ADD VALUE 'FRONTEND_DEVELOPER';
ALTER TYPE "public"."EmployeeRole" ADD VALUE 'BACKEND_DEVELOPER';
ALTER TYPE "public"."EmployeeRole" ADD VALUE 'UX_UI_DESIGNER';
ALTER TYPE "public"."EmployeeRole" ADD VALUE 'JUNIOR_DEVELOPER';
ALTER TYPE "public"."EmployeeRole" ADD VALUE 'TESTER';
ALTER TYPE "public"."EmployeeRole" ADD VALUE 'PRODUCT_OWNER';
ALTER TYPE "public"."EmployeeRole" ADD VALUE 'SCRUM_MASTER';
ALTER TYPE "public"."EmployeeRole" ADD VALUE 'DELIVERY_MANAGER';
 
 