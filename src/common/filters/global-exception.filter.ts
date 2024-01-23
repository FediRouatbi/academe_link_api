import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

import { GqlException } from '../utils/gql-exception.util';

@Catch()
export class GlobalExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: HttpException | GqlException) {
    if (exception instanceof GqlException) {
      return exception;
    } else {
      this.logger.error(exception.stack);
      return new GqlException('500.695375', undefined, exception.stack);
    }
  }
}
