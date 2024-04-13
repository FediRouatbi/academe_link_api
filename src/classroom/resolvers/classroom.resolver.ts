import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClassroomService } from '../services/classroom.service';
import { Classroom } from '../entities/create-classroom.entity';
import { UpdateClassroom } from '../dto/update-classroom.input';

@Resolver()
export class ClassroomResolver {
  constructor(private readonly classroomService: ClassroomService) {}

  @Query(() => [Classroom])
  async getClassromms() {
    return this.classroomService.getClassromms();
  }

  @Query(() => Classroom)
  async getClassromm(
    @Args({ name: 'id', type: () => Int }) classroom_id: number,
  ) {
    return this.classroomService.getClassromm(classroom_id);
  }

  @Mutation(() => Classroom)
  async creatClassroom(
    @Args('classroom') classroom_name: string,
    @Args('teachersId', { type: () => [Int], defaultValue: [] })
    teachersId?: number[],
    @Args('studentsId', { type: () => [Int], defaultValue: [] })
    studentsId?: number[],
  ) {
    return this.classroomService.creatClassroom(
      classroom_name,
      teachersId,
      studentsId,
    );
  }
  @Mutation(() => Classroom)
  async editClassromm(
    @Args('editTeacher') classroom: UpdateClassroom,
    @Args({ name: 'id', type: () => Int }) classroom_id: number,
  ) {
    console.log(
      await this.classroomService?.editClassromm(classroom, classroom_id),
    );

    return this.classroomService?.editClassromm(classroom, classroom_id);
  }

  @Mutation(() => Classroom)
  async deleteClassroom(@Args('classroomId') classroomId: number) {
    return this.classroomService.deleteClassroom(classroomId);
  }
}
