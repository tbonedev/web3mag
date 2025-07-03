import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import authConfig from 'src/auth/config/auth-config';
import { AllConfigType } from 'src/config/config.type';
import { appConfig } from 'src/config/app.config';
import databaseConfig from 'src/database/config/database.config';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import mailConfig from 'src/mail/config/mail.config';
import redisConfig from 'src/redis/config/redis.config';
import { CacheModule } from '@nestjs/cache-manager';
import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { redisStore } from 'cache-manager-ioredis-yet';

function generateModulesSet() {
  const imports: ModuleMetadata['imports'] = [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig, authConfig, mailConfig],
      // Мы убираем envFilePath. По умолчанию, @nestjs/config
      // будет искать файл .env в корневой директории проекта.
      // Это самый надежный способ.
    }),
  ];

  const dbModule = TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService,
    dataSourceFactory: async (options: DataSourceOptions) => {
      if (!options) {
        throw new Error('Invalid options passed');
      }
      return new DataSource(options).initialize();
    },
  });

  const cacheModule = CacheModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService<AllConfigType>) => {
      return {
        store: await redisStore({
          host: configService.getOrThrow('redis.host', { infer: true }),
          port: configService.getOrThrow('redis.port', { infer: true }),
          password: configService.get('redis.password', { infer: true }),
        }),
      };
    },
    isGlobal: true,
    inject: [ConfigService],
  });

  const customModules: ModuleMetadata['imports'] = [
    AuthModule,
    UserModule,
    cacheModule,
    dbModule,
  ];

  return imports.concat(customModules);
}

export default generateModulesSet;
