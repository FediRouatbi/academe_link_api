/*
  Warnings:

  - You are about to drop the `_classroomToteacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_classroomToteacher" DROP CONSTRAINT "_classroomToteacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_classroomToteacher" DROP CONSTRAINT "_classroomToteacher_B_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_classroom_id_fkey";

-- DropTable
DROP TABLE "_classroomToteacher";

-- CreateTable
CREATE TABLE "teacherClassroom" (
    "classroom_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,

    CONSTRAINT "teacherClassroom_pkey" PRIMARY KEY ("classroom_id","teacher_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teacherClassroom_classroom_id_key" ON "teacherClassroom"("classroom_id");

-- CreateIndex
CREATE UNIQUE INDEX "teacherClassroom_teacher_id_key" ON "teacherClassroom"("teacher_id");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("classroom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacherClassroom" ADD CONSTRAINT "teacherClassroom_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("classroom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacherClassroom" ADD CONSTRAINT "teacherClassroom_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;
