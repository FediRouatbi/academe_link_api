-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_teacher_id_fkey";

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("classroom_id") ON DELETE CASCADE ON UPDATE CASCADE;
