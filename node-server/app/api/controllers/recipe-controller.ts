import { Request, Response } from 'express';
import { Controller, Get, Post } from '@overnightjs/core';
import Recipe from '../schemas/recipe.schema';
import { Logger } from '@overnightjs/logger';

@Controller('api/recipes')
export class RecipeController {

  @Get()
  private getRecipes(req: Request, res: Response) {
    Recipe.find().then(recipes => {
      Logger.Info(recipes);
      res.status(200).json(recipes);
    });
  }

  @Post()
  private InsertRecipe(req: Request, res: Response) {
    Logger.Info(req.body, true);
    new Recipe(req.body).save().then(result => {
      res.status(200).json();
    });
  }
}
