// src/modules/recipe/entities/recipe.entity.ts
import { RecipeIngredient } from '../interfaces/recipe-ingredient.interface';

export class RecipeEntity {
  id: string;
  title: string;
  directions: string[];
  link: string;
  source: string;
  site: string;
  createdAt: number;
  recipeIngredients?: RecipeIngredient[];

  constructor(partial: Partial<RecipeEntity>) {
    Object.assign(this, partial);
  }

  // Hasznos metódusok például:
  getTotalIngredients(): number {
    return this.recipeIngredients?.length || 0;
  }

  hasIngredient(ingredientId: string): boolean {
    return this.recipeIngredients?.some(ri => ri.ingredientId === ingredientId) || false;
  }
}