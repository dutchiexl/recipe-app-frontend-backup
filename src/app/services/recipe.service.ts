import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe/recipe.interface';
import { map } from 'rxjs/operators';
import { RecipeMapper } from '../mappers/recipe.mapper';
import { RawRecipe } from '../interfaces/api/raw-recipe.interface';
import { RecipeUtil } from '../utils/recipe.util';
import { Unit } from '../interfaces/unit/unit';
import { UnitService } from './unit.service';

@Injectable()
export class RecipeService {
  cache: Observable<Recipe>;
  callbackUrl = 'http://localhost:3333/api/recipes';

  constructor(
    private http: HttpClient,
    private unitService: UnitService
  ) {
  }

  getRecipes(): Observable<Recipe[]> {
    let recipes$ = this.http.get(this.callbackUrl);
    let units$ = this.unitService.getAll();

    return forkJoin([recipes$, units$]).pipe(
      map((result) => {
        let recipes = result[0] as RawRecipe[];
        let units = result[1] as Unit[];
        return recipes.map((rawRecipeData: RawRecipe) => {
          return RecipeMapper.toObject(rawRecipeData, units)
        })
      })
    );
  }

  create(recipe: Recipe): Observable<Object> {
    return this.http.post(this.callbackUrl, RecipeUtil.recipeAsJSON(recipe));
  }

  update(recipe: Recipe): Observable<Object> {
    return this.http.patch(this.callbackUrl + '/' + recipe.id, RecipeUtil.recipeAsJSON(recipe));
  }

  delete(recipe: Recipe) {
    return this.http.delete(this.callbackUrl + '/' + recipe.id);
  }
}
