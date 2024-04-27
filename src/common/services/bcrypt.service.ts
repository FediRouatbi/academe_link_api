import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  async hash(value: string) {
    return bcrypt.hash(value, 16);
  }

  async compare(value: string, hashedValue: string) {
    return bcrypt.compare(value, hashedValue);
  }
}
