import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClassroomService } from '../services/classroom.service';
import { Classroom } from '../entities/create-classroom.entity';

@Resolver()
export class ClassroomResolver {
  constructor(private readonly classroomService: ClassroomService) {}

  @Query(() => [Classroom])
  async getClassromms() {
    return this.classroomService.getClassromms();
  }

  //   @Query(() => String)
  //   async getClassromm(classroom_id: number) {
  //     return this.prismaService.classroom.findUnique({
  //       where: { classroom_id },
  //       include: { student: true, teacher: true, subject: true },
  //     });
  //   }
  @Mutation(() => Classroom)
  async creatClassroom(
    @Args('classroom') classroom_name: string,
    @Args('teachersId', { type: () => [Int] }) teachersId: number[],
    @Args('studentsId', { type: () => [Int] }) studentsId: number[],
  ) {
    return this.classroomService.creatClassroom(
      classroom_name,
      teachersId,
      studentsId,
    );
  }

  //   async editClassromm(classroom_id: number, classroom_name: string) {
  //     return this.prismaService.classroom.update({
  //       where: { classroom_id },
  //       data: { classroom_name },
  //     });
  //   }
  @Mutation(() => Classroom)
  async deleteClassroom(@Args('classroomId') classroomId: number) {
    return this.classroomService.deleteClassroom(classroomId);
  }
}
