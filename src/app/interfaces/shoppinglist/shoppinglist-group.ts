import { IngredientCategory } from '../../enums/ingredient-category';
import { Item } from '../recipe/item.interface';

export interface ShoppinglistGroup {
  category: IngredientCategory;
  items: Item[];
}
