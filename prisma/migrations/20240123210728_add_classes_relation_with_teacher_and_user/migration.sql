-- CreateEnum
CREATE TYPE "RoleCodeEnum" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT');

-- CreateEnum
CREATE TYPE "RoleOnUserStatusEnum" AS ENUM ('ACTIVE', 'BLOCKED');

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "force_reset_password" BOOLEAN NOT NULL DEFAULT false,
    "two_factor_auth" BOOLEAN NOT NULL DEFAULT false,
    "password_hash" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "puat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "teacher_id" SERIAL NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "role" (
    "role_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role_code" "RoleCodeEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "roles_on_users" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "status" "RoleOnUserStatusEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_on_users_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "email" (
    "email_id" SERIAL NOT NULL,
    "email_value" TEXT NOT NULL,
    "is_validated" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_pkey" PRIMARY KEY ("email_id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "classroom_id" SERIAL NOT NULL,
    "subject_id" INTEGER,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("classroom_id")
);

-- CreateTable
CREATE TABLE "usersOnClassroom" (
    "classroom_id" INTEGER NOT NULL,
    "subject_id" INTEGER,
    "teacher_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "usersOnClassroom_pkey" PRIMARY KEY ("classroom_id","student_id","teacher_id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "subject_id" SERIAL NOT NULL,
    "subject_name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("subject_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_name_key" ON "user"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "role_role_code_key" ON "role"("role_code");

-- CreateIndex
CREATE UNIQUE INDEX "email_email_value_key" ON "email"("email_value");

-- CreateIndex
CREATE UNIQUE INDEX "email_user_id_key" ON "email"("user_id");

-- AddForeignKey
ALTER TABLE "roles_on_users" ADD CONSTRAINT "roles_on_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_on_users" ADD CONSTRAINT "roles_on_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email" ADD CONSTRAINT "email_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnClassroom" ADD CONSTRAINT "usersOnClassroom_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "Classroom"("classroom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnClassroom" ADD CONSTRAINT "usersOnClassroom_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnClassroom" ADD CONSTRAINT "usersOnClassroom_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnClassroom" ADD CONSTRAINT "usersOnClassroom_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
