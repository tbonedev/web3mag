import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { VerifyEmailTask } from 'src/common/interfaces/email-task.interface';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class EmailQueueService {
  private readonly logger = new Logger(EmailQueueService.name);

  constructor(private readonly mailService: MailService) {}

  async sendEmailVerification(data: VerifyEmailTask): Promise<void> {
    this.logger.debug(`Sending email verification to ${data.email}`);
    await this.mailService.sendEmailVerification(data.email, data.token);
  }
}
