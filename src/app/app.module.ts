import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatToolbarModule } from '@angular/material';
import { OverviewComponent } from './components/recipe/overview/overview.component';
import { DetailComponent } from './components/recipe/detail/detail.component';
import { OverviewItemComponent } from './components/recipe/overview/overview-item/overview-item.component';
import { NgxsModule, Store } from '@ngxs/store';
import { RecipeState } from './store/recipe.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { StepComponent } from './components/recipe/step/step.component';
import { LoadRecipesAction } from './store/recipe.actions';
import { IngredientComponent } from './components/recipe/ingredient/ingredient.component';
import { RecipeService } from './services/recipe.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OverviewItemComponent,
    OverviewComponent,
    DetailComponent,
    StepComponent,
    IngredientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
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
