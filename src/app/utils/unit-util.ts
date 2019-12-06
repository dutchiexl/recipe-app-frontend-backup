import { Unit } from '../interfaces/unit/unit';
import { Ingredient } from '../interfaces/recipe/ingredient.interface';
import { IngredientUtil } from './ingredient.util';
import { Item } from '../interfaces/recipe/item.interface';
import { ItemUtil } from './item.util';

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

  convertItemstToMainUnit(item: Item, units: Unit[]): Item {
    const parentUnit = this.getParentUnit(item.unit, units);
    if (parentUnit && parentUnit.id !== item.unit.id) {
      const convertedItem = ItemUtil.createEmpty();
      const amount = item.amount * item.unit.parenRatio;
      convertedItem.unit = parentUnit;
      convertedItem.amount = amount;
      return convertedItem;
    }
    return item;
  }
}
