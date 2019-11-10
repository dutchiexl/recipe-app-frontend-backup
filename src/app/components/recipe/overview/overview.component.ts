import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadRecipesAction } from '../../../store/recipe.actions';
import { RecipeState } from '../../../store/recipe.state';
import { Recipe } from '../../../interfaces/recipe.interface';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  recipes: Recipe[];

  constructor(private store: Store) {
    store.dispatch(new LoadRecipesAction());
    store.select(RecipeState.getRecipes).subscribe((recipes) => {
      this.recipes = recipes;
      console.log(recipes);
    });
  }

  ngOnInit() {
  }

}
