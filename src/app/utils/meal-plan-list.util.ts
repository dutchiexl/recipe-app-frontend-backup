import { MealPlan } from '../interfaces/planner/meal-plan';

export class MealPlanListUtil {

  public static findById(mealPlans: MealPlan[], mealPlanId: number): MealPlan {
    return mealPlans.find((mealPlan) => {
      return mealPlan.id === mealPlanId;
    });
  }
}
