-- DropForeignKey
ALTER TABLE "topic" DROP CONSTRAINT "topic_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "topic" DROP CONSTRAINT "topic_subject_id_fkey";

-- AlterTable
ALTER TABLE "topic" ALTER COLUMN "classroom_id" DROP NOT NULL,
ALTER COLUMN "subject_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("classroom_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subject"("subject_id") ON DELETE SET NULL ON UPDATE CASCADE;
