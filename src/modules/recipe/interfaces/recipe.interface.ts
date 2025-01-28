import { RecipeIngredient } from './recipe-ingredient.interface';

export interface Recipe {
  id: string;              
  title: string;           
  directions: string[];    
  link: string;           
  source: string;         
  site: string;           
  createdAt: number;
  // Töröljük az ingredients és ner mezőket, helyette:
  recipeIngredients?: RecipeIngredient[]; // A kapcsolótábla adatai
}