import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClassroomService } from '../services/classroom.service';
import { Classroom } from '../entities/create-classroom.entity';
import { UpdateClassroom } from '../dto/update-classroom.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreateClassroom } from '../dto/create-classroom.input';

@Resolver()
export class ClassroomResolver {
  constructor(private readonly classroomService: ClassroomService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => [Classroom])
  async getClassrooms(@Args('search', { nullable: true }) search?: string) {
    return this.classroomService.getClassrooms(search);
  }

  @Query(() => Classroom)
  async getClassroom(
    @Args({ name: 'id', type: () => Int }) classroom_id: number,
  ) {
    return this.classroomService.getClassroom(classroom_id);
  }

  @Mutation(() => Classroom)
  async creatClassroom(@Args('createClassromm') classroom: CreateClassroom) {
    return this.classroomService.creatClassroom(classroom);
  }
  @Mutation(() => Classroom)
  async editClassromm(@Args('editClassromm') classroom: UpdateClassroom) {
    return this.classroomService?.editClassromm(classroom);
  }

  @Mutation(() => Classroom)
  async deleteClassroom(@Args('classroomId') classroomId: number) {
    return this.classroomService.deleteClassroom(classroomId);
  }
}
