import { State, Action, Selector, StateContext } from '@ngxs/store';
import { LoadMealPlansAction, LoadRecipesAction, UpdateOrCreateRecipeAction } from './recipe.actions';
import { Recipe } from '../interfaces/recipe/recipe.interface';
import produce from 'immer';
import { RecipeService } from '../services/recipe.service';
import { MealPlan } from '../interfaces/planner/meal-plan';
import { MealPlanService } from '../services/meal-plan.service';

export interface RecipeStateModel {
  recipes: Recipe[];
  mealPlans: MealPlan[];
}

@State<RecipeStateModel>({
  name: 'recipe',
  defaults: {
    recipes: [],
    mealPlans: []
  }
})
export class RecipeState {

  constructor(
    private recipeService: RecipeService,
    private mealPlanService: MealPlanService,
  ) {
  }

  @Selector()
  public static getState(state: RecipeStateModel) {
    return state;
  }

  @Selector()
  public static getRecipes(state: RecipeStateModel): Recipe[] {
    return state.recipes;
  }

  @Selector()
  public static getMealPlans(state: RecipeStateModel): MealPlan[] {
    return state.mealPlans;
  }

  @Action(LoadRecipesAction)
  public loadRecipes(ctx: StateContext<RecipeStateModel>, {}: LoadRecipesAction) {
    this.recipeService.getRecipes().subscribe((recipes) => {
      ctx.setState(
        produce(ctx.getState(), (draft) => {
          draft.recipes = recipes;
        }),
      );
    });
  }

  @Action(LoadMealPlansAction)
  public loadMealPlans(ctx: StateContext<RecipeStateModel>, {}: LoadMealPlansAction) {
    this.mealPlanService.getAll().subscribe((mealPlans) => {
      ctx.setState(
        produce(ctx.getState(), (draft) => {
          draft.mealPlans = mealPlans;
        }),
      );
    });
  }

  @Action(UpdateOrCreateRecipeAction)
  public updateOrCreateRecipe(ctx: StateContext<RecipeStateModel>, action: UpdateOrCreateRecipeAction) {
    this.recipeService.create(action.recipe).subscribe(() => {
      ctx.dispatch(new LoadRecipesAction());
    });
  }
}
