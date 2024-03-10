import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from '../services/student.service';
import { Student } from '../entities/create-student.entity';
import { CreateStudent } from '../dto/create-student.input';

@Resolver()
export class UserResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => [Student])
  async GetStudents(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Mutation(() => Student)
  async CreateStudent(
    @Args('createStudent') student: CreateStudent,
  ): Promise<Student> {
    return this.studentService.createStudent(student);
  }

  // @Mutation(() => Teacher)
  // async EditTeacher(
  //   @Args('editTeacher') teacher: UpdateTeacher,
  //   @Args({ name: 'id', type: () => Int }) id: number,
  // ): Promise<Teacher> {
  //   return this.studentService.editTeacher(teacher, id);
  // }

  // @Mutation(() => Teacher)
  // async deleteTeacher(@Args('teacherId') userId: number) {
  //   return this.studentService.deleteTeacher(userId);
  // }
}
