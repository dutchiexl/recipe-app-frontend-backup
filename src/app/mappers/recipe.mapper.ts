import { Recipe } from '../interfaces/recipe.interface';
import { RawRecipe } from '../interfaces/api/raw-recipe.interface';
import { StepMapper } from './step.mapper';
import { IngredientMapper } from './ingredient.mapper';

export class RecipeMapper {

  public static toObject(rawData: RawRecipe): Recipe {
    return {
      id: rawData.id,
      name: rawData.name,
      nameAddition: rawData.nameAddition,
      description: rawData.description,
      imagePath: rawData.imagePath,
      creationDate: new Date(rawData.creationDate),
      ingredients: rawData.ingredients.map((rawIngredient) => IngredientMapper.toModel(rawIngredient)),
      steps: rawData.steps.map((rawStep) => StepMapper.toModel(rawStep)),
      nutrients: [],
      equipment: [],
      source: ''
    };
  }
}
