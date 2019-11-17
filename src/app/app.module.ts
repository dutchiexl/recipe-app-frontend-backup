import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule,
  MatToolbarModule
} from '@angular/material';
import { OverviewComponent } from './components/recipe/overview/overview.component';
import { DetailComponent } from './components/recipe/detail/detail.component';
import { OverviewItemComponent } from './components/recipe/overview/overview-item/overview-item.component';
import { NgxsModule, Store } from '@ngxs/store';
import { RecipeState } from './store/recipe.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { StepComponent } from './components/recipe/step/step.component';
import { LoadMealPlansAction, LoadRecipesAction } from './store/recipe.actions';
import { IngredientComponent } from './components/recipe/ingredient/ingredient.component';
import { RecipeService } from './services/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './components/recipe/edit/edit.component';
import { EditIngredientComponent } from './components/recipe/ingredient/edit/edit.component';
import { EditStepComponent } from './components/recipe/step/edit/edit.component';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { PlannerOverviewComponent } from './components/planner/planner-overview/planner-overview.component';
import { PlannerOverviewItemComponent } from './components/planner/planner-overview/planner-overview-item/planner-overview-item.component';
import { PlannerDetailComponent } from './components/planner/planner-detail/planner-detail.component';
import { MealPlanService } from './services/meal-plan.service';
import { PlannerEditComponent } from './components/planner/planner-edit/planner-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewItemComponent,
    OverviewComponent,
    DetailComponent,
    StepComponent,
    IngredientComponent,
    EditComponent,
    EditIngredientComponent,
    EditStepComponent,
    PlannerOverviewComponent,
    PlannerOverviewItemComponent,
    PlannerDetailComponent,
    PlannerEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    EcoFabSpeedDialModule,
    NgxsModule.forRoot([
      RecipeState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot()
  ],
  providers: [
    RecipeService,
    MealPlanService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private store: Store) {
    store.dispatch(new LoadRecipesAction());
    store.dispatch(new LoadMealPlansAction());
  }
}
