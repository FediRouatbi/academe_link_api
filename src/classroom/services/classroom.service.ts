import { PrismaService } from 'src/common/services/prisma.service';
import { UpdateClassroom } from '../dto/update-classroom.input';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassroom } from '../dto/create-classroom.input';

@Injectable()
export class ClassroomService {
  constructor(private readonly prismaService: PrismaService) {}

  async getClassrooms(search?: string) {
    const query = await this.prismaService.classroom.findMany({
      where: { classroom_name: search },
      orderBy: {
        createdAt: 'desc',
      },

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

        course: {
          select: {
            subject: { select: { name: true, id: true } },
            teacher: { select: { user: true, teacher_id: true } },
          },
        },
      },
    });

    return query;
  }

  async findOne(classroom_id: number) {
    const existingClassroom = await this.prismaService.classroom.findUnique({
      where: { classroom_id },
      include: {
        student: { select: { user: true, student_id: true } },
        course: true,
      },
    });

    if (!existingClassroom) {
      throw new NotFoundException('Classroom not found');
    }

    return existingClassroom;
  }

  async getClassroom(classroom_id: number) {
    const query = await this.prismaService.classroom.findUnique({
      where: { classroom_id },
      include: {
        student: { select: { user: true, student_id: true } },
        course: {
          select: {
            id: true,
            createdAt: true,
            subject: true,
            teacher: {
              select: {
                teacher_id: true,
                user: true,

                updatedAt: true,
              },
            },
          },
        },
      },
    });

    return query;
  }

  async creatClassroom(classroom: CreateClassroom) {
    const classroomExist = await this.prismaService.classroom.findUnique({
      where: { classroom_name: classroom?.classroom_name },
    });
    if (classroomExist)
      throw new ConflictException(
        'Classroom with the given name already exists',
      );

    const query = await this.prismaService.classroom.create({
      data: {
        classroom_name: classroom?.classroom_name,
        description: classroom?.description,
        student: { connect: classroom?.studentsIds || [] },
        course: { createMany: { data: classroom?.teachersIds || [] } },
      },
      include: {
        student: true,
        course: true,
      },
    });
    return query;
  }

  async editClassromm(classroom: UpdateClassroom) {
    await this.findOne(classroom?.classroom_id);

    return this.prismaService.classroom.update({
      where: { classroom_id: classroom?.classroom_id },
      data: {
        classroom_name: classroom?.classroom_name,
        description: classroom?.description,
        student: { set: classroom?.studentsIds },
      },
      select: {
        student: { include: { user: true } },
        classroom_name: true,
        classroom_id: true,
        course: true,
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
