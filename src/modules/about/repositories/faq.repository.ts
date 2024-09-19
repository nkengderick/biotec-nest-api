import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { Faq } from '../schemas/faq.schema';
import { UpdateFaqDto } from '../dto/update-faq.dto';

@Injectable()
export class FaqRepository {
  constructor(@InjectModel(Faq.name) private readonly faqModel: Model<Faq>) {}

  // Create a new FAQ
  async createFaq(createFaqDto: CreateFaqDto): Promise<Faq> {
    const createdFaq = new this.faqModel(createFaqDto);
    return createdFaq.save();
  }

  // Find all FAQs
  async findAllFaqs(): Promise<Faq[]> {
    return this.faqModel.find().exec();
  }

  // Find a specific FAQ by its ID
  async findFaqById(id: string): Promise<Faq> {
    return this.faqModel.findById(id).exec();
  }

  // Update an FAQ by its ID
  async updateFaq(id: string, updateFaqDto: UpdateFaqDto): Promise<Faq> {
    return this.faqModel
      .findByIdAndUpdate(id, updateFaqDto, { new: true })
      .exec();
  }

  // Delete an FAQ by its ID
  async deleteFaq(id: string): Promise<any> {
    return this.faqModel.findByIdAndDelete(id).exec();
  }
}
