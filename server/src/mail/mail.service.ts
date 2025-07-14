import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly mailerService: MailerService,
  ) {}

  async sendEmailVerification(email: string, token: string) {
    // Please replace the URL with your own frontend URL

    const url = `${this.configService.get('app.url', { infer: true })}/api/v1/auth/verify/email?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Verification',
      template: 'email-verification',
      context: {
        email: email,
        url,
      },
    });
  }
}
