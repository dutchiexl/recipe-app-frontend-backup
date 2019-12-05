import { Document } from 'mongoose';
import { IIngredientCategory } from './ingredient-category.interface';
import { IUnit } from './unit.interface';

export interface IIngredient extends Document {
  name: string,
  amount: number,
  category: IIngredientCategory,
  unit: IUnit
}
