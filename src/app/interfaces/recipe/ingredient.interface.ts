import { IngredientCategory } from '../../enums/ingredient-category';

export interface Ingredient {
  id?: string;
  name: string;
  category: IngredientCategory
}
