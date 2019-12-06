import { Ingredient } from '../interfaces/recipe/ingredient.interface';
import { IngredientCategory } from '../enums/ingredient-category';

export class IngredientUtil {

  public static createEmpty(): Ingredient {
    return {
      name: null,
      category: IngredientCategory.MEAT
    }
  }
}
