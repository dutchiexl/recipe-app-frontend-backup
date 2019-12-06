import { MealPlan } from '../interfaces/planner/meal-plan';
import { Shoppinglist } from '../interfaces/shoppinglist/shoppinglist';
import { Ingredient } from '../interfaces/recipe/ingredient.interface';

export class ShoppingListUtil {
  public static convertMealplanToShoppingList(mealplan: MealPlan): Shoppinglist {
    let shoppingList: Shoppinglist = {
      shoppinglistGroups: []
    };
    mealplan.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        this.addIngredientToShoppingListGroup(shoppingList, ingredient);
      });
    });
    return shoppingList;
  }

  public static addIngredientToShoppingListGroup(shoppingList: Shoppinglist, ingredient: Ingredient) {
    let shoppingListGroup = shoppingList.shoppinglistGroups.find((shoppingListGroup) => shoppingListGroup.category === ingredient.category);
    if (!shoppingListGroup) {
      shoppingListGroup = {
        category: ingredient.category,
        ingredients: []
      };
      shoppingList.shoppinglistGroups.push(shoppingListGroup);
    }
    shoppingListGroup.ingredients.push(ingredient);
  }
}
