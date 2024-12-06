import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PaymentsService } from '../services/payment.service';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { VerifyPaymentDto } from '../dtos/verify-payment.dto';

@ApiTags('Payments') // Groups the controller under the "Payments" category in Swagger
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * Endpoint to initiate a new payment
   * @param createPaymentDto
   */
  @ApiOperation({ summary: 'Initiate a new payment' })
  @ApiResponse({
    status: 201,
    description: 'The payment was successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error or invalid data provided.',
  })
  @ApiBody({ type: CreatePaymentDto })
  @Post('make')
  async makePayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.makePayment(createPaymentDto);
  }

  /**
   * Endpoint to verify the status of a payment
   * @param verifyPaymentDto
   */
  @ApiOperation({ summary: 'Verify the status of an existing payment' })
  @ApiResponse({
    status: 200,
    description: 'Payment status successfully verified.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error or invalid transaction details.',
  })
  @ApiBody({ type: VerifyPaymentDto })
  @Post('verify')
  async verifyPayment(@Body() verifyPaymentDto: VerifyPaymentDto) {
    return this.paymentsService.verifyPayment(verifyPaymentDto);
  }
}
