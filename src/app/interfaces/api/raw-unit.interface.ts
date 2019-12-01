import { Unit } from '../unit/unit';

export interface RawUnit {
  'id': number,
  'name': string,
  'metric': string,
  'isParent': boolean,
  'parentUnit'?: Unit,
  'parentRatio'?: number,
  'synonyms?': string[]
}
