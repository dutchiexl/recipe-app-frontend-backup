import { RawIngredient } from './raw-ingredient.interface';
import { RawStep } from './raw-step.interface';

export interface RawRecipe{
  _id?: string,
  name: string,
  nameAddition: string,
  description: string,
  imagePath?: string,
  creationDate: Date,
  steps: RawStep[],
  ingredients: RawIngredient[],
  nutrients: [],
  equipment: []
}
