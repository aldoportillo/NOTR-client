export interface CocktailOutput {
    _id?: number;
    name: string;
    ethanol: number;
    carbs: number;
    calories: number;
    fat: number;
    protein: number;
    sugar: number;
    addedSugar: number;
    ounces: number;
    abv: number;
    sugarAcid: number;
    timestamp?: string;
  }