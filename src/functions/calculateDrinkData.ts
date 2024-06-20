import { CocktailOutput } from "../types/CocktailOutput";
import { DrinksCocktail } from "../types/DrinksCocktail";

export function calculateDrinkData(info: DrinksCocktail): CocktailOutput{

    return {
        name: info.name,
        ethanol: info.ethanol,
        carbs: 0,
        calories: 0,
        fat: 0,
        protein: 0,
        sugar: 0,
        added_sugar: 0,
        ounces: info.ounces,
        abv: info.abv,
        sugarAcid: 0
    }
}