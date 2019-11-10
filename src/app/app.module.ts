import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatToolbarModule } from '@angular/material';
import { OverviewComponent } from './components/recipe/overview/overview.component';
import { DetailComponent } from './components/recipe/detail/detail.component';
import { OverviewItemComponent } from './components/recipe/overview/overview-item/overview-item.component';
import { NgxsModule } from '@ngxs/store';
import { RecipeState } from './store/recipe.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [
    AppComponent,
    OverviewItemComponent,
    OverviewComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    NgxsModule.forRoot([
      RecipeState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
