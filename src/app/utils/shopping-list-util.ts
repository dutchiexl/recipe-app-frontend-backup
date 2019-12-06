import { MealPlan } from '../interfaces/planner/meal-plan';
import { Shoppinglist } from '../interfaces/shoppinglist/shoppinglist';
import { Item } from '../interfaces/recipe/item.interface';

export class ShoppingListUtil {
  public static convertMealplanToShoppingList(mealplan: MealPlan): Shoppinglist {
    let shoppingList: Shoppinglist = {
      shoppinglistGroups: []
    };
    mealplan.recipes.forEach((recipe) => {
      recipe.items.forEach((item) => {
        this.addIngredientToShoppingListGroup(shoppingList, item);
      });
    });
    return shoppingList;
  }

  public static addIngredientToShoppingListGroup(shoppingList: Shoppinglist, item: Item) {
    let shoppingListGroup = shoppingList.shoppinglistGroups.find((shoppingListGroup) => shoppingListGroup.category === item.ingredient.category);
    if (!shoppingListGroup) {
      shoppingListGroup = {
        category: item.ingredient.category,
        items: []
      };
      shoppingList.shoppinglistGroups.push(shoppingListGroup);
    }
    shoppingListGroup.items.push(item);
  }
}
