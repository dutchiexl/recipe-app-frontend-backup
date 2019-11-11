import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe.interface';
import { map } from 'rxjs/operators';
import { RecipeMapper } from '../mappers/recipe.mapper';
import { RawRecipe } from '../interfaces/raw-recipe.interface';

@Injectable()
export class RecipeService {

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
}
