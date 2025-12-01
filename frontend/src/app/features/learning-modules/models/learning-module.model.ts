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
