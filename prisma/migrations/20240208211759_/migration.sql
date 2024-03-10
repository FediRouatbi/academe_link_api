/*
  Warnings:

  - A unique constraint covering the columns `[classroom_name]` on the table `classroom` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_classroom_id_fkey";

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "classroom_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "classroom_classroom_name_key" ON "classroom"("classroom_name");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("classroom_id") ON DELETE SET NULL ON UPDATE CASCADE;
