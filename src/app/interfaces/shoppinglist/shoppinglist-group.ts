import { Ingredient } from '../recipe/ingredient.interface';
import { IngredientCategory } from '../../enums/ingredient-category';

export interface ShoppinglistGroup {
  category: IngredientCategory;
  ingredients: Ingredient[];
}
