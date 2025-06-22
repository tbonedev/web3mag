import { registerAs } from '@nestjs/config';
import { IsString, IsNotEmpty } from 'class-validator';
import { IsMs } from 'src/decorators/validators/is-ms.decorator';
import validateConfig from 'src/utils/config-validator.util';
import { AuthConfig } from '../types/auth-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  AUTH_JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  @IsMs()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;

  @IsString()
  @IsNotEmpty()
  AUTH_REFRESH_SECRET: string;

  @IsString()
  @IsNotEmpty()
  @IsMs()
  AUTH_REFRESH_TOKEN_EXPIRES_IN: string;

  @IsString()
  @IsNotEmpty()
  AUTH_FORGOT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  @IsMs()
  AUTH_FORGOT_TOKEN_EXPIRES_IN: string;

  @IsString()
  @IsNotEmpty()
  AUTH_CONFIRM_EMAIL_SECRET: string;

  @IsString()
  @IsNotEmpty()
  @IsMs()
  AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN: string;
}

export default registerAs<AuthConfig>('auth', () => {
  console.info(`Register AuthConfig from environment variables`);
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    secret: process.env.AUTH_JWT_SECRET as string,
    expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN as string,
    refreshSecret: process.env.AUTH_REFRESH_SECRET as string,
    refreshExpires: process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN as string,
    forgotSecret: process.env.AUTH_FORGOT_SECRET as string,
    forgotExpires: process.env.AUTH_FORGOT_TOKEN_EXPIRES_IN as string,
    confirmEmailSecret: process.env.AUTH_CONFIRM_EMAIL_SECRET as string,
    confirmEmailExpires: process.env
      .AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN as string,
  };
});
