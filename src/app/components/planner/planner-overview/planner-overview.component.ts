import { Component, OnInit } from '@angular/core';
import { MealPlan } from '../../../interfaces/planner/meal-plan';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { RecipeState } from '../../../store/recipe.state';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';

@Component({
  selector: 'app-planner-overview',
  templateUrl: './planner-overview.component.html',
  styleUrls: ['./planner-overview.component.scss']
})
export class PlannerOverviewComponent implements OnInit {
  mealPlans: MealPlan[];
  recipes: Recipe[];

  constructor(private store: Store) {
    store.select(RecipeState.getMealPlans).subscribe((mealPlans) => {
      this.mealPlans = mealPlans;
    });
  }

  ngOnInit() {
  }

  createPlan() {
    this.store.dispatch(new Navigate(['/create-plan']));
  }

  goToMealPlan(mealPlan: MealPlan) {
    this.store.dispatch(new Navigate(['/plan', mealPlan.id]))
  }
}
