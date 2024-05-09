import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Course } from '../entities/course.entity';
import { CourseService } from '../services/course.service';
import { CreateCourseInput } from '../dto/create-course.input';
import { UpdateCourseInput } from '../dto/update-course.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, UserEntity } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/dto/user.input';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course)
  createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
  ) {
    return this.courseService.create(createCourseInput);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [Course], { name: 'getCourses' })
  async findAll(@UserEntity() user: CurrentUser) {
    return this.courseService.findAll(user);
  }

  @Query(() => Course, { name: 'getCourse' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.courseService.findOne(id);
  }

  @Mutation(() => Course)
  async editCourse(
    @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
  ) {
    return this.courseService.update(updateCourseInput.id, updateCourseInput);
  }

  @Mutation(() => Course)
  deleteCourse(@Args('id', { type: () => Int }) id: number) {
    return this.courseService.remove(id);
  }
}
