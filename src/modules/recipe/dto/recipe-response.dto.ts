import { Recipe } from '../interfaces/recipe.interface';

export class RecipeResponseDto {
  recipes: Recipe[];
  totalCount: number;
  matchType: 'exact' | 'partial' | 'fuzzy';
}