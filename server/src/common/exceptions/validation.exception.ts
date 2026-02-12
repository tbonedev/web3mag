import { ErrorCode } from 'src/constants/error.code.constant';
import { BadRequestException } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(error: ErrorCode = ErrorCode.V000, message?: string) {
    super({ errorCode: error, message });
  }
}
