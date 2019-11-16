import { Recipe } from '../interfaces/recipe/recipe.interface';

export class LoadRecipesAction {
  public static readonly type = '[Recipe] Load recipes';

  constructor() { }
}

export class LoadMealPlansAction {
  public static readonly type = '[Recipe] Load meal plans';

  constructor() { }
}

export class UpdateOrCreateRecipeAction {
  public static readonly type = '[Recipe] Update or create a recipe';

  constructor(public recipe: Recipe) { }
}
