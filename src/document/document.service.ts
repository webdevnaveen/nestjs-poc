import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async createDocument(documentDto: { title: string; description: string; filePath: string; uploadedBy: string }) {
    const document = this.documentRepository.create(documentDto);
    return this.documentRepository.save(document);
  }

  async getAllDocuments() {
    return this.documentRepository.find();
  }

  async getDocumentById(id: string) {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) throw new NotFoundException('Document not found');
    return document;
  }

  async updateDocument(id: string, updateDto: Partial<Document>) {
    const document = await this.getDocumentById(id);
    Object.assign(document, updateDto);
    return this.documentRepository.save(document);
  }

  async deleteDocument(id: string) {
    const document = await this.getDocumentById(id);
    return this.documentRepository.remove(document);
  }
}
