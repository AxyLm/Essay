import { HttpException, HttpStatus } from '@nestjs/common';

export class LivesException extends HttpException {
  constructor() {
    super('Lives', HttpStatus.I_AM_A_TEAPOT);
  }
}
