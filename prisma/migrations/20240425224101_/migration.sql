/*
  Warnings:

  - A unique constraint covering the columns `[subject_id,teacher_id,classroom_id]` on the table `course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "course_subject_id_teacher_id_classroom_id_key" ON "course"("subject_id", "teacher_id", "classroom_id");
