import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateTeacher } from '../dto/add-admin.input';
import { RoleCodeEnum, RoleOnUserStatusEnum } from '@prisma/client';
import { Teacher } from '../entities/create-teacher.entity';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTeacher(teacher: CreateTeacher): Promise<Teacher> {
    return this.prismaService.user.create({
      data: {
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        user_name: teacher.user_name,
        email: { create: { email_value: teacher?.email } },
        password_hash: '123456',
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
        teacher: { create: {} },
      },
    });
  }
}
