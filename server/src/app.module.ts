import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/schemas/user.schema';
import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'user',
        password: '123',
        database: 'web3mag',
        entities: [User],
        synchronize: true, // should be turn off on prod!
      }),
    }),
    TokenModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, TokenService],
})
export class AppModule {}
