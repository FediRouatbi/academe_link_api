import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  private melliSecondsInSec = 1000;
  convertUnixToDate(unix: number): Date {
    return new Date(unix * 1000);
  }

  convertMilliSecondsToSeconds(milliSeconds: number): number {
    return Math.floor(milliSeconds / 1000);
  }
}
