import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bullmq';
import { QueueName, QueuePrefix } from 'src/constants/task.constant';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({}),
    BullModule.registerQueue({
      name: QueueName.EMAIL,
      prefix: QueuePrefix.AUTH,
      streams: {
        events: {
          maxLen: 1000,
        },
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
