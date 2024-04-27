import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Course } from '../entities/course.entity';
import { CourseService } from '../services/course.service';
import { CreateCourseInput } from '../dto/create-course.input';
import { UpdateCourseInput } from '../dto/update-course.input';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course)
  createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
  ) {
    return this.courseService.create(createCourseInput);
  }

  @Query(() => [Course], { name: 'getCourses' })
  findAll() {
    return this.courseService.findAll();
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
