import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingestion } from './ingestion.entity';

@Injectable()
export class IngestionService {
  constructor(
    @InjectRepository(Ingestion)
    private ingestionRepository: Repository<Ingestion>,
  ) {}

  async triggerIngestion(triggeredBy: string) {
    const ingestion = this.ingestionRepository.create({ status: 'in-progress', triggeredBy });
    return this.ingestionRepository.save(ingestion);
  }

  async getAllIngestions() {
    return this.ingestionRepository.find();
  }

  async getIngestionById(id: string) {
    const ingestion = await this.ingestionRepository.findOne({ where: { id } });
    if (!ingestion) throw new NotFoundException('Ingestion not found');
    return ingestion;
  }

  async updateIngestionStatus(id: string, status: string, errorMessage?: string) {
    const ingestion = await this.getIngestionById(id);
    ingestion.status = status;
    if (errorMessage) ingestion.errorMessage = errorMessage;
    return this.ingestionRepository.save(ingestion);
  }
}
