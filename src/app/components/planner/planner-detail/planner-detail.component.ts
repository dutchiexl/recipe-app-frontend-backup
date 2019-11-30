import { Component, OnInit } from '@angular/core';
import { MealPlan } from '../../../interfaces/planner/meal-plan';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { RecipeState } from '../../../store/recipe.state';
import { MealPlanListUtil } from '../../../utils/meal-plan-list.util';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { Navigate } from '@ngxs/router-plugin';
import { MatDialog } from '@angular/material';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { DeleteMealPlanAction } from '../../../store/recipe.actions';

@Component({
  selector: 'app-planner-detail',
  templateUrl: './planner-detail.component.html',
  styleUrls: ['./planner-detail.component.scss']
})
export class PlannerDetailComponent implements OnInit {
  mealPlans: MealPlan[];
  mealPlan: MealPlan;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.store.select(RecipeState.getMealPlans).subscribe((mealPlans) => {
        this.mealPlans = mealPlans;
        let mealPlanId = Number(params.get('planId'));
        this.mealPlan = MealPlanListUtil.findById(this.mealPlans, mealPlanId);
      });
    });
  }

  goToRecipe(recipe: Recipe) {
    this.store.dispatch(new Navigate(['/recipe', recipe.id]))
  }

  editPlan() {
    this.store.dispatch(new Navigate(['/edit-plan', this.mealPlan.id]))
  }

  deletePlan() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteMealPlanAction(this.mealPlan));
      }
    });
  }
}
