import { Optional } from '@nestjs/common';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

import { Category } from 'src/app/learning-module/types/learning-module.interface';

export class UpdateLearningModuleDto {
  @IsBoolean()
  completed: boolean;
}

export class LearningModuleDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsEnum(Category)
  category: Category;

  @IsNumber()
  estimatedMinutes: number;

  @IsBoolean()
  completed: boolean;
}

// query params dto, like for filtering by category could be added here in the future
export class LearningModuleQueryParamsDto {
  @IsEnum(Category)
  category?: Category;

  @Optional()
  @IsNumber()
  page?: number;

  @Optional()
  @IsNumber()
  pageSize?: number;
}

export class LearningModulesReponseDto {
  @IsNumber() total: number;

  @IsArray()
  modules: LearningModuleDto[];
}
