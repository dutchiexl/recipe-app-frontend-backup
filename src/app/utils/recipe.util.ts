import { Recipe } from '../interfaces/recipe/recipe.interface';
import { RawRecipe } from '../interfaces/api/raw-recipe.interface';

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

  static recipeAsJSON(recipe: Recipe): RawRecipe {
    return {
      name: recipe.name,
      nameAddition: recipe.nameAddition,
      description: recipe.description,
      steps: recipe.steps.map((step) => {
        let recipeStep = {
          name: step.name,
          text: step.text,
          imagePath: step.imagePath
        };

        if (step.imagePath) {
          recipeStep.imagePath = step.imagePath;
        }

        return step;
      }),
      ingredients: recipe.ingredients.map((ingredient) => {
        return {
          name: ingredient.name,
          amount: ingredient.amount
        }
      }),
      imagePath: recipe.imagePath,
      creationDate: new Date(),
      equipment: [],
      nutrients: []
    };
  }
}
