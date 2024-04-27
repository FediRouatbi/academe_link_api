import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { SubjectService } from './services/subject.service';
import { SubjectResolver } from './resolvers/subject.resolver';

@Module({
  imports: [CommonModule],
  providers: [SubjectResolver, SubjectService],
})
export class SubjectModule {}
