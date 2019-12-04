import { RawIngredient } from '../interfaces/api/raw-ingredient.interface';
import { Ingredient } from '../interfaces/recipe/ingredient.interface';
import { IngredientCategory } from '../enums/ingredient-category';
import { Unit } from '../interfaces/unit/unit';

export class IngredientMapper {

  public static toModel(rawIngredient: RawIngredient, units: Unit[]): Ingredient {
    let ingredient: Ingredient = {
      name: rawIngredient.name,
      amount: rawIngredient.amount,
      category: IngredientCategory.MEAT
    };

    if (rawIngredient.unitId) {
      ingredient.unit = units.find((unit) => unit.id === rawIngredient.unitId)
    }
    return ingredient;
  }
}
