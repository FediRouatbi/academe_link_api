import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { BcryptService } from './services/bcrypt.service';

@Module({
  providers: [PrismaService, BcryptService],
  exports: [PrismaService, BcryptService],
})
export class CommonModule {}
