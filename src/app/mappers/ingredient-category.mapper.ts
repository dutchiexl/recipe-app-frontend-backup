import { RawIngredientCategory } from '../interfaces/api/raw-ingredient-category.interface';
import { IngredientCategory } from '../interfaces/recipe/ingredient-category';

export class IngredientCategoryMapper {
  public static toModel(rawIngredientCategory: RawIngredientCategory): IngredientCategory {
    return {
      name: rawIngredientCategory.name
    };
  }
}
