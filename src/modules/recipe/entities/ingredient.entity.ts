// src/modules/recipe/entities/ingredient.entity.ts
export class IngredientEntity {
    id: string;
    name: string;
    normalized_name: string;
    aliases?: string[];
    category?: string;
    unit?: string;
  
    constructor(partial: Partial<IngredientEntity>) {
      Object.assign(this, partial);
    }
  
    // Hasznos metódusok:
    getAllNames(): string[] {
      return [this.name, ...(this.aliases || [])];
    }
  
    matchesSearch(searchTerm: string): boolean {
      const normalizedSearch = searchTerm.toLowerCase().trim();
      return this.getAllNames().some(name => 
        name.toLowerCase().includes(normalizedSearch)
      );
    }
  }