import { Module } from '@nestjs/common';
import { EmailQueueService } from './email-queue.service';
import { EmailQueueEvents } from './email-queue.events';
import { EmailProcessor } from './email.processor';
import { BullModule } from '@nestjs/bullmq';
import { QueueName, QueuePrefix } from 'src/constants/task.constant';

@Module({
  imports: [
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
  providers: [EmailQueueService, EmailQueueEvents, EmailProcessor],
})
export class EmailQueueModule {}
