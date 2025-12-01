import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';

import { LearningModuleService } from '../services/learning-module.service';
import {
  LearningModuleDto,
  UpdateLearningModuleDto,
} from '../dto/learning-module.dto';

@Controller('api/modules')
export class LearningModuleController {
  constructor(private readonly learningModuleService: LearningModuleService) {}

  @Get()
  findAll(): LearningModuleDto[] {
    //TODO: pagination, filtering
    return this.learningModuleService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLearningModuleDto: UpdateLearningModuleDto,
  ) {
    try {
      return this.learningModuleService.update(id, updateLearningModuleDto);
    } catch (error) {
      throw new HttpException(
        'Learning module not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
