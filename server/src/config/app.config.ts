import { registerAs } from '@nestjs/config';
import { AppConfig } from './app.config.type';
import { Environment, LogService } from 'src/constants/app.constant';

// Временно убираем валидацию, чтобы изолировать проблему.
// Вся логика теперь находится внутри фабрики.

export const appConfig = registerAs<AppConfig>('app', () => {
  // Проверяем, доступен ли process.env
  if (!process || !process.env) {
    console.error(
      'КРИТИЧЕСКАЯ ОШИБКА: process.env не доступен в app.config.ts!',
    );
    // Возвращаем объект по умолчанию, чтобы избежать падения
    return {
      nodeEnv: Environment.DEVELOPMENT,
      name: 'app',
      port: 3000,
      url: 'http://localhost:3000',
      apiPrefix: 'api',
      debug: false,
      fallbackLanguage: 'en',
      logLevel: 'info',
      logService: LogService.CONSOLE,
      corsOrigin: false,
    };
  }

  const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000;

  // Возвращаем упрощенную, но рабочую конфигурацию
  return {
    nodeEnv: process.env.NODE_ENV || Environment.DEVELOPMENT,
    name: process.env.APP_NAME || 'app',
    url: process.env.APP_URL || `http://localhost:${port}`,
    port,
    debug: process.env.APP_DEBUG === 'true',
    apiPrefix: process.env.API_PREFIX || 'api',
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    logLevel: process.env.APP_LOG_LEVEL || 'warn',
    logService: process.env.APP_LOG_SERVICE || LogService.CONSOLE,
    corsOrigin: process.env.APP_CORS_ORIGIN || false,
  };
});
