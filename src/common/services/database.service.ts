import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  async onModuleInit() {
    try {
      await mongoose.connect(process.env.MONGO_DB_URI, {});
      this.logger.log('Database connected successfully');
    } catch (error) {
      this.logger.error('Failed to connect to the database', error.stack);
      process.exit(1);
    }
  }
}
