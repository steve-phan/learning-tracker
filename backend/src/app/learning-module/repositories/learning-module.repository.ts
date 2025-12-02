import { Injectable } from '@nestjs/common';

import { LearningModule } from 'src/app/learning-module/types/learning-module.interface';
import {
  LearningModuleDto,
  LearningModuleQueryParamsDto,
  LearningModulesReponseDto,
  UpdateLearningModuleDto,
} from '../dto/learning-module.dto';
import { initialLearningModules } from '../__MOCK_DATA__/seed';

@Injectable()
export class LearningModuleRepository {
  private learningModules: LearningModule[] = [];

  constructor() {
    this.learningModules = initialLearningModules;
  }

  findAll({
    category,
    page = 0,
    pageSize = 10,
  }: LearningModuleQueryParamsDto): LearningModulesReponseDto {
    let result = [...this.learningModules];

    if (category) {
      result = result.filter((lm) => lm.category === category);
    }

    const total = result.length;
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return {
      total,
      modules: result.slice(startIndex, endIndex),
    };
  }

  findOne(id: string): LearningModule {
    const learningModule = this.learningModules.find((lm) => lm.id === id);
    if (!learningModule) {
      throw new Error('Learning module not found');
    }
    return learningModule;
  }

  update(id: string, learningModule: UpdateLearningModuleDto): LearningModule {
    const index = this.learningModules.findIndex((lm) => lm.id === id);
    if (index === -1) {
      throw new Error('Learning module not found');
    }
    this.learningModules[index] = {
      ...this.learningModules[index],
      ...learningModule,
    };
    return this.learningModules[index];
  }
}
