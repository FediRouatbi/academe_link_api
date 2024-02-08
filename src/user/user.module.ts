import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';

@Module({
  imports: [CommonModule],
  providers: [UserService, UserResolver],
})
export class ClassroomModule {}
