import { SetMetadata } from '@nestjs/common';

export const SKIP_TOKEN_EXPIRATION = 'skipTokenExpiration';
export const SkipTokenExpiration = () =>
  SetMetadata(SKIP_TOKEN_EXPIRATION, true);
