import { Module } from '@nestjs/common';
import { TeacherService } from './services/teacher.service';
import { TeacherResolver } from './resolvers/teacher.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [TeacherService, TeacherResolver],
})
export class TeacherModule {}
