import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IRecipe } from '../interfaces/recipe.interface';
import { StepSchema } from './step.schema';
import { IngredientSchema } from './Ingredient.schema';

const RecipeSchema: Schema = new Schema({
    name: {type: String, required: true, unique: true},
    nameAddition: {type: String, required: true},
    description: {type: String, required: true},
    imagePath: {type: String, required: true},
    ingredients: [IngredientSchema],
    steps: [StepSchema],
    nutrients: [{type: String}],
    equipment: [{type: String}],
    source: {type: String}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRecipe>('Recipe', RecipeSchema);
