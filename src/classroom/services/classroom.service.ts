import { Classroom } from './../entities/create-classroom.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class ClassroomService {
  constructor(private readonly prismaService: PrismaService) {}

  async getClassromms() {
    return this.prismaService.classroom.findMany({
      include: {
        student: true,
        teacherClassroom: { select: { teacher: true } },
        subject: true,
      },
    });
  }

  async findOne(classroom_id: number) {
    const existingClassroom = await this.prismaService.classroom.findUnique({
      where: { classroom_id },
    });
    console.log(existingClassroom);

    if (!existingClassroom) {
      throw new NotFoundException('Classroom not found');
    }

    return existingClassroom;
  }
  async getClassromm(classroom_id: number) {
    return this.prismaService.classroom.findUnique({
      where: { classroom_id },
      include: {
        student: true,
        teacherClassroom: { select: { teacher: true } },
        subject: true,
      },
    });
  }

  async creatClassroom(
    classroom_name: string,
    teachersId: number[],
    studentsId: number[],
  ) {
    const classroomExist = await this.prismaService.classroom.findUnique({
      where: { classroom_name },
    });
    if (classroomExist)
      throw new ConflictException(
        'Classroom with the given name already exists',
      );

    const listTeachersId = teachersId.map((el) => ({ teacher_id: el }));
    const listStudentsId = studentsId.map((el) => ({ student_id: el }));

    return this.prismaService.classroom.create({
      data: {
        classroom_name,
        teacherClassroom: { connect: listTeachersId },
        student: { connect: listStudentsId },
        subject: { connect: [] },
      },
      include: {
        student: true,
        teacherClassroom: { select: { teacher: true } },
        subject: true,
      },
    });
  }

  async editClassromm(classroom_id: number, classroom_name: string) {
    return this.prismaService.classroom.update({
      where: { classroom_id },
      data: { classroom_name },
    });
  }

  async deleteClassroom(classroomId: number) {
    await this.findOne(classroomId);

    return this.prismaService.classroom.delete({
      where: { classroom_id: classroomId },
    });
  }
}
