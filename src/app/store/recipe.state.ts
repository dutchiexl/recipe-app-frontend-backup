import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  DeleteMealPlanAction,
  DeleteRecipeAction,
  LoadApplicationAction,
  LoadMealPlansAction,
  LoadRecipesAction, LoadUnitsAction, SetMealplanAction, SetModeAction,
  UpdateOrCreateMealPlanAction,
  UpdateOrCreateRecipeAction
} from './recipe.actions';
import { Recipe } from '../interfaces/recipe/recipe.interface';
import produce from 'immer';
import { RecipeService } from '../services/recipe.service';
import { MealPlan } from '../interfaces/planner/meal-plan';
import { MealPlanService } from '../services/meal-plan.service';
import { Navigate } from '@ngxs/router-plugin';
import { RawRecipe } from '../interfaces/api/raw-recipe.interface';
import { RawMealPlan } from '../interfaces/api/raw-meal.plan';
import { AppModeEnum } from '../enums/app-mode.enum';
import { UnitService } from '../services/unit-service';
import { Unit } from '../interfaces/unit/unit';

export interface RecipeStateModel {
  mode: AppModeEnum;
  selectedMealplan: MealPlan;
  isLoaded: boolean;
  recipes: Recipe[];
  mealPlans: MealPlan[];
  units: Unit[];
}

@State<RecipeStateModel>({
  name: 'recipe',
  defaults: {
    mode: AppModeEnum.RECIPES,
    selectedMealplan: undefined,
    isLoaded: false,
    recipes: undefined,
    mealPlans: undefined,
    units: undefined
  }
})
export class RecipeState {

  constructor(
    private recipeService: RecipeService,
    private mealPlanService: MealPlanService,
    private unitService: UnitService
  ) {
  }

  @Selector()
  public static getState(state: RecipeStateModel) {
    return state;
  }

  @Selector()
  public static getMode(state: RecipeStateModel) {
    return state.mode;
  }

  @Selector()
  public static getLoadedState(state: RecipeStateModel) {
    return state.isLoaded;
  }

  @Selector()
  public static getRecipes(state: RecipeStateModel): Recipe[] {
    return state.recipes;
  }

  @Selector()
  public static getSelectedMealplan(state: RecipeStateModel): MealPlan {
    return state.selectedMealplan;
  }

  @Selector()
  public static getMealPlans(state: RecipeStateModel): MealPlan[] {
    return state.mealPlans;
  }

  @Action(SetModeAction)
  public setMode(ctx: StateContext<RecipeStateModel>, action: SetModeAction) {
    ctx.setState(
      produce(ctx.getState(), (draft) => {
        draft.mode = action.mode;
      }),
    );
    switch (action.mode) {
      case AppModeEnum.RECIPES:
        ctx.dispatch(new Navigate(['/']));
        break;
      case AppModeEnum.MEALPLANS:
        ctx.dispatch(new Navigate(['/planner']));
        break;
    }
  }

  @Action(LoadApplicationAction)
  public loadAPI(ctx: StateContext<RecipeStateModel>, {}: LoadApplicationAction) {
    this.setLoadedState(ctx, false);
    ctx.dispatch(new LoadRecipesAction());
    ctx.dispatch(new LoadMealPlansAction());
    ctx.dispatch(new LoadUnitsAction());
  }

  @Action(LoadRecipesAction)
  public loadRecipes(ctx: StateContext<RecipeStateModel>, {}: LoadRecipesAction) {
    this.setLoadedState(ctx, false);
    this.recipeService.getRecipes().subscribe((recipes) => {
      ctx.setState(
        produce(ctx.getState(), (draft) => {
          draft.recipes = recipes;
        }),
      );
      this.checkLoadedState(ctx);
    });
  }

  @Action(LoadMealPlansAction)
  public loadMealPlans(ctx: StateContext<RecipeStateModel>, {}: LoadMealPlansAction) {
    this.setLoadedState(ctx, false);
    this.mealPlanService.getAll().subscribe((mealPlans) => {
      ctx.setState(
        produce(ctx.getState(), (draft) => {
          draft.mealPlans = mealPlans;
        }),
      );
      this.checkLoadedState(ctx);
    });
  }

