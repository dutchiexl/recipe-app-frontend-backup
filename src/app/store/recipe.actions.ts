import { Recipe } from '../interfaces/recipe.interface';

export class LoadRecipesAction {
  public static readonly type = '[Recipe] Load recipes';

  constructor() { }
}

export class UpdateOrCreateRecipeAction {
  public static readonly type = '[Recipe] Update or create a recipe';

  constructor(public recipe: Recipe) { }
}
