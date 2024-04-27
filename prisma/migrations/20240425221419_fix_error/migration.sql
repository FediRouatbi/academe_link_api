-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_teacher_id_fkey";

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;
