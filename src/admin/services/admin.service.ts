import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { RoleCodeEnum, RoleOnUserStatusEnum } from '@prisma/client';
import { Teacher } from '../entities/create-teacher.entity';
import { BcryptService } from 'src/common/services/bcrypt.service';
import { CreateUser } from '../dto/create-user.input';
import { UpdateUser } from '../dto/update-user.input';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  async createUser(teacher: CreateUser): Promise<Teacher> {
    return this.prismaService.user.create({
      data: {
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
                  role_code: RoleCodeEnum.STUDENT,
                },
              },
            },
          ],
        },
        student: { create: {} },
      },
    });
  }

  async editUser(teacher: UpdateUser, id: number): Promise<Teacher> {
    await this.isUserByIdExists(id);

    return this.prismaService.user.update({
      where: { user_id: id },

      data: {
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
    });
  }

  async isUserByIdExists(id: number): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: {
        user_id: id,
      },
    });

    if (!user) throw new NotFoundException('User do not exist!');

    return true;
  }
}
