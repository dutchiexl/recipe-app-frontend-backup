import { Recipe } from '../interfaces/recipe/recipe.interface';
import { MealPlan } from '../interfaces/planner/meal-plan';
import { AppModeEnum } from '../enums/app-mode.enum';

export class SetModeAction {
  public static readonly type = '[Recipe] Set the application mode';

  constructor(public mode: AppModeEnum) { }
}

export class LoadApplicationAction {
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

export class LoadUnitsAction {
  public static readonly type = '[Recipe] Load units';

  constructor() { }
}

export class UpdateOrCreateRecipeAction {
  public static readonly type = '[Recipe] Update or create a recipe';

  constructor(public recipe: Recipe) { }
}

export class DeleteRecipeAction {
  public static readonly type = '[Recipe] Delete a recipe';

  constructor(public recipe: Recipe) { }
}

export class SetMealplanAction {
  public static readonly type = '[Recipe] Set a mealplan';

  constructor(public mealPlan: MealPlan) { }
}

export class UpdateOrCreateMealPlanAction {
  public static readonly type = '[Recipe] Update or create a mealplan';

  constructor(public mealPlan: MealPlan) { }
}

export class DeleteMealPlanAction {
  public static readonly type = '[Recipe] Delete a mealplan';

  constructor(public mealPlan: MealPlan) { }
}
