import { Injectable } from '@nestjs/common';
import { GetAboutUseCase } from '../use-cases/get-about.use-case';
import { CreateAboutUseCase } from '../use-cases/create-about.use-case';
import { UpdateAboutUseCase } from '../use-cases/update-about.use-case';
import { CreateAboutDto } from '../dto/create-about.dto';
import { UpdateAboutDto } from '../dto/update-about.dto';
import { About } from '../schemas/about.schema';
import { CreateFaqUseCase } from '../use-cases/create-faq.use-case';
import { GetAllFaqsUseCase } from '../use-cases/get-all-faqs.use-case';
import { UpdateFaqUseCase } from '../use-cases/update-faq.use-case';
import { DeleteFaqUseCase } from '../use-cases/delete-faq.use-case';
import { UpdateFaqDto } from '../dto/update-faq.dto';
import { CreateFaqDto } from '../dto/create-faq.dto';

@Injectable()
export class AboutService {
  constructor(
    private readonly getAboutUseCase: GetAboutUseCase,
    private readonly createAboutUseCase: CreateAboutUseCase,
    private readonly updateAboutUseCase: UpdateAboutUseCase,
    private readonly createFaqUseCase: CreateFaqUseCase,
    private readonly getAllFaqsUseCase: GetAllFaqsUseCase,
    private readonly updateFaqUseCase: UpdateFaqUseCase,
    private readonly deleteFaqUseCase: DeleteFaqUseCase,
  ) {}

  async getAbout(): Promise<About> {
    return this.getAboutUseCase.execute();
  }

  async createAbout(createAboutDto: CreateAboutDto): Promise<About> {
    return this.createAboutUseCase.execute(createAboutDto);
  }

  async updateAbout(
    id: string,
    updateAboutDto: UpdateAboutDto,
  ): Promise<About> {
    return this.updateAboutUseCase.execute(id, updateAboutDto);
  }

  async createFaq(createFaqDto: CreateFaqDto) {
    return this.createFaqUseCase.execute(createFaqDto);
  }

  async findAllFaqs() {
    return this.getAllFaqsUseCase.execute();
  }

  async updateFaq(id: string, updateFaqDto: UpdateFaqDto) {
    return this.updateFaqUseCase.execute(id, updateFaqDto);
  }

  async deleteFaq(id: string) {
    return this.deleteFaqUseCase.execute(id);
  }
}
