import { RawIngredient } from '../interfaces/api/raw-ingredient.interface';
import { Ingredient } from '../interfaces/ingredient.interface';

export class IngredientMapper {

  public static toModel(rawIngredient: RawIngredient): Ingredient {
    let ingredient: Ingredient = {
      name: rawIngredient.name,
      amount: rawIngredient.amount,
    };

    if (rawIngredient.unitId) {
      //ingredient.quantifier = rawStep.imagePath;
    }
    return ingredient;
  }
}
