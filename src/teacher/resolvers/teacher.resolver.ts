import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Teacher } from '../entities/get-teacher.entity';
import { TeacherService } from '../services/teacher.service';
import { CreateTeacher } from '../dto/create-teacher.input';
import { UpdateTeacher } from '../dto/update-teacher.input';

@Resolver()
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Query(() => [Teacher])
  async GetTeachers(): Promise<Teacher[]> {
    return this.teacherService.getTeachers();
  }

  @Mutation(() => Teacher)
  async CreateTeacher(
    @Args('createTeacher') teacher: CreateTeacher,
  ): Promise<Teacher> {
    return this.teacherService.createTeacher(teacher);
  }

  @Mutation(() => Teacher)
  async EditTeacher(
    @Args('editTeacher') teacher: UpdateTeacher,
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<Teacher> {
    return this.teacherService.editTeacher(teacher, id);
  }

  @Mutation(() => Teacher)
  async deleteTeacher(@Args('teacherId') userId: number) {
    return this.teacherService.deleteTeacher(userId);
  }

}
