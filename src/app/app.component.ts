import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { RecipeState } from './store/recipe.state';
import { AppModeEnum } from './enums/app-mode.enum';
import { SetModeAction } from './store/recipe.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stateEnum = AppModeEnum;
  mode: AppModeEnum;
  isLoaded = false;

  constructor(private store: Store) {
    store.select(RecipeState.getMode).subscribe((mode) => {
      this.mode = mode;
    });
    store.select(RecipeState.getLoadedState).subscribe((state) => {
      this.isLoaded = state;
    });
  }

  setMode(mode: AppModeEnum) {
    this.store.dispatch(new SetModeAction(mode));
  }
}
