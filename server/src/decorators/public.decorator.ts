import { IS_PUBLIC } from 'src/constants/app.constant';
import { applyDecorators, HttpStatus, SetMetadata } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';

export const Public = () => SetMetadata(IS_PUBLIC, true);

interface IsPublicOptions {
  statusCode?: HttpStatus;
}

export const IsPublic = (options: IsPublicOptions = {}): MethodDecorator => {
  const defaultStatusCode = HttpStatus.OK;

  return applyDecorators(
    Public(),
    HttpCode(options.statusCode || defaultStatusCode),
  );
};
