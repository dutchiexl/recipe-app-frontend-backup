import { Unit } from '../unit/unit';
import { IngredientCategory } from '../../enums/ingredient-category';

export interface Ingredient {
  name: string
  amount: number;
  quantifier?: Unit;
  category: IngredientCategory
}
