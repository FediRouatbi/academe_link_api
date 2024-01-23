/*
  Warnings:

  - You are about to drop the `Classroom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "_student" DROP CONSTRAINT "_student_A_fkey";

-- DropForeignKey
ALTER TABLE "_student" DROP CONSTRAINT "_student_B_fkey";

-- DropTable
DROP TABLE "Classroom";

-- DropTable
DROP TABLE "Subject";

-- DropTable
DROP TABLE "_student";

-- CreateTable
CREATE TABLE "classroom" (
    "classroom_id" SERIAL NOT NULL,
    "classroom_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "classroom_pkey" PRIMARY KEY ("classroom_id")
);

-- CreateTable
CREATE TABLE "subject" (
    "subject_id" SERIAL NOT NULL,
    "subject_name" TEXT NOT NULL,
    "teacher_id" INTEGER NOT NULL,

    CONSTRAINT "subject_pkey" PRIMARY KEY ("subject_id")
);

-- CreateTable
CREATE TABLE "_classroomTosubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_classroomTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_classroomTosubject_AB_unique" ON "_classroomTosubject"("A", "B");

-- CreateIndex
CREATE INDEX "_classroomTosubject_B_index" ON "_classroomTosubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_classroomTouser_AB_unique" ON "_classroomTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_classroomTouser_B_index" ON "_classroomTouser"("B");

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classroomTosubject" ADD CONSTRAINT "_classroomTosubject_A_fkey" FOREIGN KEY ("A") REFERENCES "classroom"("classroom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classroomTosubject" ADD CONSTRAINT "_classroomTosubject_B_fkey" FOREIGN KEY ("B") REFERENCES "subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classroomTouser" ADD CONSTRAINT "_classroomTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "classroom"("classroom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classroomTouser" ADD CONSTRAINT "_classroomTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
