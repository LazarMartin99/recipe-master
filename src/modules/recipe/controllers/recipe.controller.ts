import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RecipeService } from '../services/recipe.service';
import { SearchRecipeDto } from '../dto/search-recipe.dto';
import { Recipe } from '../interfaces/recipe.interface';

@Controller('api/recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('search')
  async searchRecipes(@Body() searchDto: SearchRecipeDto) {
    //return await this.recipeService.searchRecipes(searchDto);
  }

  @Get(':id')
  async getRecipe(@Param('id') id: string): Promise<Recipe | null> {
    return await this.recipeService.getRecipeById(id);
  }

  /*@Get('suggest')
  async suggestIngredients(@Query('ingredient') ingredient: string): Promise<string[]> {
    return await this.recipeService.suggestIngredients(ingredient);
  }*/
}