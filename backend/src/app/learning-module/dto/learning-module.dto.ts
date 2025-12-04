/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
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

export class LearningModuleQueryParamsDto {
  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsEnum(Category)
  category?: Category;

  @IsOptional()
  @Transform(({ value }) =>
    value === undefined || value === null || value === ''
      ? undefined
      : Number(value),
  )
  @IsInt()
  @Min(0)
  page?: number;

  @IsOptional()
  @Transform(({ value }) =>
    value === undefined || value === null || value === ''
      ? undefined
      : Number(value),
  )
  @IsInt()
  @Min(1)
  pageSize?: number;
}

export class LearningModulesReponseDto {
  @IsNumber()
  total: number;

  @IsArray()
  modules: LearningModuleDto[];
}
