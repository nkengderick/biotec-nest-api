import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Faq extends Document {
  @ApiProperty({
    description: 'The question being asked in the FAQ',
    example: 'What is NestJS?',
  })
  @Prop({ type: String, required: true })
  question: string;

  @ApiProperty({
    description: 'The answer to the FAQ question',
    example:
      'NestJS is a framework for building efficient, scalable Node.js server-side applications.',
  })
  @Prop({ type: String, required: true })
  answer: string;

  @ApiProperty({
    description: 'The category the FAQ belongs to',
    example: 'Technology',
  })
  @Prop({ type: String, required: true })
  category: string;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);
