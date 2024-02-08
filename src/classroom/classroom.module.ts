import { Module } from '@nestjs/common';
import { ClassroomService } from './services/classroom.service';
import { ClassroomResolver } from './resolvers/classroom.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [ClassroomService, ClassroomResolver],
})
export class ClassroomModule {}
