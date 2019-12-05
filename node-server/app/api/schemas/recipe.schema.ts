import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IRecipe } from '../interfaces/recipe.interface';
import { StepSchema } from './step.schema';

const RecipeSchema: Schema = new Schema({
    name: {type: String, required: true, unique: true},
    nameAddition: {type: String, required: true},
    description: {type: String, required: true},
    imagePath: {type: String, required: true},
    ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
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
