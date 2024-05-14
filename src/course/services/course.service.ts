import { Injectable } from '@nestjs/common';
import { UpdateCourseInput } from '../dto/update-course.input';
import { CreateCourseInput } from '../dto/create-course.input';
import { PrismaService } from 'src/common/services/prisma.service';
import { CurrentUser } from 'src/auth/dto/user.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  create({ classroom_id, subject_id, teacher_id }: CreateCourseInput) {
    return this.prismaService.course.create({
      data: { classroom_id, subject_id, teacher_id },
      select: {
        classroom: true,
        teacher: { select: { user: true, teacher_id: true } },
        subject: true,
      },
    });
  }

  async findAll(user: CurrentUser, search?: string) {
    const query = {
      id: true,
      createdAt: true,
      classroom: {
        select: {
          student: true,
          classroom_id: true,
          classroom_name: true,
          createdAt: true,
        },
      },
      teacher: { select: { user: true, teacher_id: true } },
      subject: true,
    };

    const searchParams = search
      ? {
          OR: [
            {
              subject: {
                name: { contains: search, mode: Prisma.QueryMode.insensitive },
              },
            },
            {
              classroom: {
                classroom_name: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            },
          ],
        }
      : {};

    if (user?.role === 'STUDENT') {
      const { classroom_id } = await this.prismaService?.classroom.findFirst({
        where: { student: { some: { user_id: user?.user_id } } },
        select: { classroom_id: true },
      });

      return this.prismaService.course.findMany({
        where: { classroom_id, AND: searchParams },
        select: query,
      });
    }

    if (user?.role === 'TEACHER') {
      return this.prismaService.course.findMany({
        where: { teacher: { user_id: user?.user_id }, AND: searchParams },
        select: query,
      });
    }

    return this.prismaService.course.findMany({
      where: { ...searchParams },
      select: query,
    });
  }

  findOne(id: number) {
    return this.prismaService.course.findUnique({
      where: { id },

      select: {
        createdAt: true,
        classroom: true,
        subject: true,
        teacher: { select: { teacher_id: true, user: true } },
        topic: true,
        updatedAt: true,
      },
    });
  }

  update(id: number, { subject_id }: UpdateCourseInput) {
    return this.prismaService.course.update({
      where: { id },
      data: { subject_id },
    });
  }

  remove(id: number) {
    return this.prismaService.course.delete({ where: { id } });
  }
}
