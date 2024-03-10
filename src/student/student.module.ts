import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UserResolver } from './resolvers/student.resolver';
import { StudentService } from './services/student.service';

@Module({
  imports: [CommonModule],
  providers: [StudentService, UserResolver],
})
export class StudentModule {}
