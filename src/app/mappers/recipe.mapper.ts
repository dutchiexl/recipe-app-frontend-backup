import { Recipe } from '../interfaces/recipe/recipe.interface';
import { RawRecipe } from '../interfaces/api/raw-recipe.interface';
import { StepMapper } from './step.mapper';
import { IngredientMapper } from './ingredient.mapper';
import { Unit } from '../interfaces/unit/unit';

export class RecipeMapper {

  public static toObject(rawData: RawRecipe, units: Unit[]): Recipe {
    return {
      id: rawData._id,
      name: rawData.name,
      nameAddition: rawData.nameAddition,
      description: rawData.description,
      imagePath: rawData.imagePath,
      creationDate: new Date(rawData.creationDate),
      ingredients: rawData.ingredients.map((rawIngredient) => IngredientMapper.toModel(rawIngredient, units)),
      steps: rawData.steps.map((rawStep) => StepMapper.toModel(rawStep)),
      nutrients: [],
      equipment: [],
      source: ''
    };
  }
}
