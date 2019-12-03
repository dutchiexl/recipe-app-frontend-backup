import { RawIngredient } from '../interfaces/api/raw-ingredient.interface';
import { Ingredient } from '../interfaces/recipe/ingredient.interface';
import { IngredientCategory } from '../enums/ingredient-category';

export class IngredientMapper {

  public static toModel(rawIngredient: RawIngredient): Ingredient {
    let ingredient: Ingredient = {
      name: rawIngredient.name,
      amount: rawIngredient.amount,
      category: IngredientCategory.MEAT
    };

    if (rawIngredient.unitId) {
      //ingredient.quantifier = rawStep.imagePath;
    }
    return ingredient;
  }
}
