/*
  Warnings:

  - You are about to drop the `email` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "email" DROP CONSTRAINT "email_user_id_fkey";

-- DropForeignKey
ALTER TABLE "teacherClassroom" DROP CONSTRAINT "teacherClassroom_teacher_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "email" TEXT NOT NULL;

-- DropTable
DROP TABLE "email";

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "teacherClassroom" ADD CONSTRAINT "teacherClassroom_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;
