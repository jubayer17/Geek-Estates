import { Injectable } from '@nestjs/common';

@Injectable()
export class AboutService {
  getHello(): string {
    return 'Server is running successfully';
  }
}
