import { Injectable } from '@nestjs/common';

import {
  LearningModuleQueryParamsDto,
  LearningModulesReponseDto,
  UpdateLearningModuleDto,
} from '../dto/learning-module.dto';
import { LearningModuleRepository } from '../repositories/learning-module.repository';
import { LearningModule } from 'src/app/learning-module/types/learning-module.interface';

@Injectable()
export class LearningModuleService {
  constructor(
    private readonly learningModuleRepository: LearningModuleRepository,
  ) {}

  findAll(params: LearningModuleQueryParamsDto): LearningModulesReponseDto {
    return this.learningModuleRepository.findAll(params);
  }

  update(
    id: string,
    updateLearningModuleDto: UpdateLearningModuleDto,
  ): LearningModule {
    return this.learningModuleRepository.update(id, updateLearningModuleDto);
  }
}
