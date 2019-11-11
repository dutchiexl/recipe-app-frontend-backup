import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { OverviewComponent } from './components/recipe/overview/overview.component';
import { DetailComponent } from './components/recipe/detail/detail.component';
import { OverviewItemComponent } from './components/recipe/overview/overview-item/overview-item.component';
import { NgxsModule, Store } from '@ngxs/store';
import { RecipeState } from './store/recipe.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { StepComponent } from './components/step/step.component';
import { LoadRecipesAction } from './store/recipe.actions';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { RecipeService } from './services/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './components/recipe/edit/edit.component';
import { EditIngredientComponent } from './components/ingredient/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewItemComponent,
    OverviewComponent,
    DetailComponent,
    StepComponent,
    IngredientComponent,
    EditComponent,
    EditIngredientComponent
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
    NgxsModule.forRoot([
      RecipeState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot()
  ],
  providers: [
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private store: Store) {
    store.dispatch(new LoadRecipesAction());
  }
}
