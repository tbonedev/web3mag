import { Module } from '@nestjs/common';
import { EmailQueueService } from './email-queue.service';
import { EmailQueueEvents } from './email-queue.events';
import { EmailProcessor } from './email.processor';

@Module({
  providers: [EmailQueueService, EmailQueueEvents, EmailProcessor],
})
export class EmailQueueModule {}
