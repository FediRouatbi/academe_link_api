import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TopicService } from '../services/topic.service';
import { Topic } from '../entities/topic.entity';
import { CreateTopic } from '../dto/create-topic.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, UserEntity } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/dto/user.input';
import { UpdateTopic } from '../dto/update-topic.input';
import { CourseId } from '../dto/courseId-topic.input';

@Resolver()
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {}

  @Query(() => [Topic])
  async GetTopics(): Promise<Topic[]> {
    return this.topicService.getTopics();
  }

  @Query(() => [Topic])
  async getTopicsByAuthor(
    @Args({ name: 'authorID', type: () => Int }) id: number,
  ) {
    return this.topicService.getTopicsByAuthor(id);
  }
  @Query(() => [Topic])
  async getTopicsByCourseId(
    @Args({ name: 'courseID', type: () => Int }) course_id: number,
  ) {
    return this.topicService.getTopicsByCourseId(course_id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Topic)
  async CreateTopic(
    @Args('createTopic')
    topic: CreateTopic,
    @UserEntity() user: CurrentUser,
    @Args('courseId', { nullable: true }) courseId?: CourseId,
  ): Promise<Topic> {
    return this.topicService.createTopic(topic, user?.user_id, courseId);
  }

  @Mutation(() => Topic)
  async EditTopic(
    @Args('editTopic') topic: UpdateTopic,
    @Args({ name: 'topicId', type: () => Int }) id: number,
  ): Promise<Topic> {
    return this.topicService.editTopic(topic, id);
  }

  @Mutation(() => Topic)
  async deleteTopic(@Args('topicId') topic_id: number) {
    return this.topicService.deleteTopic(topic_id);
  }
}
