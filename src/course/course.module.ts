import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CourseResolver } from './resolvers/course.resolver';
import { CourseService } from './services/course.service';

@Module({
  imports: [CommonModule],
  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
