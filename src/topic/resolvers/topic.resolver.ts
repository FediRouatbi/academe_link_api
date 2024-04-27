import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TopicService } from '../services/topic.service';
import { Topic } from '../entities/topic.entity';
import { CreateTopic } from '../dto/create-topic.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, UserEntity } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/dto/user.input';
import { UpdateTopic } from '../dto/update-topic.input';

@Resolver()
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {}

  @Query(() => [Topic])
  async GetTopics(): Promise<Topic[]> {
    return this.topicService.getTopics();
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [Topic])
  async getTopicsByAuthor(@UserEntity() user: CurrentUser) {
    return this.topicService.getTopicsByAuthor(user?.user_id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Topic)
  async CreateTopic(
    @Args('createTopic')
    topic: CreateTopic,
    @UserEntity() user: CurrentUser,
  ): Promise<Topic> {
    return this.topicService.createTopic(topic, user?.user_id);
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
