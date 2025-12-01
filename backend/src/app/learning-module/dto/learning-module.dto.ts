import { IsBoolean, IsEnum, IsNumber, IsString, IsUUID } from "class-validator";

import { Category } from "src/app/learning-module/types/learning-module.interface";

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