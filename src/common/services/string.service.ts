import { Injectable } from '@nestjs/common';

@Injectable()
export class StringService {
  async generateRandom(
    length: number = 4,
    digitsOnly: boolean = false,
  ): Promise<string> {
    let result = '';
    const characters = digitsOnly
      ? '0123456789'
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
