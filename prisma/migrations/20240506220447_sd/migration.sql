/*
  Warnings:

  - Added the required column `description` to the `classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classroom" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "course" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "subject" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "teacher" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "topic" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
