import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Teacher } from '../entities/create-teacher.entity';
import { AdminService } from '../services/admin.service';
import { CreateUser } from '../dto/create-user.input';

@Resolver()
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}
  @Mutation(() => Teacher)
  async CreateUser(@Args('createUser') teacher: CreateUser): Promise<Teacher> {
    return this.adminService.createUser(teacher);
  }

  @Mutation(() => Teacher)
  async EditUser(
    @Args('editUser') teacher: CreateUser,
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<Teacher> {
    return this.adminService.editUser(teacher, id);
  }

  @Query(() => String)
  async Hello() {
    return 'Hello';
  }
}
