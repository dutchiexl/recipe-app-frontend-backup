import { Ingredient } from '../recipe/ingredient.interface';

export interface ShoppinglistGroup {
  type: string;
  ingredients: Ingredient[];
}
