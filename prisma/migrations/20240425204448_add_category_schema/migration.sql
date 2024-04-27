/*
  Warnings:

  - Added the required column `subject_category_id` to the `subject_name` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subject_name" ADD COLUMN     "subject_category_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "subject_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "subject_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subject_category_name_key" ON "subject_category"("name");

-- AddForeignKey
ALTER TABLE "subject_name" ADD CONSTRAINT "subject_name_subject_category_id_fkey" FOREIGN KEY ("subject_category_id") REFERENCES "subject_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
