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
  async getTeachers() {
    return this.prismaService.teacher.findMany({
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
        subject: true,
      },
    });
  }

  async createTeacher(teacher: CreateTeacher): Promise<Teacher> {
    await this?.isTeachernameExists(teacher?.user_name, teacher?.email);
    return this.prismaService.teacher.create({
      data: {
        user: {
          create: {
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            user_name: teacher.user_name,
            email: { create: { email_value: teacher?.email } },
            password_hash: await this.bcryptService.hash(teacher.password),
            roles_on_users: {
              create: [
                {
                  status: RoleOnUserStatusEnum.ACTIVE,
                  role: {
                    connect: {
                      role_code: RoleCodeEnum.TEACHER,
                    },
                  },
                },
              ],
            },
          },
        },
      },
      select: { user: true, user_id: true, teacher_id: true },
    });
  }

  async editTeacher(teacher: UpdateTeacher, id: number): Promise<Teacher> {
    await this?.isTeachernameExists(teacher?.user_name, teacher?.email, id);

    return this.prismaService.teacher.update({
      where: { teacher_id: id },

      data: {
        user: {
          update: {
            first_name: teacher?.first_name,
            last_name: teacher?.last_name,
            user_name: teacher?.user_name,
            email: { update: { email_value: teacher?.email } },
          },
        },
      },
      select: { user: true, user_id: true, teacher_id: true },
    });
  }

  async isTeachernameExists(
    user_name: string,
    email: string,
    id?: number,
  ): Promise<boolean> {
    if (id) await this.isTeacherByIdExists(id);

    const isUsernameExists = !!(await this.prismaService.teacher.findFirst({
      where: {
        ...(id && { teacher_id: { not: id } }),
        user: { OR: [{ user_name }, { email: { email_value: email } }] },
      },
    }));

    if (isUsernameExists)
      throw new ConflictException('Name or email  already exist');
    return true;
  }
  async isTeacherByIdExists(id: number): Promise<boolean> {
    const user = await this.prismaService.teacher.findUnique({
      where: {
        teacher_id: id,
      },
    });

    if (!user) throw new NotFoundException('Teacher do not exist!');
    return true;
  }

  async deleteTeacher(teacher_id: number) {
    await this.isTeacherByIdExists(teacher_id);

    return this.prismaService.teacher.delete({
      where: { teacher_id },
      select: { teacher_id: true, user_id: true, user: true },
    });
  }
}
