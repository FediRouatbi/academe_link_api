import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 16);
    return hash;
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
