import { toast } from "react-toastify";
import { CocktailAttributes } from "../types/CocktailAttributes";
import { Technique } from "../types/Technique";

interface Ingredients {
    totalAbv: number;
    totalVolume: number;
    totalSugar: number;
    totalAcid: number;
}

function estimateDilution(abv: number, technique: Technique): number | false {
    if (technique === 'shaken') {
        return ((-1.567 * Math.pow(abv, 2)) + (1.742 * abv) + 0.203);
    } else if (technique === 'stirred') {
        return ((-1.21 * Math.pow(abv, 2)) + (1.246 * abv) + 0.145);
    } else if (technique === 'built') {
        return 0.24;
    }
    return false;
}

function finalVolume(volume: number, dilution: number | false): number {
    if (typeof dilution === "number") {
        return (volume * dilution) + volume;
    }
    return volume; 
}

function finalEthanol(ethanol: number, initialVolume: number, finalVolume: number): number {
    return (ethanol * initialVolume) / finalVolume;
}

function finalSugarContent(initialSugar: number, initialVolume: number, finalVolume: number): number {
    return (initialSugar * initialVolume) / finalVolume;
}

function finalAcidContent(initialAcid: number, initialVolume: number, finalVolume: number): number {
    return (initialAcid * initialVolume) / finalVolume * 100;
}

function sugarAcidRatio(finalSugarContent: number, finalAcidContent: number): number {
    const sugarAcid = finalSugarContent / finalAcidContent;
    if (!isFinite(sugarAcid)) {
        return 0;
    }
    return sugarAcid;
}

export const dilutionCalculus = (ingredients: Ingredients, technique: Technique): CocktailAttributes => {
    const initialDilution = estimateDilution(ingredients.totalAbv, technique);

    if (typeof initialDilution !== "number") {

        toast("Unable to calculate dilution with the given technique.");
        return {} as CocktailAttributes; // Return an empty object if dilution is false
    }

    const calculatedFinalVolume = finalVolume(ingredients.totalVolume, initialDilution);
    const calculatedAbv = finalEthanol(ingredients.totalAbv, ingredients.totalVolume, calculatedFinalVolume);
    const calculatedSugarConcentration = finalSugarContent(ingredients.totalSugar, ingredients.totalVolume, calculatedFinalVolume);
    const calculatedAcid = finalAcidContent(ingredients.totalAcid, ingredients.totalVolume, calculatedFinalVolume);
    const calculatedSugarAcidRatio = sugarAcidRatio(calculatedSugarConcentration, calculatedAcid);

    const attributes: CocktailAttributes = {
        dilution: initialDilution,
        finalVolume: calculatedFinalVolume,
        abv: calculatedAbv,
        sugarConcentration: calculatedSugarConcentration,
        acid: calculatedAcid,
        sugar_acid: calculatedSugarAcidRatio,
    };

    return attributes;

};
