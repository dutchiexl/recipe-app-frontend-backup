import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/recipe/overview/overview.component';
import { DetailComponent } from './components/recipe/detail/detail.component';
import { EditComponent } from './components/recipe/edit/edit.component';
import { PlannerOverviewComponent } from './components/planner/planner-overview/planner-overview.component';

const routes: Routes = [
  {path: '', component: OverviewComponent},
  {path: 'create-recipe', component: EditComponent},
  {path: 'edit-recipe/:recipeId', component: EditComponent},
  {path: 'recipe/:recipeId', component: DetailComponent},
  {path: 'planner', component: PlannerOverviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
