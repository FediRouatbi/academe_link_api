import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateTopic } from '../dto/create-topic.input';
import { UpdateTopic } from '../dto/update-topic.input';

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTopics() {
    return this.prismaService.topic.findMany({
      select: { content: true, topic_id: true, user_id: true },
    });
  }

  async getTopicsByAuthor(user_id: number) {
    return this.prismaService.topic.findMany({
      orderBy: { createdAt: 'desc' },
      where: { user_id: { equals: user_id } },
    });
  }
  async getTopicsByCourseId(course_id: number) {
    return this.prismaService.topic.findMany({
      orderBy: { createdAt: 'desc' },
      where: { course_id },
      select: { topic_id: true, content: true, user_id: true },
    });
  }

  async createTopic(
    topic: CreateTopic,
    user_id: number,
    course?: {
      classroom_id?: number;
      teacher_id?: number;
      subject_id?: number;
    },
  ) {
    const courseId =
      course?.classroom_id && course?.teacher_id && course?.subject_id
        ? {
            classroom_id: course?.classroom_id,
            teacher_id: course?.teacher_id,
            subject_id: course?.subject_id,
          }
        : null;

    const connect = {
      subject_id_teacher_id_classroom_id: courseId,
    };
    return this.prismaService.topic.create({
      data: {
        content: topic?.content,
        ...(courseId && {
          course: {
            connect: connect,
          },
        }),

        user: { connect: { user_id: user_id } },
      },
    });
  }
  async editTopic(topic: UpdateTopic, topic_id: number) {
    return this.prismaService.topic.update({
      data: { content: topic?.content },
      where: { topic_id: topic_id },
    });
  }

  async deleteTopic(topic_id: number) {
    return this.prismaService.topic.delete({
      where: { topic_id: topic_id },
    });
  }
}
