import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/recipe/overview/overview.component';
import { DetailComponent } from './components/recipe/detail/detail.component';
import { EditComponent } from './components/recipe/edit/edit.component';
import { PlannerOverviewComponent } from './components/planner/planner-overview/planner-overview.component';
import { PlannerDetailComponent } from './components/planner/planner-detail/planner-detail.component';
import { PlannerEditComponent } from './components/planner/planner-edit/planner-edit.component';

const routes: Routes = [
  {path: '', component: OverviewComponent},
  {path: 'recipe/:recipeId', component: DetailComponent},
  {path: 'create-recipe', component: EditComponent},
  {path: 'edit-recipe/:recipeId', component: EditComponent},
  {path: 'planner', component: PlannerOverviewComponent},
  {path: 'plan/:planId', component: PlannerDetailComponent},
  {path: 'create-plan', component: PlannerEditComponent},
  {path: 'edit-plan/:mealPlanId', component: PlannerEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
