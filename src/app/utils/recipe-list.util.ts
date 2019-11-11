import { Recipe } from '../interfaces/recipe.interface';

export class RecipeListUtil {

  public static findRecipeById(recipes: Recipe[], recipeId: number): Recipe {
    console.log(recipes);
    return recipes.find((recipe) => {
      return recipe.id === recipeId;
    });
  }
}
