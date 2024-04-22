import { Cocktail } from '../types/Cocktail';

interface NutritionalInfo {
  name: string;
  calories: number;
  protein: number;
  addedSugar: number;
  sugar: number;
  carb: number;
  fat: number;
  ethanol: number;
}

interface Macros {
  fat: number;
  carb: number;
  sugar: number;
  addedSugar: number;
  protein: number;
  calories: number;
  ethanol: number;
}

export const getMacros = (cocktail: Cocktail[], data: NutritionalInfo[]): Macros => {
  const macros: Macros = {
    fat: 0,
    carb: 0,
    sugar: 0,
    addedSugar: 0,
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
        macros.addedSugar += amount * item2.addedSugar;
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