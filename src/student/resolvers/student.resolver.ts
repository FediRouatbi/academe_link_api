import { user, student } from './../../../node_modules/.prisma/client/index.d';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from '../services/student.service';
import { Student } from '../entities/create-student.entity';
import { CreateStudent } from '../dto/create-student.input';
import { UpdateStudent } from '../dto/update-student.input';

@Resolver()
export class UserResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => [Student])
  async GetStudents(): Promise<Student[]> {
    return this.studentService.getStudents();
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
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<Student> {

    return this.studentService.editStudent(student, id);
  }

  @Mutation(() => Student)
  async deleteStudent(@Args('teacherId') student_id: number) {
    return this.studentService.deleteStudent(student_id);
  }
}
