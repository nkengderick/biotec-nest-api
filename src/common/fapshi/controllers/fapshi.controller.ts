import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FapshiService } from '../services/fapshi.service';

@ApiTags('Fapshi') // Groups this controller under the "Fapshi" tag in Swagger
@Controller('fapshi')
export class FapshiController {
  constructor(private readonly fapshiService: FapshiService) {}

  @ApiOperation({
    summary: 'Initiate a payment',
    description: 'Starts the payment process through Fapshi.',
  })
  @ApiResponse({
    status: 200,
    description: 'Payment initiation successful.',
  })
  @Post('initiate')
  async initiatePay(@Body() data: Record<string, any>) {
    return this.fapshiService.initiatePay(data);
  }

  @ApiOperation({
    summary: 'Direct payment processing',
    description: 'Processes a direct payment through Fapshi.',
  })
  @ApiResponse({
    status: 200,
    description: 'Direct payment successful.',
  })
  @Post('direct')
  async directPay(@Body() data: Record<string, any>) {
    return this.fapshiService.directPay(data);
  }

  @ApiOperation({
    summary: 'Check payment status',
    description: 'Retrieves the status of a specific payment transaction.',
  })
  @ApiResponse({
    status: 200,
    description: 'Payment status retrieved successfully.',
  })
  @Get('status/:transId')
  async paymentStatus(@Param('transId') transId: string) {
    return this.fapshiService.paymentStatus(transId);
  }

  @ApiOperation({
    summary: 'Expire a payment',
    description: 'Marks a payment as expired.',
  })
  @ApiResponse({
    status: 200,
    description: 'Payment expired successfully.',
  })
  @Post('expire/:transId')
  async expirePay(@Param('transId') transId: string) {
    return this.fapshiService.expirePay(transId);
  }

  @ApiOperation({
    summary: 'Retrieve user transactions',
    description: 'Fetches all transactions for a specific user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Transactions retrieved successfully.',
  })
  @Get('transactions/:userId')
  async userTrans(@Param('userId') userId: string) {
    return this.fapshiService.userTrans(userId);
  }
}
