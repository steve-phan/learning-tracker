//TODO: openAPI types generation?
export enum LearningModuleCategory {
  AI = 'AI',
  Sustainability = 'Sustainability',
  DigitalSkills = 'Digital Skills',
}

export interface LearningModule {
  id: string;
  title: string;
  category: LearningModuleCategory;
  estimatedMinutes: number;
  completed: boolean;
}

export interface LearningModulesResponse {
  total: number;
  modules: LearningModule[];
}

export interface LearningModulesQueryParams {
  category?: LearningModuleCategory;
  page?: number;
  pageSize?: number;
}
