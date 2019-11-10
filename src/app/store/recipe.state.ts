import { State, Action, Selector, StateContext } from '@ngxs/store';
import { LoadRecipesAction } from './recipe.actions';
import { Recipe } from '../interfaces/recipe.interface';
import produce from 'immer';
import { Observable, of } from 'rxjs';

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
    this.mockRecipes().subscribe((recipes) => {
      ctx.setState(
        produce(ctx.getState(), (draft) => {
          draft.recipes = recipes;
        }),
      );
    });
  }

  private mockRecipes(): Observable<Recipe[]> {
    let recipes = [];

    let recipe: Recipe = {
      name: 'Filipijnse peperkip',
      nameAddition: 'met gestoofde groenten en rijst',
      description: 'Een van de bekendste filipijnse recepten',
      creationDate: new Date(),
      ingredients: [],
      steps: [],
      nutrients: [],
      equipment: [],
    };

    recipes.push(recipe);

    let recipe2: Recipe = {
      name: 'Italiaanse pesto-aardappelsalade',
      nameAddition: 'met mozarella en cherrytomaten',
      description: 'Pasta pesto is ...',
      creationDate: new Date(),
      ingredients: [],
      steps: [],
      nutrients: [],
      equipment: [],
    };

    recipes.push(recipe2);

    return of(recipes);
  }
}
