"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose = tslib_1.__importStar(require("mongoose"));
const mongoose_1 = require("mongoose");
const UnitSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    metric: { type: String, required: true },
    isParent: { type: Boolean, required: true },
    synonyms: { type: [String] }
});
exports.default = mongoose.model('Unit', UnitSchema);
