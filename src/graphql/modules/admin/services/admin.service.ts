import { Injectable } from '@nestjs/common';

import { PrismaService } from '@src/common/services/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async addTeacher() {
    this.prismaService.user.create({
      data: {
        first_name: 'fedi',
        last_name: 'rouatbi',
        user_name: 'fedi',
        roles_on_users: {
          create: [
            { status: 'ACTIVE', role: { connect: { role_code: 'TEACHER' } } },
          ],
        },
      },
    });
  }
}
