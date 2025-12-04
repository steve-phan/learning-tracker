import { Test, TestingModule } from '@nestjs/testing';
import { LearningModuleService } from './learning-module.service';
import { LearningModuleRepository } from '../repositories/learning-module.repository';
import { Category, LearningModule } from '../types/learning-module.interface';

describe('LearningModuleService', () => {
  let service: LearningModuleService;

  const mockModules: LearningModule[] = [
    {
      id: '1',
      title: 'Test Module 1',
      category: Category.AI,
      estimatedMinutes: 30,
      completed: false,
    },
    {
      id: '2',
      title: 'Test Module 2',
      category: Category.Sustainability,
      estimatedMinutes: 45,
      completed: true,
    },
  ];

  const mockRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LearningModuleService,
        {
          provide: LearningModuleRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LearningModuleService>(LearningModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of learning modules', () => {
      mockRepository.findAll.mockReturnValue(mockModules);

      const result = service.findAll({});

      expect(result).toEqual(mockModules);
      expect(mockRepository.findAll).toHaveBeenCalled();
    });

    it('should return filtered results from repository when it returns subset', () => {
      mockRepository.findAll.mockReturnValue([mockModules[0]]);

      const result = service.findAll({});

      expect(result).toEqual([mockModules[0]]);
      expect(mockRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a module completion status', () => {
      const id = '1';
      const updateDto = { completed: true };
      const updatedModule = { ...mockModules[0], completed: true };

      mockRepository.update.mockReturnValue(updatedModule);

      const result = service.update(id, updateDto);

      expect(result).toEqual(updatedModule);
      expect(mockRepository.update).toHaveBeenCalledWith(id, updateDto);
    });

    it('should throw if module not found', () => {
      const id = 'not-exist';
      const updateDto = { completed: true };
      mockRepository.update.mockImplementation(() => {
        throw new Error('Learning module not found');
      });

      expect(() => service.update(id, updateDto)).toThrow(
        'Learning module not found',
      );
      expect(mockRepository.update).toHaveBeenCalledWith(id, updateDto);
    });
  });
});
