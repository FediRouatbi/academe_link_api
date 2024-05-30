import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateStudent } from '../dto/create-student.input';
import { Prisma, RoleCodeEnum, RoleOnUserStatusEnum } from '@prisma/client';
import { UpdateStudent } from '../dto/update-student.input';
import { BcryptService } from 'src/common/services/bcrypt.service';

@Injectable()
export class StudentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  async getStudents(hasClassroom: boolean, search?: string) {
    const where: Prisma.studentWhereInput = {
      ...(hasClassroom === false && { classroom: { is: null } }),
    };
    const searchParams = {
      user: {
        OR: [
          {
            email: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            user_name: { contains: search, mode: Prisma.QueryMode.insensitive },
          },
        ],
      },
    };

    return this.prismaService.student.findMany({
      where: { ...where, ...searchParams },
      include: {
        classroom: true,
        user: true,
      },
    });
  }
  async getStudent(student_id: number) {
    return this.findOne(student_id);
  }

  async createStudent(student: CreateStudent) {
    return this.prismaService.student.create({
      include: {
        classroom: true,
        user: true,
      },
      data: {
        classroom: student.classroom_id && {
          connect: { classroom_id: student.classroom_id },
        },
        user: {
          create: {
            first_name: student?.first_name,
            last_name: student?.first_name,
            user_name: student?.user_name,
            email: student?.email,
            password_hash: await this.bcryptService.hash(student?.password),
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

  async editStudent(student: UpdateStudent) {
    await this.findOne(student?.student_id);
    const classroomId = student?.classroom_id
      ? {
          classroom: {
            connect: { classroom_id: student?.classroom_id },
          },
        }
      : {
          classroom: {
            delete: true,
          },
        };

    return this.prismaService.student.update({
      where: { student_id: student?.student_id },
      data: {
        ...classroomId,
        user: {
          update: {
            first_name: student?.first_name,
            last_name: student?.last_name,
            user_name: student?.user_name,
            email: student?.email,
          },
        },
      },

      select: {
        classroom: true,
        user: true,
        student_id: true,
      },
    });
  }

  async findOne(student_id: number) {
    const existingClassroom = await this.prismaService.student.findUnique({
      where: { student_id },
      include: { user: true, classroom: true },
    });

    if (!existingClassroom) {
      throw new NotFoundException('Student not found');
    }

    return existingClassroom;
  }

  async deleteStudent(student_id: number) {
    const query = await this.prismaService.user.findFirst({
      where: { student: { student_id } },
      select: { user_id: true },
    });

    if (!query) throw new NotFoundException('Student not found');

    return this.prismaService.user.delete({
      where: { user_id: query.user_id },
      select: { student: true },
    });
  }
}
