import { Spec } from '../types/Spec';
import { Macros } from '../types/Macros';
import { SpiritData } from '../types/SpiritData';

export const getMacros = (cocktail: Spec[], data: SpiritData[]): Macros => {
  const macros: Macros = {
    fat: 0,
    carb: 0,
    sugar: 0,
    addedsugar: 0,
    protein: 0,
    calories: 0,
    ethanol: 0,
  };

  cocktail.forEach((item) => {
    data.forEach((item2) => {
      if (item2.name === item.spirit) {
        const amount = item.ounces ?? 0;
        macros.calories += amount * item2.calories;
        macros.protein += amount * item2.protein;
        macros.addedsugar += amount * item2.addedSugar;
        macros.sugar += amount * item2.sugar;
        macros.carb += amount * item2.carb;
        macros.fat += amount * item2.fat;
        macros.ethanol += amount * item2.ethanol;
      }
    });
  });

  return macros;
};

//?? (item.dashes ?? 0) * 0.02083333333;  1 dash = 1/48th of an ounce