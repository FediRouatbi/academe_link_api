import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from '../services/student.service';
import { Student } from '../entities/create-student.entity';
import { CreateStudent } from '../dto/create-student.input';
import { UpdateStudent } from '../dto/update-student.input';

@Resolver()
export class UserResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => [Student])
  async GetStudents(
    @Args('hasClassroom', { type: () => Boolean, nullable: true })
    hasClassroom?: boolean,
  ): Promise<Student[]> {
    return this.studentService.getStudents(hasClassroom);
  }

  @Query(() => Student)
  async getStudent(@Args({ name: 'id', type: () => Int }) student_id: number) {
    return this.studentService.getStudent(student_id);
  }

  @Mutation(() => Student)
  async CreateStudent(
    @Args('createStudent') student: CreateStudent,
  ): Promise<Student> {
    return this.studentService.createStudent(student);
  }

  @Mutation(() => Student)
  async EditStudent(
    @Args('editStudent') student: UpdateStudent,
  ): Promise<Student> {
    return this.studentService.editStudent(student);
  }

  @Mutation(() => Student)
  async deleteStudent(@Args('studentId') student_id: number) {
    return this.studentService.deleteStudent(student_id);
  }
}
