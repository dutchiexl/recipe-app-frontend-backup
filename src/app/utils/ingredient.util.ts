import { Ingredient } from '../interfaces/recipe/ingredient.interface';
import { IngredientCategory } from '../enums/ingredient-category';
import { RawIngredient } from '../interfaces/api/raw-ingredient.interface';

export class IngredientUtil {

  public static createEmpty(): Ingredient {
    return {
      name: null,
      category: IngredientCategory.MEAT
    }
  }

  static asJson(ingredient: Ingredient): RawIngredient {
    return {
      name: ingredient.name,
      category: ingredient.category
    }
  }
}
