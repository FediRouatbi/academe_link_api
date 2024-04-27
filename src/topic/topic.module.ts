import { Module } from '@nestjs/common';
import { TopicService } from './services/topic.service';
import { TopicResolver } from './resolvers/topic.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [TopicService, TopicResolver],
})
export class TopicModule {}
