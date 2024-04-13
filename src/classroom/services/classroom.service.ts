import { UpdateClassroom } from '../dto/update-classroom.input';
import { teacher } from './../../../node_modules/.prisma/client/index.d';
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
    const query = await this.prismaService.classroom.findMany({
      include: {
        student: {
          select: {
            student_id: true,
            user_id: true,
            classroom_id: true,
            user: {
              select: {
                user_name: true,
                last_name: true,
                first_name: true,
                createdAt: true,
                updatedAt: true,
                user_id: true,
              },
            },
          },
        },
        teacherClassroom: {
          select: {
            teacher: {
              select: { user: true, teacher_id: true, user_id: true },
            },
          },
        },
        subject: true,
      },
    });

    const data = query.map((el) => {
      const { teacherClassroom, ...rest } = el;

      const teacher = teacherClassroom.map((el) => el.teacher);

      return { ...rest, teacher };
    });

    return data;
  }

  async findOne(classroom_id: number) {
    const existingClassroom = await this.prismaService.classroom.findUnique({
      where: { classroom_id },
      include: {
        student: true,
        subject: true,
        teacherClassroom: {
          select: {
            teacher: {
              select: { user: true, teacher_id: true, user_id: true },
            },
          },
        },
      },
    });

    if (!existingClassroom) {
      throw new NotFoundException('Classroom not found');
    }

    return existingClassroom;
  }

  async getClassromm(classroom_id: number) {
    const query = await this.prismaService.classroom.findUnique({
      where: { classroom_id },
      include: {
        student: true,
        teacherClassroom: { select: { teacher: true } },
        subject: true,
      },
    });
    const { teacherClassroom, ...rest } = query;

    const teacher = teacherClassroom?.map((el) => el.teacher);
    return { ...rest, teacher };
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

    const data = await this.prismaService.classroom.create({
      data: {
        classroom_name,
        teacherClassroom: { createMany: { data: listTeachersId } },
        student: { connect: listStudentsId },
        subject: { connect: [] },
      },
      include: {
        student: true,
        teacherClassroom: { select: { teacher: true } },
        subject: true,
      },
    });
    const { teacherClassroom, ...res } = data;
    const teacher = teacherClassroom.map((el) => el.teacher);
    return { ...res, teacher };
  }

  async editClassromm(classroom: UpdateClassroom, classroom_id: number) {
    await this.findOne(classroom_id);

    const listTeachersId = classroom?.teachers?.map((el) => ({
      teacher_id: +el,
    }));
    const listStudentsId = classroom?.students?.map((el) => ({
      student_id: +el,
    }));

    return this.prismaService.classroom.update({
      where: { classroom_id },
      data: {
        classroom_name: classroom?.classroom_name,
        student: { set: listStudentsId },
        teacherClassroom: {
          createMany: { data: listTeachersId },
        },
      },
      select: {
        student: { include: { user: true } },
        classroom_name: true,
        classroom_id: true,
        teacherClassroom: {
          select: {
            teacher: {
              select: {
                subject: true,
                user: true,
                teacher_id: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteClassroom(classroomId: number) {
    await this.findOne(classroomId);

    return this.prismaService.classroom.delete({
      where: { classroom_id: classroomId },
    });
  }
}
