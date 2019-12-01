import { RawUnit } from '../interfaces/api/raw-unit.interface';
import { Unit } from '../interfaces/unit/unit';
import { MetricMapper } from './metric.mapper';

export class UnitMapper {

  public static toModel(rawUnit: RawUnit): Unit {
    let unit: Unit = {
      id: rawUnit.id,
      name: rawUnit.name,
      metric: MetricMapper.toModel(rawUnit.metric),
      isParent: rawUnit.isParent,
      synonyms: rawUnit['synonyms?']
    };
    if (rawUnit.parentUnit) {
      unit.parenUnit = rawUnit.parentUnit;
    }
    if (rawUnit.parentRatio) {
      unit.parenRatio = rawUnit.parentRatio;
    }

    return unit;
  }
}
