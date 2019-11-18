import { Recipe } from '../interfaces/recipe/recipe.interface';
import { MealPlan } from '../interfaces/planner/meal-plan';

export class LoadApplication {
  public static readonly type = '[Recipe] Load Application';

  constructor() { }
}

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

export class UpdateOrCreateMealPlanAction {
  public static readonly type = '[Recipe] Update or create a mealplan';

  constructor(public mealPlan: MealPlan) { }
}
