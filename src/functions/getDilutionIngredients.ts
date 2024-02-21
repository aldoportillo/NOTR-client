interface CocktailIngredient {
    spirit: string;
    ounces?: number;
    dashes?: number;
  }
  
  interface IngredientData {
    name: string;
    abv: number; // Alcohol by volume as a percentage
    sugarConcentration: number; // Sugar concentration in grams per ounce
    acid: number; // Acid in grams per ounce
  }
  
  interface DilutionIngredients {
    totalVolume: number;
    totalAbv: number; // This will be adjusted to a percentage of alcohol by volume
    totalSugar: number; // Total sugar in grams
    totalAcid: number; // Total acid in grams
  }
  
  export const getDilutionIngredients = (cocktail: CocktailIngredient[], data: IngredientData[]): DilutionIngredients => {
    const ingredients: DilutionIngredients = {
      totalVolume: 0,
      totalAbv: 0,
      totalSugar: 0,
      totalAcid: 0,
    };
  
    cocktail.forEach((item) => {
      data.forEach((item2) => {
        if(item2.name === item.spirit){
          const volume = item.ounces ?? (item.dashes ? item.dashes * 0.02083333333 : 0);
          ingredients.totalVolume += volume;
          ingredients.totalAbv += (volume * item2.abv);
          ingredients.totalSugar += (volume * item2.sugarConcentration);
          ingredients.totalAcid += (volume * item2.acid);
        }
      });
    });
  
    // Adjust totals by total volume, ensuring we don't divide by zero
    if (ingredients.totalVolume > 0) {
      ingredients.totalAbv /= ingredients.totalVolume;
      ingredients.totalSugar /= ingredients.totalVolume;
      ingredients.totalAcid /= ingredients.totalVolume;
    }
  
    return ingredients;
  };
  