import { Unit } from '../interfaces/unit/unit';
import { Ingredient } from '../interfaces/recipe/ingredient.interface';
import { IngredientUtil } from './ingredient.util';

export class UnitUtil {
  getParentUnit(unit: Unit, units: Unit[]) {
    if (unit.isParent) {
      return unit;
    } else {
      const sameMetricUnits = units.filter((u) => {
        return u.metric === unit.metric;
      });

      return sameMetricUnits.find((u) => {
        return u.isParent;
      });
    }
  }

  convertIngredientToMainUnit(ingredient: Ingredient, units: Unit[]): Ingredient {
    const parentUnit = this.getParentUnit(ingredient.unit, units);
    if (parentUnit && parentUnit.id !== ingredient.unit.id) {
      const convertedIngredient = IngredientUtil.createEmpty();
      const amount = ingredient.amount * ingredient.unit.parenRatio;
      convertedIngredient.unit = parentUnit;
      convertedIngredient.amount = amount;
      return convertedIngredient;
    }
    return ingredient;
  }
}
