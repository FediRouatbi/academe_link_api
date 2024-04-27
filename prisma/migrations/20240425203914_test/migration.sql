/*
  Warnings:

  - You are about to drop the column `subject_name` on the `subject` table. All the data in the column will be lost.
  - Added the required column `subject_name_id` to the `subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subject" DROP COLUMN "subject_name",
ADD COLUMN     "subject_name_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "subject_name" (
    "subject_name_id" SERIAL NOT NULL,
    "subject_name" TEXT NOT NULL,

    CONSTRAINT "subject_name_pkey" PRIMARY KEY ("subject_name_id")
);

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_subject_name_id_fkey" FOREIGN KEY ("subject_name_id") REFERENCES "subject_name"("subject_name_id") ON DELETE RESTRICT ON UPDATE CASCADE;
