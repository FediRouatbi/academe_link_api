import { Injectable } from '@nestjs/common';
import { UpdateCourseInput } from '../dto/update-course.input';
import { CreateCourseInput } from '../dto/create-course.input';
import { PrismaService } from 'src/common/services/prisma.service';

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

  findAll() {
    return this.prismaService.course.findMany({
      select: {
        classroom: true,
        teacher: { select: { user: true, teacher_id: true } },
        subject: true,
      },
    });
  }

  findOne(id: number) {
    this.prismaService.course.findUnique({ where: { id } });
    return;
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
