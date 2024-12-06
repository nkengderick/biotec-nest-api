import { Controller, Post, Body } from '@nestjs/common';
import { FapshiService } from '../services/fapshi.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly fapshiService: FapshiService) {}

  @Post('fapshi')
  async handleWebhook(@Body() payload: any) {
    const event = await this.fapshiService.paymentStatus(payload.transId);

    switch (event.status) {
      case 'SUCCESSFUL':
        console.log('Payment Successful', event);
        break;
      case 'FAILED':
        console.log('Payment Failed', event);
        break;
      case 'EXPIRED':
        console.log('Payment Expired', event);
        break;
      default:
        console.log('Unhandled Status', event.status);
    }

    return { received: true };
  }
}
