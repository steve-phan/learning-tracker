import { Module } from '@nestjs/common';

import { LearningModuleModule } from './learning-module/learning-module.module';

@Module({
  imports: [LearningModuleModule],
  controllers: [],
})
export class AppModule {}
