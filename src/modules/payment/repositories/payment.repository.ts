import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from '../schemas/payment.schema';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { PaymentStatus } from '../enums/payment-status.enum';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
  ) {}

  /**
   * Create a new payment record
   * @param createPaymentDto
   */
  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = new this.paymentModel({
      ...createPaymentDto,
      status: PaymentStatus.PENDING,
    });
    return payment.save();
  }

  /**
   * Find a payment by its ID
   * @param id
   */
  async findById(id: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(id).populate('userId');
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found.`);
    }
    return payment;
  }

  /**
   * Find a payment by transaction ID and external ID
   * @param transactionId
   * @param externalId
   */
  async findByTransactionAndExternalId(
    transactionId: string,
    externalId: string,
  ): Promise<Payment> {
    const payment = await this.paymentModel
      .findOne({
        transactionId,
        externalId,
      })
      .populate('userId');
    if (!payment) {
      throw new NotFoundException(
        `Payment with Transaction ID ${transactionId} and External ID ${externalId} not found.`,
      );
    }
    return payment;
  }

  /**
   * Find all payments for a specific user
   * @param userId
   */
  async findByUserId(userId: string): Promise<Payment[]> {
    return this.paymentModel.find({ userId }).populate('userId').exec();
  }

  /**
   * Update the status of a payment
   * @param id
   * @param status
   */
  async updateStatus(id: string, status: PaymentStatus): Promise<Payment> {
    const payment = await this.findById(id);
    payment.status = status;
    return payment.save();
  }

  /**
   * Delete a payment record
   * @param id
   */
  async delete(id: string): Promise<void> {
    const result = await this.paymentModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Payment with ID ${id} not found.`);
    }
  }
}
