import { State, Action, Selector, StateContext } from '@ngxs/store';
import { LoadRecipesAction } from './recipe.actions';
import { Recipe } from '../interfaces/recipe.interface';
import produce from 'immer';
import { Observable, of } from 'rxjs';
import { Step } from '../interfaces/step.interface';
import { Ingredient } from '../interfaces/ingredient.interface';

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
      id: 1,
      name: 'Filipijnse peperkip',
      nameAddition: 'met gestoofde groenten en rijst',
      description: 'Een van de bekendste filipijnse recepten',
      imagePath: 'assets/images/filipino-chicken.jpg',
      creationDate: new Date(),
      steps: this.mockSteps(),
      ingredients: this.mockIngredients(),
      nutrients: [],
      equipment: [],
    };

    recipes.push(recipe);

    let recipe2: Recipe = {
      id: 2,
      name: 'Italiaanse pesto-aardappelsalade',
      nameAddition: 'met mozarella en cherrytomaten',
      description: 'Pasta pesto is ...',
      creationDate: new Date(),
      ingredients: this.mockIngredients(),
      steps: this.mockSteps(),
      nutrients: [],
      equipment: [],
    };

    recipes.push(recipe2);

    return of(recipes);
  }

  private mockSteps(): Step[] {
    return [
      {
        name: 'Aardappels roosteren',
        text: 'Verwarm de oven op ...'
      },
      {
        name: 'Aardappels roosteren',
        text: 'Verwarm de oven op ...'
      },
      {
        name: 'Aardappels roosteren',
        text: 'Verwarm de oven op ...'
      },
      {
        name: 'Aardappels roosteren',
        text: 'Verwarm de oven op ...'
      },
      {
        name: 'Aardappels roosteren',
        text: 'Verwarm de oven op ...'
      }
    ];
  }

  private mockIngredients(): Ingredient[] {
    return [
      {
        name: 'pijnboompitten',
        amount: 1,
        quantifier: 'schep'
      },
      {
        name: 'courgette',
        amount: 1,
      }
    ];
  }
}
