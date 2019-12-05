"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const recipe_schema_1 = tslib_1.__importDefault(require("../schemas/recipe.schema"));
let RecipeController = class RecipeController {
    getRecipes(req, res) {
        recipe_schema_1.default.find().then(recipes => {
            res.status(200).json({
                recipes: recipes
            });
        });
    }
};
tslib_1.__decorate([
    core_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RecipeController.prototype, "getRecipes", null);
RecipeController = tslib_1.__decorate([
    core_1.Controller('api/recipes')
], RecipeController);
exports.RecipeController = RecipeController;
