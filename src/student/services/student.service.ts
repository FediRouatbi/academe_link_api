import { Injectable } from '@nestjs/common';
import { User } from 'src/common/entities/user.entity';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateStudent } from '../dto/create-student.input';
import { RoleCodeEnum, RoleOnUserStatusEnum } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStudents() {
    return this.prismaService.student.findMany({
      include: {
        classroom: true,
        user: {
          select: {
            user_name: true,
            last_name: true,
            first_name: true,
            createdAt: true,
            updatedAt: true,
            user_id: true,
          },
        },
      },
    });
  }

  // async getClassromm(classroom_id: number) {
  //   return this.prismaService.classroom.findUnique({
  //     where: { classroom_id },
  //     include: {
  //       student: true,
  //       teacherClassroom: { select: { teacher: true } },
  //       subject: true,
  //     },
  //   });
  // }

  async createStudent(student: CreateStudent) {
    return this.prismaService.student.create({
      include: {
        user: {
          select: {
            user_name: true,
            last_name: true,
            first_name: true,
            createdAt: true,
            updatedAt: true,
            user_id: true,
          },
        },
      },
      data: {
        classroom: { connect: { classroom_id: 59 } },
        user: {
          create: {
            first_name: student?.first_name,
            last_name: student?.first_name,
            user_name: student?.user_name,
            email: { create: { email_value: student?.email } },
            roles_on_users: {
              create: [
                {
                  status: RoleOnUserStatusEnum.ACTIVE,
                  role: {
                    connect: {
                      role_code: RoleCodeEnum.STUDENT,
                    },
                  },
                },
              ],
            },
          },
        },
      },
    });
  }

  // async editClassromm(classroom_id: number, classroom_name: string) {
  //   return this.prismaService.classroom.update({
  //     where: { classroom_id },
  //     data: { classroom_name },
  //   });
  // }

  // async deleteClassromm(classroomId: number) {
  //   return this.prismaService.classroom.delete({
  //     where: { classroom_id: classroomId },
  //   });
  // }
}
