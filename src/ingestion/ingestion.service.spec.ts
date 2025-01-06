import { Test, TestingModule } from '@nestjs/testing';
import { IngestionService } from './ingestion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ingestion } from './ingestion.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockIngestionRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
};

describe('IngestionService', () => {
  let ingestionService: IngestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngestionService,
        {
          provide: getRepositoryToken(Ingestion),
          useValue: mockIngestionRepository,
        },
      ],
    }).compile();

    ingestionService = module.get<IngestionService>(IngestionService);
  });

  it('should trigger ingestion and save it', async () => {
    const triggeredBy = 'admin';
    const newIngestion = { id: '1', status: 'in-progress', triggeredBy };
    
    mockIngestionRepository.create.mockReturnValue(newIngestion);
    mockIngestionRepository.save.mockResolvedValue(newIngestion);

    const result = await ingestionService.triggerIngestion(triggeredBy);
    expect(result).toEqual(newIngestion);
    expect(mockIngestionRepository.create).toHaveBeenCalledWith({ status: 'in-progress', triggeredBy });
    expect(mockIngestionRepository.save).toHaveBeenCalledWith(newIngestion);
  });

  it('should return all ingestions', async () => {
    const ingestions = [
      { id: '1', status: 'completed', triggeredBy: 'admin' },
      { id: '2', status: 'in-progress', triggeredBy: 'admin' },
    ];
    mockIngestionRepository.find.mockResolvedValue(ingestions);

    const result = await ingestionService.getAllIngestions();
    expect(result).toEqual(ingestions);
    expect(mockIngestionRepository.find).toHaveBeenCalled();
  });

  it('should return ingestion by id', async () => {
    const ingestion = { id: '1', status: 'completed', triggeredBy: 'admin' };
    mockIngestionRepository.findOne.mockResolvedValue(ingestion);

    const result = await ingestionService.getIngestionById('1');
    expect(result).toEqual(ingestion);
    expect(mockIngestionRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should throw an error if ingestion is not found by id', async () => {
    mockIngestionRepository.findOne.mockResolvedValue(null);

    await expect(ingestionService.getIngestionById('1')).rejects.toThrow(NotFoundException);
    await expect(ingestionService.getIngestionById('1')).rejects.toThrow('Ingestion not found');
  });

  it('should update ingestion status', async () => {
    const ingestion = { id: '1', status: 'in-progress', triggeredBy: 'admin' };
    const updatedIngestion = { ...ingestion, status: 'completed', errorMessage: 'error' };
    
    mockIngestionRepository.findOne.mockResolvedValue(ingestion);
    mockIngestionRepository.save.mockResolvedValue(updatedIngestion);

    const result = await ingestionService.updateIngestionStatus('1', 'completed', 'error');
    expect(result).toEqual(updatedIngestion);
    expect(mockIngestionRepository.save).toHaveBeenCalledWith(updatedIngestion);
  });

  it('should update ingestion status without error message', async () => {
    const ingestion = { id: '1', status: 'in-progress', triggeredBy: 'admin' };
    const updatedIngestion = { ...ingestion, status: 'completed' };
    
    mockIngestionRepository.findOne.mockResolvedValue(ingestion);
    mockIngestionRepository.save.mockResolvedValue(updatedIngestion);

    const result = await ingestionService.updateIngestionStatus('1', 'completed');
    expect(result).toEqual(updatedIngestion);
    expect(mockIngestionRepository.save).toHaveBeenCalledWith(updatedIngestion);
  });
});