  @Action(LoadUnitsAction)
  public loadUnits(ctx: StateContext<RecipeStateModel>, {}: LoadUnitsAction) {
    this.setLoadedState(ctx, false);
    this.unitService.getAll().subscribe((units) => {
      ctx.setState(
        produce(ctx.getState(), (draft) => {
          draft.units = units;
        }),
      );
      this.checkLoadedState(ctx);
    });
  }

  @Action(UpdateOrCreateRecipeAction)
  public updateOrCreateRecipe(ctx: StateContext<RecipeStateModel>, action: UpdateOrCreateRecipeAction) {
    if (action.recipe.id) {
      this.recipeService.update(action.recipe).subscribe(() => {
        ctx.dispatch(new LoadRecipesAction());
        ctx.dispatch(new Navigate(['/recipe', action.recipe.id]))
      });
    } else {
      this.recipeService.create(action.recipe).subscribe((recipe: RawRecipe) => {
        ctx.dispatch(new LoadRecipesAction());
        ctx.dispatch(new Navigate(['/recipe', recipe.id]))
      });
    }
  }

  @Action(DeleteRecipeAction)
  public deleteRecipe(ctx: StateContext<RecipeStateModel>, action: DeleteRecipeAction) {
    ctx.getState().mealPlans.filter((plan) => {
      return plan.recipes.some((recipe) => {
        return recipe.id === action.recipe.id;
      });
    }).forEach((plan) => {
      let recipes = plan.recipes.filter((recipe) => {
        return recipe.id !== action.recipe.id;
      });
      this.mealPlanService.updateRecipes(plan, recipes).subscribe();
    });
    this.recipeService.delete(action.recipe).subscribe(() => {
      ctx.dispatch(new LoadRecipesAction());
      ctx.dispatch(new LoadMealPlansAction());
      ctx.dispatch(new Navigate(['/']))
    });
  }

  @Action(UpdateOrCreateMealPlanAction)
  public updateOrCreateMealPlan(ctx: StateContext<RecipeStateModel>, action: UpdateOrCreateMealPlanAction) {
    if (action.mealPlan.id) {
      this.mealPlanService.update(action.mealPlan).subscribe(() => {
        ctx.dispatch(new LoadMealPlansAction());
        ctx.dispatch(new Navigate(['/plan', action.mealPlan.id]))
      });
    } else {
      this.mealPlanService.create(action.mealPlan).subscribe((mealPlan: RawMealPlan) => {
        ctx.dispatch(new LoadMealPlansAction());
        ctx.dispatch(new Navigate(['/plan', mealPlan.id]))
      });
    }
  }

  @Action(SetMealplanAction)
  public setMealPlan(ctx: StateContext<RecipeStateModel>, action: SetMealplanAction) {
    ctx.setState(
      produce(ctx.getState(), (draft) => {
        draft.selectedMealplan = action.mealPlan;
      }),
    );
    ctx.dispatch(new Navigate(['/plan', action.mealPlan.id]))
  }

  @Action(DeleteMealPlanAction)
  public deleteMealplan(ctx: StateContext<RecipeStateModel>, action: DeleteMealPlanAction) {
    this.mealPlanService.delete(action.mealPlan).subscribe(() => {
      ctx.dispatch(new LoadMealPlansAction());
      ctx.dispatch(new Navigate(['/planner']))
    });
  }

  private checkLoadedState(ctx: StateContext<RecipeStateModel>): void {
    if (ctx.getState().recipes && ctx.getState().mealPlans) {
      this.setLoadedState(ctx, true);
    }
  }

  private setLoadedState(ctx: StateContext<RecipeStateModel>, state: boolean) {
    ctx.setState(
      produce(ctx.getState(), (draft) => {
        draft.isLoaded = state;
      }),
    );
  }
}
