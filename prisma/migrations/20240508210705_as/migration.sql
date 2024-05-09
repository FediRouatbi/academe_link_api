/*
  Warnings:

  - You are about to drop the column `classroom_id` on the `topic` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "topic" DROP CONSTRAINT "topic_classroom_id_fkey";

-- AlterTable
ALTER TABLE "topic" DROP COLUMN "classroom_id";
