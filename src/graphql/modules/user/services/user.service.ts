import { Injectable } from '@nestjs/common';

import { user as UserModel } from '@prisma/client';

import { AuthService } from '../../auth/services/auth.service';
import { BcryptService } from '@src/common/services/bcrypt.service';
import { PrismaService } from '@src/common/services/prisma.service';

import { GqlException } from '@src/common/utils/gql-exception.util';

import { SignedIn } from '../../auth/entities/signed-in.entity';

import { DeleteAccountInput } from '../dto/delete-account.input';
import { PlayerSignUpInput } from '../dto/player-sign-up.input';

import { RoleCodeEnum } from '../../role/enums/role-code.enum';
import { RoleOnUserStatusEnum } from '../../role/enums/role-on-user-status.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly authService: AuthService,
  ) {}

  async playerSignUp(playerSignUpInput: PlayerSignUpInput): Promise<SignedIn> {
    const { user_name, email } = playerSignUpInput;
    const { password, confirm_password, ...rest } = playerSignUpInput;
    const existingUser = await this.prismaService.user.findFirst({
      where: { user_name: { equals: user_name, mode: 'insensitive' } },
    });

    if (existingUser) {
      throw new GqlException('409.891519');
    }

    const existingEmail = await this.prismaService.email.findFirst({
      where: { email_value: { equals: email, mode: 'insensitive' } },
    });

    if (existingEmail) {
      throw new GqlException('409.479023');
    }

    const password_hash = await this.bcryptService.hash(password);

    const user = await this.prismaService.user.create({
      data: {
        ...rest,
        password_hash,
        email: { create: { email_value: email } },
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
      include: { email: true },
    });

    const generatedEmailValidationOtp =
      await this.authService.generateEmailValidationOtp(
        user.user_id,
        user.email.email_value,
      );

    return generatedEmailValidationOtp;
  }

  async findOne(id: number): Promise<UserModel> {
    return this.prismaService.user.findUnique({ where: { user_id: id } });
  }

  async deleteAccount(
    id: number,
    deleteAccountInput: DeleteAccountInput,
  ): Promise<UserModel> {
    const { password } = deleteAccountInput;
    const user = await this.prismaService.user.findUnique({
      where: { user_id: id },
    });

    const passwordCheck = await this.bcryptService.compare(
      password,
      user.password_hash,
    );

    if (!passwordCheck) {
      throw new GqlException('401.977936');
    }

    return this.prismaService.user.delete({ where: { user_id: id } });
  }
}
