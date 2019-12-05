import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import Recipe from '../schemas/recipe.schema';

@Controller('api/recipes')
export class RecipeController {

  @Get()
  private getRecipes(req: Request, res: Response) {
    Recipe.find().then(recipes => {
      res.status(200).json({
        recipes: recipes
      });
    });
  }
}
