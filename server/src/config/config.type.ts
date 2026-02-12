import { AuthConfig } from 'src/auth/types/auth-config.type';
import { DatabaseConfig } from 'src/database/config/database.config.type';
import { RedisConfig } from 'src/redis/config/redis.config.type';
import { MailConfig } from 'src/mail/config/mail.config.type';
import { AppConfig } from './app.config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  auth: AuthConfig;
  mail: MailConfig;
};
