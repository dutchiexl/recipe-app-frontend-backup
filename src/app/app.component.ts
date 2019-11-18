import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { RecipeState } from './store/recipe.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recepten';
  isLoaded = false;

  constructor(private store: Store) {
    store.select(RecipeState.getLoadedState).subscribe((state) => {
      this.isLoaded = state;
    });
  }
}
