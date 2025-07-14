import {
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { QueueName } from 'src/constants/task.constant';

@QueueEventsListener(QueueName.EMAIL, { blockingTimeout: 300000 })
export class EmailQueueEvents extends QueueEventsHost {
  private readonly logger = new Logger(EmailQueueEvents.name);

  @OnQueueEvent('added')
  onAdded(task: { taskId: string; name: string }) {
    this.logger.debug(`Job ${task.taskId} is waiting`);
  }

  @OnQueueEvent('waiting')
  onWaiting(job: { jobId: string; prev?: string }) {
    this.logger.debug(`Job ${job.jobId} is waiting`);
  }
}
