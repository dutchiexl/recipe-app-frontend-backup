import { Recipe } from '../interfaces/recipe.interface';

export class RecipeUtil {
  public static createEmpty(): Recipe {
    return {
      name: null,
      nameAddition: null,
      imagePath: null,
      description: null,
      creationDate: null,
      steps: [],
      ingredients: [],
      equipment: [],
      nutrients: [],
      source: null
    }
  }
}
