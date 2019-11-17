import { Recipe } from '../recipe/recipe.interface';

export interface MealPlan {
  id?: number;
  name: string;
  recipes: Recipe[];
}
