import { RawIngredient } from './raw-ingredient.interface';

export interface RawRecipe{
  'id': number,
  'name': string,
  'nameAddition': string,
  'description': string,
  'imagePath': string,
  'creationDate': Date,
  'steps': [],
  'ingredients': RawIngredient[],
  'nutrients': [],
  'equipment': []
}
