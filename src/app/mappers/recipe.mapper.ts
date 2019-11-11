import { Recipe } from '../interfaces/recipe.interface';
import { RawRecipe } from '../interfaces/raw-recipe.interface';

export class RecipeMapper {

  public static toObject(rawData: RawRecipe): Recipe {
    let recipe: Recipe = {
      id: rawData.id,
      name: rawData.name,
      nameAddition: rawData.nameAddition,
      description: rawData.description,
      imagePath: rawData.imagePath,
      creationDate: new Date(rawData.creationDate),
      ingredients: [],
      steps: [],
      nutrients: [],
      equipment: [],
      source: ''
    };
    return recipe;
  }
}
