import { DilutionIngredients } from "../types/DilutionIngredients";
import { Spec } from "../types/Spec";
import { SpiritData } from "../types/SpiritData";
  
  export const getDilutionIngredients = (cocktail: Spec[], data: SpiritData[]): DilutionIngredients => {
    const ingredients: DilutionIngredients = {
      totalVolume: 0,
      totalAbv: 0,
      totalSugar: 0,
      totalAcid: 0,
    };
    
    cocktail.forEach((item) => {
      data.forEach((item2) => {
        if(item2.name === item.spirit){
          const volume = typeof(item.ounces) == 'string' ? parseFloat(item.ounces): item.ounces;
          ingredients.totalVolume += volume;
          ingredients.totalAbv += (volume * item2.abv);
          ingredients.totalSugar += (volume * item2.sugar_concentration);
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
  