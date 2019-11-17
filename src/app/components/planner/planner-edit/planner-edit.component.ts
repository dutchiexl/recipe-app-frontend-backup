import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MealPlan } from '../../../interfaces/planner/meal-plan';
import { Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { MealPlanUtil } from '../../../utils/mealPlanUtil';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { RecipeState } from '../../../store/recipe.state';
import { UpdateOrCreateMealPlanAction, UpdateOrCreateRecipeAction } from '../../../store/recipe.actions';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-planner-edit',
  templateUrl: './planner-edit.component.html',
  styleUrls: ['./planner-edit.component.scss']
})
export class PlannerEditComponent implements OnInit {
  recipes: Recipe[];
  mealPlan: MealPlan;
  form: FormGroup;

  constructor(
    private store: Store,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.mealPlan = MealPlanUtil.createEmpty();
    store.select(RecipeState.getRecipes).subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.mealPlan.name = this.form.get('name').value;
      this.store.dispatch(new UpdateOrCreateMealPlanAction(this.mealPlan));
      this.store.dispatch(new Navigate(['/planner']))
    }
  }
}
