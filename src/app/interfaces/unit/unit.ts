import { Metric } from '../../enums/metric';

export interface Unit {
  id: number;
  name: string;
  metric: Metric;
  isParent: boolean;
  parenUnit?: Unit;
  parenRatio?: number;
  synonyms: string[];
}
