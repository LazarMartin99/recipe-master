// src/modules/recipe/entities/recipe-ingredient.entity.ts
export class RecipeIngredientEntity {
    recipeId: string;
    ingredientId: string;
    amount?: number;
    unit?: string;
    notes?: string;
  
    constructor(partial: Partial<RecipeIngredientEntity>) {
      Object.assign(this, partial);
    }
  
    // Hasznos metódusok:
    getFormattedAmount(): string {
      if (!this.amount) return '';
      return `${this.amount} ${this.unit || ''}`.trim();
    }
  
    getFullDescription(): string {
      return `${this.getFormattedAmount()} ${this.notes || ''}`.trim();
    }
  }