import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { GetAboutUseCase } from 'src/modules/about/use-cases/get-about.use-case';

@Injectable()
export class EmailTemplateService {
  private readonly logger = new Logger(EmailTemplateService.name);
  private readonly templatesDir: string;
  private readonly compiledTemplates: Map<string, HandlebarsTemplateDelegate> =
    new Map();

  constructor(private readonly getAboutUseCase: GetAboutUseCase) {
    // Path to the templates directory - adjust as needed
    this.templatesDir = path.join(process.cwd(), 'src/common/templates');
    this.initializeTemplates();
  }

  private initializeTemplates() {
    try {
      // Make sure the templates directory exists
      if (!fs.existsSync(this.templatesDir)) {
        fs.mkdirSync(this.templatesDir, { recursive: true });
        this.logger.log(`Created templates directory at ${this.templatesDir}`);
      }

      // Register Handlebars helpers if needed
      Handlebars.registerHelper('ifCond', function (v1, v2, options) {
        if (v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      });

      // Preload and compile template
      this.loadTemplate('main');
      this.loadTemplate('reset-password');
      this.loadTemplate('accept-application');
      this.loadTemplate('reject-application');
      this.loadTemplate('role-update');
      this.loadTemplate('application-confirmation');
      this.loadTemplate('new-applicant-notification');
      this.loadTemplate('event-registration');
      this.loadTemplate('service-booking');
      this.loadTemplate('welcome-email');
      // ... more templates
    } catch (error) {
      this.logger.error(`Failed to initialize templates: ${error.message}`);
    }
  }

  private loadTemplate(templateName: string) {
    try {
      const templatePath = path.join(this.templatesDir, `${templateName}.hbs`);

      if (!fs.existsSync(templatePath)) {
        this.logger.warn(
          `Template ${templateName} not found at ${templatePath}`,
        );
        return;
      }

      const templateSource = fs.readFileSync(templatePath, 'utf8');
      const compiledTemplate = Handlebars.compile(templateSource);

      this.compiledTemplates.set(templateName, compiledTemplate);
      this.logger.log(`Loaded and compiled template: ${templateName}`);
    } catch (error) {
      this.logger.error(
        `Failed to load template ${templateName}: ${error.message}`,
      );
    }
  }

  private async getOrganizationDetails() {
    try {
      const about = await this.getAboutUseCase.execute();
      if (!about) {
        this.logger.warn('No About document found.');
        return {};
      }

      return {
        logoUrl: about.logo_url || 'src/assets/logo.png',
        organizationAddress: about.address || 'Your Address Here',
        organizationEmail:
          about.contact_email || process.env.ORGANIZATION_EMAIL,
        linkedinUrl: about.social_links?.linkedin || '#',
        twitterUrl: about.social_links?.twitter || '#',
        facebookUrl: about.social_links?.facebook || '#',
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch organization details: ${error.message}`,
      );
      return {};
    }
  }

  async render(templateName: string, data: any): Promise<string> {
    try {
      // Ensure the main template is always loaded
      let mainTemplate = this.compiledTemplates.get('main');
      if (!mainTemplate) {
        this.loadTemplate('main');
        mainTemplate = this.compiledTemplates.get('main');
        if (!mainTemplate) {
          throw new Error('Main template not found');
        }
      }

      // Load the specific email template (e.g., reset-password, welcome-email)
      let contentTemplate = this.compiledTemplates.get(templateName);
      if (!contentTemplate) {
        this.loadTemplate(templateName);
        contentTemplate = this.compiledTemplates.get(templateName);
        if (!contentTemplate) {
          throw new Error(`Template ${templateName} not found`);
        }
      }

      // Fetch organization details dynamically
      const organizationDetails = await this.getOrganizationDetails();

      // Render the inner content template first
      const emailContent = contentTemplate(data);

      // Combine all necessary data for the main template
      const enhancedData = {
        ...data,
        emailContent, // Inject the rendered content template
        currentYear: new Date().getFullYear(),
        websiteUrl: process.env.FRONTEND_URL || '#',
        contactUrl: `${process.env.FRONTEND_URL}/contact` || '#',
        privacyUrl: `${process.env.FRONTEND_URL}/privacy-policy` || '#',
        ...organizationDetails,
      };

      // Render the final email using the main template
      return mainTemplate(enhancedData);
    } catch (error) {
      this.logger.error(
        `Failed to render template ${templateName}: ${error.message}`,
      );

      // Provide a fallback email format if rendering fails
      return `
        <p>Dear ${data.userName || 'User'},</p>
        <p>${data.emailContent || 'An error occurred while generating this email.'}</p>
        <p>Best regards,<br>BioTec Universe Team</p>
      `;
    }
  }
}
