import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
