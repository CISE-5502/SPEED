import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAuthorization(): string {
    console.log('auth');
    return 'Authorized';
  }
}
