export enum Category {
 AI = 'AI',
 Sustainability = 'Sustainability',
 DigitalSkills = 'Digital Skills'
}

export interface LearningModule {
 id: string;
 title: string;
 category: Category;
 estimatedMinutes: number;
 completed: boolean;
}