/*
  Warnings:

  - You are about to drop the column `subject_id` on the `Classroom` table. All the data in the column will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `classroom_name` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `email` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subject_id` on table `usersOnClassroom` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "subject_id",
ADD COLUMN     "classroom_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "email" ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "usersOnClassroom" ALTER COLUMN "subject_id" SET NOT NULL;

-- DropTable
DROP TABLE "Teacher";
