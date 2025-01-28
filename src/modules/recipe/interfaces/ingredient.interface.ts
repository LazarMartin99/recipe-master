export interface Ingredient {
    id: string;           // Partition key
    name: string;         // A hozzávaló neve
    normalized_name: string;  // Normalizált név kereséshez
    aliases?: string[];   // Alternatív nevek (pl. "paradicsom" és "tomato")
    category?: string;    // Kategória (pl. "zöldség", "hús", stb.)
    unit?: string;        // Alapértelmezett mértékegység
  }