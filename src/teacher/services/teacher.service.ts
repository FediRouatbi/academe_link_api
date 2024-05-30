import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { RoleCodeEnum, RoleOnUserStatusEnum } from '@prisma/client';
import { Teacher } from '../entities/get-teacher.entity';
import { BcryptService } from 'src/common/services/bcrypt.service';
import { CreateTeacher } from '../dto/create-teacher.input';
import { UpdateTeacher } from '../dto/update-teacher.input';

@Injectable()
export class TeacherService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}
  async getTeachers(search?: string) {
    return this.prismaService.teacher.findMany({
      where: {
        user: {
          OR: [
            {
              email: {
                contains: search,
                mode: 'insensitive',
              },
            },
            { user_name: { contains: search, mode: 'insensitive' } },
          ],
        },
      },
      include: {
        user: true,
        course: true,
      },
    });
  }

  async getTeacher(student_id: number) {
    return this.findOne(student_id);
  }

  async createTeacher(teacher: CreateTeacher): Promise<Teacher> {
    await this?.isTeachernameExists(teacher?.user_name, teacher?.email);

    //3.5s estimated time to hash
    const password_hash = await this.bcryptService.hash(teacher.password);

    return this.prismaService.teacher.create({
      data: {
        user: {
          create: {
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            user_name: teacher.user_name,
            email: teacher?.email,
            password_hash: password_hash,
            roles_on_users: {
              create: {
                status: RoleOnUserStatusEnum.ACTIVE,
                role: {
                  connect: {
                    role_code: RoleCodeEnum.TEACHER,
                  },
                },
              },
            },
          },
        },
        course: { createMany: { data: teacher?.classrooms || [] } },
      },
      select: {
        user: true,
        user_id: true,
        teacher_id: true,
        course: { select: { classroom_id: true, subject_id: true } },
      },
    });
  }

  async editTeacher(teacher: UpdateTeacher): Promise<Teacher> {
    await this?.isTeachernameExists(
      teacher?.user_name,
      teacher?.email,
      teacher?.teacher_id,
    );

    return this.prismaService.teacher.update({
      where: { teacher_id: teacher?.teacher_id },

      data: {
        course: {
          deleteMany: {},
          createMany: { data: teacher?.classrooms || [] },
        },
        user: {
          update: {
            first_name: teacher?.first_name,
            last_name: teacher?.last_name,
            user_name: teacher?.user_name,
            email: teacher?.email,
          },
        },
      },
      select: {
        user: true,
        user_id: true,
        teacher_id: true,
        course: { select: { classroom_id: true, subject_id: true } },
      },
    });
  }

  async isTeachernameExists(
    user_name: string,
    email: string,
    id?: number,
  ): Promise<boolean> {
    if (id) await this.findOne(id);

    const isUsernameExists = !!(await this.prismaService.teacher.findFirst({
      where: {
        ...(id && { teacher_id: { not: id } }),
        user: { user_name, email },
      },
    }));

    if (isUsernameExists)
      throw new ConflictException('Name or email  already exist');
    return true;
  }

  async findOne(teacher_id: number) {
    const existingClassroom = await this.prismaService.teacher.findUnique({
      where: { teacher_id },
      include: { user: true },
    });

    if (!existingClassroom) {
      throw new NotFoundException('Teacher not found');
    }

    return existingClassroom;
  }
  async deleteTeacher(teacher_id: number) {
    const query = await this.prismaService.user.findFirst({
      where: { teacher: { teacher_id } },
      select: { user_id: true },
    });

    if (!query) throw new NotFoundException('Teacher not found');

    return this.prismaService.user.delete({
      where: { user_id: query.user_id },
      select: { teacher: true },
    });
  }
}
