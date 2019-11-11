import { Step } from './step.interface';
import { Ingredient } from './ingredient.interface';

export interface Recipe {
  id?: number,
  name: string
  nameAddition: string;
  description: string;
  imagePath?: string;
  source?: string;
  steps: Step[];
  ingredients: Ingredient[];
  equipment: [];
  nutrients: [];
  creationDate: Date;
}
