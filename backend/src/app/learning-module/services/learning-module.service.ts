import { Injectable } from '@nestjs/common';

import {
  LearningModuleDto,
  UpdateLearningModuleDto,
} from '../dto/learning-module.dto';
import { LearningModuleRepository } from '../repositories/learning-module.repository';
import { LearningModule } from 'src/app/learning-module/types/learning-module.interface';

@Injectable()
export class LearningModuleService {
  constructor(
    private readonly learningModuleRepository: LearningModuleRepository,
  ) {}

  findAll(): LearningModuleDto[] {
    return this.learningModuleRepository.findAll();
  }

  update(id: string, updateLearningModuleDto): LearningModule {
    return this.learningModuleRepository.update(id, updateLearningModuleDto);
  }
}
