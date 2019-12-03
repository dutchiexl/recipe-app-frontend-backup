import { Unit } from '../unit/unit';
import { IngredientCategory } from '../../enums/ingredient-category';

export interface Ingredient {
  name: string
  amount: number;
  unit?: Unit;
  category: IngredientCategory
}
