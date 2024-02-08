import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminResolver } from './resolvers/admin.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [AdminResolver, AdminService],
})
export class AdminModule {}
