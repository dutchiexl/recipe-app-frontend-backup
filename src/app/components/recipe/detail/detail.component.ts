import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RecipeListUtil } from '../../../utils/recipe-list.util';
import { RecipeState } from '../../../store/recipe.state';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  recipes: Recipe[];
  recipe: Recipe;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.store.select(RecipeState.getRecipes).subscribe((recipes) => {
        this.recipes = recipes;
        let recipeId = Number(params.get('recipeId'));
        this.recipe = RecipeListUtil.findRecipeById(this.recipes, recipeId);
      });
    });
  }

  editRecipe(recipe: Recipe) {
    this.store.dispatch(new Navigate(['/edit-recipe', this.recipe.id]))
  }
}
