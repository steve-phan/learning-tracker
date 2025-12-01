import { Module } from "@nestjs/common";

import { LearningModuleService } from "./services/learning-module.service";
import { LearningModuleController } from "./controlers/learning-module.controller";
import { LearningModuleRepository } from "./repositories/learning-module.repository";

@Module({
    controllers: [LearningModuleController],    
    providers: [LearningModuleService, LearningModuleRepository],
    exports: [LearningModuleService]
})
export class LearningModuleModule {}