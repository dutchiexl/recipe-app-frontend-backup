import { Component, OnInit } from '@angular/core';
import { MealPlan } from '../../interfaces/planner/meal-plan';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { MealPlanListUtil } from '../../utils/meal-plan-list.util';
import { RecipeState } from '../../store/recipe.state';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppinglistComponent implements OnInit {
  mealPlan: MealPlan;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    let mealPlanIdParameter = this.route.snapshot.paramMap.get('planId');
    const mealPlanId = Number(mealPlanIdParameter);
    this.mealPlan = MealPlanListUtil.findById(this.store.selectSnapshot(RecipeState.getMealPlans), mealPlanId);
  }

  ngOnInit() {
  }

}
