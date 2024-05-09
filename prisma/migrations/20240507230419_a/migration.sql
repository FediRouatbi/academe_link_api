/*
  Warnings:

  - You are about to drop the column `subject_id` on the `topic` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "topic" DROP CONSTRAINT "topic_subject_id_fkey";

-- AlterTable
ALTER TABLE "topic" DROP COLUMN "subject_id",
ADD COLUMN     "course_id" INTEGER;

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
