import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common';

import { LearningModuleService } from '../services/learning-module.service';
import {
  LearningModuleQueryParamsDto,
  LearningModulesReponseDto,
  UpdateLearningModuleDto,
} from '../dto/learning-module.dto';

@Controller('api/modules')
export class LearningModuleController {
  constructor(private readonly learningModuleService: LearningModuleService) {}

  @Get()
  findAll(
    @Query() params: LearningModuleQueryParamsDto,
  ): LearningModulesReponseDto {
    return this.learningModuleService.findAll(params);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLearningModuleDto: UpdateLearningModuleDto,
  ) {
    try {
      return this.learningModuleService.update(id, updateLearningModuleDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Learning module not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
