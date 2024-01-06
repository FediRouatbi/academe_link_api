import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { user as UserModel } from '@prisma/client';

import { UserService } from '../services/user.service';
import { SharedRoleService } from '@src/graphql/shared/services/shared-role.service';

import { ReqUser } from '../../auth/decorators/req-user.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';

import { SignedIn } from '../../auth/entities/signed-in.entity';
import { PaginatedRole } from '../../role/entities/paginated-role.entity';
import { User } from '../entities/user.entity';

import { RoleFindOptionsInput } from '../../role/dto/role-find-options.input';
import { DeleteAccountInput } from '../dto/delete-account.input';
import { PlayerSignUpInput } from '../dto/player-sign-up.input';
import { PaginationInput } from '@src/graphql/shared/dto/pagination.input';

import { RoleCodeEnum } from '../../role/enums/role-code.enum';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly sharedRoleService: SharedRoleService,
  ) {}

  @SkipAuth()
  @Mutation(() => SignedIn)
  async playerSignUp(
    @Args('playerSignUpInput') playerSignUpInput: PlayerSignUpInput,
  ): Promise<SignedIn> {
    return this.userService.playerSignUp(playerSignUpInput);
  }

  @Mutation(() => User)
  async deleteAccount(
    @ReqUser() user: UserModel,
    @Args('deleteAccountInput') deleteAccountInput: DeleteAccountInput,
  ): Promise<User> {
    return this.userService.deleteAccount(user.user_id, deleteAccountInput);
  }

  @Query(() => User)
  async getMyProfile(@ReqUser() user: UserModel): Promise<User> {
    return user;
  }

  @ResolveField('roles', () => PaginatedRole)
  async roles(
    @Parent() user: User,
    @Args('paginationInput', { nullable: true })
    paginationInput?: PaginationInput,
    @Args('roleFindOptionsInput', { nullable: true })
    roleFindOptionsInput?: RoleFindOptionsInput,
  ): Promise<PaginatedRole> {
    return this.sharedRoleService.findAllPaginated(
      paginationInput,
      roleFindOptionsInput,
      { roles_on_users: { some: { user_id: user.user_id } } },
    );
  }
}
