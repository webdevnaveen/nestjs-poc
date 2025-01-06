import { Controller, Post, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { DocumentsService } from './document.service';

@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Post()
  createDocument(@Body() documentDto: { title: string; description: string; filePath: string; uploadedBy: string }) {
    return this.documentsService.createDocument(documentDto);
  }

  @Get()
  getAllDocuments() {
    return this.documentsService.getAllDocuments();
  }

  @Get(':id')
  getDocumentById(@Param('id') id: string) {
    return this.documentsService.getDocumentById(id);
  }

  @Patch(':id')
  updateDocument(@Param('id') id: string, @Body() updateDto: Partial<Document>) {
    return this.documentsService.updateDocument(id, updateDto);
  }

  @Delete(':id')
  deleteDocument(@Param('id') id: string) {
    return this.documentsService.deleteDocument(id);
  }
}
