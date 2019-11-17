import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe/recipe.interface';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { RecipeMapper } from '../mappers/recipe.mapper';
import { RawRecipe } from '../interfaces/api/raw-recipe.interface';
import { RecipeUtil } from '../utils/recipe.util';
import { MealPlan } from '../interfaces/planner/meal-plan';
import { RawMealPlan } from '../interfaces/api/raw-meal.plan';
import { MealPlanMapper } from '../mappers/meal-plan.mapper';
import { RecipeService } from './recipe.service';
import { MealPlanUtil } from '../utils/mealPlanUtil';

@Injectable()
export class MealPlanService {

  callbackUrl = 'http://localhost:3000/meal_plans';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {
  }

  getAll(): Observable<MealPlan[]> {
    return this.recipeService.getRecipes().pipe(
      mergeMap((recipes) => {
        return this.http.get(this.callbackUrl).pipe(
          map((rawData: RawMealPlan[]) => {
            return rawData.map((RawMealPlan) => MealPlanMapper.toObject(RawMealPlan, recipes));
          })
        )
      })
    );
  }

  create(mealPlan: MealPlan): Observable<Object> {
    return this.http.post(this.callbackUrl, MealPlanUtil.asJson(mealPlan));
  }

  update(recipe: Recipe) {
    this.http.patch(this.callbackUrl + '/' + recipe.id, RecipeUtil.recipeAsJSON(recipe))
      .subscribe(() => {
      });
  }
}
