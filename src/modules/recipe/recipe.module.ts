import { Module } from '@nestjs/common';
import { RecipeController } from './controllers/recipe.controller';
import { RecipeService } from './services/recipe.service';
import { IngredientService } from './services/ingredient.service';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, IngredientService],
})
export class RecipeModule {}