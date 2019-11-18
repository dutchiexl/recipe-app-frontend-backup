import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe/recipe.interface';
import { map } from 'rxjs/operators';
import { RecipeMapper } from '../mappers/recipe.mapper';
import { RawRecipe } from '../interfaces/api/raw-recipe.interface';
import { RecipeUtil } from '../utils/recipe.util';

@Injectable()
export class RecipeService {
  cache: Observable<Recipe>;
  callbackUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) {
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get(this.callbackUrl).pipe(
      map((rawData: RawRecipe[]) => {
        return rawData.map((rawRecipeData) => RecipeMapper.toObject(rawRecipeData));
      })
    );
  }

  create(recipe: Recipe): Observable<Object> {
    return this.http.post(this.callbackUrl, RecipeUtil.recipeAsJSON(recipe));
  }

  update(recipe: Recipe): Observable<Object> {
    return this.http.patch(this.callbackUrl + '/' + recipe.id, RecipeUtil.recipeAsJSON(recipe));
  }
}
