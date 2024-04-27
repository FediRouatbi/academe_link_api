/*
  Warnings:

  - The primary key for the `subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classroom_id` on the `subject` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `subject` table. All the data in the column will be lost.
  - You are about to drop the column `subject_name_id` on the `subject` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `subject` table. All the data in the column will be lost.
  - You are about to drop the `subject_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subject_name` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subject" DROP CONSTRAINT "subject_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "subject" DROP CONSTRAINT "subject_subject_name_id_fkey";

-- DropForeignKey
ALTER TABLE "subject" DROP CONSTRAINT "subject_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "subject_name" DROP CONSTRAINT "subject_name_subject_category_id_fkey";

-- DropForeignKey
ALTER TABLE "topic" DROP CONSTRAINT "topic_subject_id_fkey";

-- AlterTable
ALTER TABLE "subject" DROP CONSTRAINT "subject_pkey",
DROP COLUMN "classroom_id",
DROP COLUMN "subject_id",
DROP COLUMN "subject_name_id",
DROP COLUMN "teacher_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "subject_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "subject_category";

-- DropTable
DROP TABLE "subject_name";

-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "classroom_id" INTEGER NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("classroom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
