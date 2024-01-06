import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { AppConfigService } from './app-config.service';

@Injectable()
export class BcryptService {
  constructor(private appConfigService: AppConfigService) {}

  async hash(value: string): Promise<string> {
    const rounds = this.appConfigService.authConfig.hash.rounds;
    const hash = await bcrypt.hash(value, rounds);
    return hash;
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
