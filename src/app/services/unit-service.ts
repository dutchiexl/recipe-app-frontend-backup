import { Unit } from '../interfaces/unit/unit';
import { Ingredient } from '../interfaces/recipe/ingredient.interface';
import { IngredientUtil } from '../utils/ingredient.util';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RawUnit } from '../interfaces/api/raw-unit.interface';
import { UnitMapper } from '../mappers/unit.mapper';

export class UnitService {
  cache: Observable<Unit>;
  callbackUrl = 'http://localhost:3000/units';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Unit[]> {
    return this.http.get(this.callbackUrl).pipe(
      map((rawData: RawUnit[]) => {
        return rawData.map((rawUnitData) => UnitMapper.toModel(rawUnitData));
      })
    );
  }

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
    const parentUnit = this.getParentUnit(ingredient.quantifier, units);
    if (parentUnit && parentUnit.id !== ingredient.quantifier.id) {
      const convertedIngredient = IngredientUtil.createEmpty();
      const amount = ingredient.amount * ingredient.quantifier.parenRatio;
      convertedIngredient.quantifier = parentUnit;
      convertedIngredient.amount = amount;
      return convertedIngredient;
    }
    return ingredient;
  }
}
