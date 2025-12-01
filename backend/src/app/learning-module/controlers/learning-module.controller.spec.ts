import { Test, TestingModule } from '@nestjs/testing';
import { LearningModuleController } from './learning-module.controller';
import { LearningModuleService } from '../services/learning-module.service';
import { LearningModuleDto } from '../dto/learning-module.dto';
import { Category } from '../types/learning-module.interface';

describe('LearningModuleController', () => {
  let controller: LearningModuleController;
  const mockModules: LearningModuleDto[] = [
    {
      id: '1',
      title: 'M1',
      category: Category.AI,
      estimatedMinutes: 30,
      completed: false,
    },
  ];

  const mockService = {
    findAll: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningModuleController],
      providers: [{ provide: LearningModuleService, useValue: mockService }],
    }).compile();

    controller = module.get<LearningModuleController>(LearningModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('returns modules from service', () => {
      mockService.findAll.mockReturnValue(mockModules);
      const result = controller.findAll();
      expect(result).toEqual(mockModules);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('returns updated module on success', () => {
      const updated = { ...mockModules[0], completed: true };
      mockService.update.mockReturnValue(updated);

      const result = controller.update('1', { completed: true });
      expect(result).toEqual(updated);
      expect(mockService.update).toHaveBeenCalledWith('1', { completed: true });
    });

    it('throws HttpException when service throws', () => {
      mockService.update.mockImplementation(() => {
        throw new Error('Not found');
      });

      try {
        controller.update('nope', { completed: true });
        // should not reach
        expect(false).toBeTruthy();
      } catch (err) {
        expect(err.status).toBeDefined();
      }
    });
  });
});
