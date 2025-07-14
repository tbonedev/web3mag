import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { QueueName, TaskName } from 'src/constants/task.constant';
import { EmailQueueService } from './email-queue.service';
import {
  EmailTask,
  VerifyEmailTask,
} from 'src/common/interfaces/email-task.interface';

@Processor(QueueName.EMAIL, {
  concurrency: 1,
  drainDelay: 300,
  stalledInterval: 300000,
  removeOnComplete: {
    age: 86400,
    count: 100,
  },
  limiter: {
    max: 1,
    duration: 150,
  },
})
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);
  constructor(private readonly emailQueueService: EmailQueueService) {
    super();
  }

  async process(
    task: Job<EmailTask, any, string>,
    _token?: string,
  ): Promise<any> {
    this.logger.debug(
      `Processing job ${task.id} of type ${task.name} with data ${JSON.stringify(task.data)}...`,
    );

    switch (task.name) {
      case TaskName.EMAIL_VERIFICATION.toString():
        return await this.emailQueueService.sendEmailVerification(
          task.data as unknown as VerifyEmailTask,
        );
      default:
        throw new Error(`Unknown job name: ${task.name}`);
    }
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    this.logger.debug(`Job ${job.id} is now active`);
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    this.logger.debug(`Job ${job.id} is ${job.progress}% complete`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.debug(`Job ${job.id} has been completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    this.logger.error(
      `Job ${job.id} has failed with reason: ${job.failedReason}`,
    );
    this.logger.error(job.stacktrace);
  }

  @OnWorkerEvent('stalled')
  onStalled(job: Job) {
    this.logger.error(`Job ${job.id} has been stalled`);
  }

  @OnWorkerEvent('error')
  onError(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} has failed with error: ${error.message}`);
  }
}
