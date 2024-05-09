import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { UpdateSubjectInput } from '../dto/update-subject.input';
import { CreateSubjectInput } from '../dto/create-subject.input';

@Injectable()
export class SubjectService {
  constructor(private readonly prismaService: PrismaService) {}

  create({ name }: CreateSubjectInput) {
    return this.prismaService.subject.create({ data: { name } });
  }

  findAll() {
    return this.prismaService.subject.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        course: {
          select: { teacher: { select: { teacher_id: true, user: true } } },
        },
        id: true,
        name: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.subject.findFirst({ where: { id } });
  }

  update(id: number, { name }: UpdateSubjectInput) {
    return this.prismaService.subject.update({
      where: { id },
      data: { name },
    });
  }

  remove(id: number) {
    return this.prismaService.subject.delete({ where: { id } });
  }
}
