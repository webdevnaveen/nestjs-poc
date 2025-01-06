import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from './document.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockDocumentRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

describe('DocumentsService', () => {
  let documentsService: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        {
          provide: getRepositoryToken(Document),
          useValue: mockDocumentRepository,
        },
      ],
    }).compile();

    documentsService = module.get<DocumentsService>(DocumentsService);
  });

  it('should create a new document', async () => {
    const documentDto = { title: 'Test Document', description: 'Test Description', filePath: 'path/to/file', uploadedBy: 'admin' };
    const newDocument = { id: '1', ...documentDto };

    mockDocumentRepository.create.mockReturnValue(newDocument);
    mockDocumentRepository.save.mockResolvedValue(newDocument);

    const result = await documentsService.createDocument(documentDto);
    expect(result).toEqual(newDocument);
    expect(mockDocumentRepository.create).toHaveBeenCalledWith(documentDto);
    expect(mockDocumentRepository.save).toHaveBeenCalledWith(newDocument);
  });

  it('should return all documents', async () => {
    const documents = [
      { id: '1', title: 'Test Document 1', description: 'Description 1', filePath: 'path/to/file1', uploadedBy: 'admin' },
      { id: '2', title: 'Test Document 2', description: 'Description 2', filePath: 'path/to/file2', uploadedBy: 'admin' },
    ];
    mockDocumentRepository.find.mockResolvedValue(documents);

    const result = await documentsService.getAllDocuments();
    expect(result).toEqual(documents);
    expect(mockDocumentRepository.find).toHaveBeenCalled();
  });

  it('should return document by id', async () => {
    const document = { id: '1', title: 'Test Document', description: 'Test Description', filePath: 'path/to/file', uploadedBy: 'admin' };
    mockDocumentRepository.findOne.mockResolvedValue(document);

    const result = await documentsService.getDocumentById('1');
    expect(result).toEqual(document);
    expect(mockDocumentRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should throw an error if document not found by id', async () => {
    mockDocumentRepository.findOne.mockResolvedValue(null);

    await expect(documentsService.getDocumentById('1')).rejects.toThrow(NotFoundException);
    await expect(documentsService.getDocumentById('1')).rejects.toThrow('Document not found');
  });

  it('should update document', async () => {
    const document = { id: '1', title: 'Test Document', description: 'Test Description', filePath: 'path/to/file', uploadedBy: 'admin' };
    const updateDto = { title: 'Updated Document' };
    const updatedDocument = { ...document, ...updateDto };

    mockDocumentRepository.findOne.mockResolvedValue(document);
    mockDocumentRepository.save.mockResolvedValue(updatedDocument);

    const result = await documentsService.updateDocument('1', updateDto);
    expect(result).toEqual(updatedDocument);
    expect(mockDocumentRepository.save).toHaveBeenCalledWith(updatedDocument);
  });

  it('should delete document', async () => {
    const document = { id: '1', title: 'Test Document', description: 'Test Description', filePath: 'path/to/file', uploadedBy: 'admin' };

    mockDocumentRepository.findOne.mockResolvedValue(document);
    mockDocumentRepository.remove.mockResolvedValue(document);

    const result = await documentsService.deleteDocument('1');
    expect(result).toEqual(document);
    expect(mockDocumentRepository.remove).toHaveBeenCalledWith(document);
  });
});
