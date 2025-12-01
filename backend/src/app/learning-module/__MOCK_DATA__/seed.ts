import { v7 as uuid } from 'uuid';
import { Category, LearningModule } from 'src/app/learning-module/types/learning-module.interface';

export const initialLearningModules: LearningModule[] = [
  { id: uuid(), title: 'Introduction to AI Ethics', category: Category.AI, estimatedMinutes: 30, completed: false },
  { id: uuid(), title: 'Sustainable Software Development', category: Category.Sustainability, estimatedMinutes: 45, completed: true },
  { id: uuid(), title: 'Advanced TypeScript Patterns', category: Category.DigitalSkills, estimatedMinutes: 60, completed: false },
  { id: uuid(), title: 'Climate Change and Technology', category: Category.Sustainability, estimatedMinutes: 50, completed: false },
  { id: uuid(), title: 'Generative AI Fundamentals', category: Category.AI, estimatedMinutes: 40, completed: true },
  { id: uuid(), title: 'Cloud Security Best Practices', category: Category.DigitalSkills, estimatedMinutes: 70, completed: false },
];