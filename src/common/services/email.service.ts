import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailTemplateService } from './email-template.service';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly emailTemplateService: EmailTemplateService) {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
    });

    this.transporter
      .verify()
      .then(() => this.logger.log('SMTP connection established successfully'))
      .catch((err) =>
        this.logger.error(`SMTP connection failed: ${err.message}`),
      );
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: `"BioTec Universe" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent to ${to} (Message ID: ${info.messageId})`);
      return info;
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async sendTemplatedEmail(
    to: string,
    subject: string,
    templateName: string,
    templateData: any,
  ) {
    // Generate HTML content from template - now properly awaiting the async method
    const html = await this.emailTemplateService.render(
      templateName,
      templateData,
    );

    // Generate plain text as fallback
    const text = this.generatePlainTextVersion(templateData);

    return this.sendMail(to, subject, text, html);
  }

  private generatePlainTextVersion(data: any): string {
    // Generate a plain text version based on the template data
    let text = `Dear ${data.userName || 'User'},\n\n`;

    if (data.emailContent) {
      // Strip HTML tags for plain text
      text += data.emailContent.replace(/<[^>]*>/g, '') + '\n\n';
    }

    if (data.actionRequired && data.actionUrl) {
      text += `${data.actionText || 'Click here'}: ${data.actionUrl}\n\n`;
    }

    text +=
      "If you have any questions or need assistance, please don't hesitate to contact our support team.\n\n";
    text += 'Best regards,\nBioTec Universe Team\n\n';
    text += `© ${new Date().getFullYear()} BioTec Universe. All rights reserved.`;

    return text;
  }
}
