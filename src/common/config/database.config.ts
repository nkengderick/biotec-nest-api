import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getDatabaseConfig = (): MongooseModuleOptions => ({
  uri: process.env.MONGO_DB_URI,
});
