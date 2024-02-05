import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Teacher } from '../entities/create-teacher.entity';
import { CreateTeacher } from '../dto/add-admin.input';
import { AdminService } from '../service/admin.service';

@Resolver()
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}
  @Mutation(() => Teacher)
  async TestEndPoint(
    @Args('createTeacher') teacher: CreateTeacher,
  ): Promise<Teacher> {
    return this.adminService.createTeacher(teacher);
  }

  @Query(() => String)
  async Hello() {
    return 'Hello';
  }
}
