import { Schema } from 'mongoose';

export const IngredientSchema: Schema = new Schema({
    name: {type: String, required: true, unique: true},
    amount: {type: Number, required: true},
    category: {type: String, required: true},
    unit: {type: Schema.Types.ObjectId, ref: 'Unit'}
  }
);
