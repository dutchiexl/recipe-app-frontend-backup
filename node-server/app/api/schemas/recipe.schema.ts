import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { IRecipe } from '../interfaces/recipe.interface';

const RecipeSchema: Schema = new Schema({
  name: {type: String, required: true, unique: true}
});

export default mongoose.model<IRecipe>('Recipe', RecipeSchema);
