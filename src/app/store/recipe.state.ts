import { State, Action, Selector, StateContext } from '@ngxs/store';
import { LoadRecipesAction, UpdateOrCreateRecipeAction } from './recipe.actions';
import { Recipe } from '../interfaces/recipe.interface';
import produce from 'immer';
import { RecipeService } from '../services/recipe.service';

export interface RecipeStateModel {
  recipes: Recipe[];
}

@State<RecipeStateModel>({
  name: 'recipe',
  defaults: {
    recipes: []
  }
})
export class RecipeState {

  constructor(private recipeService: RecipeService) {
  }

  @Selector()
  public static getState(state: RecipeStateModel) {
    return state;
  }

  @Selector()
  public static getRecipes(state: RecipeStateModel): Recipe[] {
    return state.recipes;
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

  @Action(UpdateOrCreateRecipeAction)
  public updateOrCreateRecipe(ctx: StateContext<RecipeStateModel>, action: UpdateOrCreateRecipeAction) {
    this.recipeService.create(action.recipe).subscribe(() => {
      ctx.dispatch(new LoadRecipesAction());
    });
  }
}
