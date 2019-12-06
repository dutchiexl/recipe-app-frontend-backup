"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.IngredientSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Unit' }
});
