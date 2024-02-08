import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class UserService {
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

  async creatClassromm(
    classroom_name: string,
    teachersId: number[],
    studentsId: number[],
  ) {
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

  async deleteClassromm(classroomId: number) {
    return this.prismaService.classroom.delete({
      where: { classroom_id: classroomId },
    });
  }
}
