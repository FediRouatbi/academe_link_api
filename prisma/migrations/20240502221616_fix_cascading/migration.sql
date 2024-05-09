-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "topic" DROP CONSTRAINT "topic_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "topic" DROP CONSTRAINT "topic_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "topic" DROP CONSTRAINT "topic_user_id_fkey";

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("classroom_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("classroom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("classroom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
