import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { FapshiModule } from 'src/common/fapshi/fapshi.module';
import { UserManagementModule } from '../user-management/user-management.module';
import { PaymentsService } from './services/payment.service';
import { PaymentsController } from './controllers/payment.controller';
import { PaymentRepository } from './repositories/payment.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    UserManagementModule,
    FapshiModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentRepository],
  exports: [PaymentsService],
})
export class PaymentsModule {}
