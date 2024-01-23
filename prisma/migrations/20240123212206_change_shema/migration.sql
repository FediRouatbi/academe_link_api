/*
  Warnings:

  - You are about to drop the `usersOnClassroom` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assignedBy` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_id` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "usersOnClassroom" DROP CONSTRAINT "usersOnClassroom_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "usersOnClassroom" DROP CONSTRAINT "usersOnClassroom_student_id_fkey";

-- DropForeignKey
ALTER TABLE "usersOnClassroom" DROP CONSTRAINT "usersOnClassroom_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "usersOnClassroom" DROP CONSTRAINT "usersOnClassroom_teacher_id_fkey";

-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "assignedBy" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "subject_id" INTEGER NOT NULL,
ADD COLUMN     "teacher_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "usersOnClassroom";

-- CreateTable
CREATE TABLE "_student" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_student_AB_unique" ON "_student"("A", "B");

-- CreateIndex
CREATE INDEX "_student_B_index" ON "_student"("B");

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_student" ADD CONSTRAINT "_student_A_fkey" FOREIGN KEY ("A") REFERENCES "Classroom"("classroom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_student" ADD CONSTRAINT "_student_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
