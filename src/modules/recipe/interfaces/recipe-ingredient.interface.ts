export interface RecipeIngredient {
    recipeId: string;     // Partition key
    ingredientId: string; // Sort key
    amount?: number;      // Mennyiség
    unit?: string;        // Mértékegység
    notes?: string;       // További megjegyzések (pl. "szeletelt", "darált")
  }