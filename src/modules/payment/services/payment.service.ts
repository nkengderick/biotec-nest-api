import { Injectable, BadRequestException } from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment.repository';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { VerifyPaymentDto } from '../dtos/verify-payment.dto';
import { FapshiService } from 'src/common/fapshi/services/fapshi.service';
import { PaymentStatus } from '../enums/payment-status.enum';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly fapshiService: FapshiService,
  ) {}

  /**
   * Make a new payment
   * @param createPaymentDto
   */
  async makePayment(createPaymentDto: CreatePaymentDto) {
    const { externalId, amount, email, message } = createPaymentDto;

    // Check for duplicate externalId
    const existingPayment = await this.paymentRepository
      .findByTransactionAndExternalId(null, externalId)
      .catch(() => null);
    if (existingPayment) {
      throw new BadRequestException(
        'Payment with this external ID already exists.',
      );
    }

    // Create the payment record in the database
    const payment = await this.paymentRepository.create({
      ...createPaymentDto,
    });

    // Initiate payment with Fapshi
    const response = await this.fapshiService.initiatePay({
      amount,
      email,
      externalId,
      message,
    });

    console.log(response);

    // Update payment with the transaction ID and date initiated from Fapshi
    payment.transactionId = response.transId;
    payment.dateInitiated = response.dateInitiated; // Add dateInitiated here
    await payment.save();

    await this.paymentRepository.updateStatus(
      payment.id,
      PaymentStatus.PENDING,
    );

    // Return the payment link to the client
    return {
      message: response.message,
      link: response.link, // Redirect link for the frontend
      transactionId: response.transId,
      dateInitiated: response.dateInitiated, // Include dateInitiated in the response
    };
  }

  /**
   * Verify the status of a payment
   * @param verifyPaymentDto
   */
  async verifyPayment(verifyPaymentDto: VerifyPaymentDto) {
    const { transactionId, externalId } = verifyPaymentDto;

    // Retrieve the payment record
    const payment = await this.paymentRepository.findByTransactionAndExternalId(
      transactionId,
      externalId,
    );

    // Check payment status with Fapshi
    const response = await this.fapshiService.paymentStatus(transactionId);

    // Update payment status in the database
    payment.status = response.status;
    payment.paymentMethod = response.medium;
    payment.dateConfirmed = response.dateConfirmed;

    await payment.save();

    return {
      message: `Payment status: ${response.status}`,
      details: response,
    };
  }
}
