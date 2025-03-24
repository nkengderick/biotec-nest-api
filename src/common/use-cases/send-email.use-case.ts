import { Injectable } from '@nestjs/common';
import { EmailService } from '../services/email.service';

@Injectable()
export class SendEmailUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(to: string, subject: string, text: string, html?: string) {
    return this.emailService.sendMail(to, subject, text, html);
  }

  async executeTemplated(
    to: string,
    subject: string,
    templateName: string,
    templateData: any,
  ) {
    return this.emailService.sendTemplatedEmail(
      to,
      subject,
      templateName,
      templateData,
    );
  }
}
