import { Ingredient } from '../interfaces/ingredient.interface';

export class IngredientUtil {

  public static createEmpty(): Ingredient {
    return {
      name: null,
      amount: null
    }
  }
}
