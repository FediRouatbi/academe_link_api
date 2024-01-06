import { Module } from '@nestjs/common';

import { CommonModule } from '@src/common/common.module';
import { GraphqlModule } from '@src/graphql/graphql.module';

@Module({
  imports: [GraphqlModule, CommonModule],
})
export class AppModule {}
