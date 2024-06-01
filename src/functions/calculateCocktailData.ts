import { Spec } from '../types/Spec';
import { SpiritData } from '../types/SpiritData';
import { getMacros } from './getMacros';
import { getDilutionIngredients } from './getDilutionIngredients';
import { dilutionCalculus } from './dilutionCalculus';
import { Technique } from '../types/Technique';
import { CocktailOutput } from '../types/CocktailOutput';

export function calculateCocktailData(cocktail: Spec[], spiritsData: SpiritData[], technique: Technique): CocktailOutput {

  const macros = getMacros(cocktail, spiritsData);

  const cocktailAttributes = dilutionCalculus(getDilutionIngredients(cocktail, spiritsData), technique);

  return ({
    name: 'Cocktail',
    ethanol: macros.ethanol,
    carbs: macros.carb ,
    calories: macros.calories ,
    fat: macros.fat,
    protein: macros.protein,
    sugar: macros.sugar,
    addedSugar: macros.addedsugar,
    ounces: cocktailAttributes.finalVolume,
    abv: cocktailAttributes.abv,
    sugarAcid: cocktailAttributes.sugarAcid
})
}
