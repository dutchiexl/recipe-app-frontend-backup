import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { RecipeState, RecipeStateModel } from './recipe.state';
import { RecipeAction } from './recipe.actions';

describe('Recipe store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([RecipeState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: RecipeStateModel = {
      items: ['item-1']
    };
    store.dispatch(new RecipeAction('item-1'));
    const actual = store.selectSnapshot(RecipeState.getState);
    expect(actual).toEqual(expected);
  });

});
