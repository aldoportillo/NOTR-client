import { toast } from "react-toastify";

interface Ingredients {
    totalAbv: number;
    totalVolume: number;
    totalSugar: number;
    totalAcid: number;
}

interface Attributes {
    dilution: number | false;
    finalVolume: number;
    abv: number;
    sugarConcentration: number;
    acid: number;
    sugarAcid: number;
}

type Technique = 'shaken' | 'stirred' | 'built';

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
    return volume; // Return the original volume if dilution is false
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
    return finalSugarContent / finalAcidContent;
}

export const dilutionCalculus = (ingredients: Ingredients, technique: Technique): Attributes => {
    const initialDilution = estimateDilution(ingredients.totalAbv, technique);

    if (typeof initialDilution !== "number") {

        toast("Unable to calculate dilution with the given technique.");
        return {} as Attributes; // Return an empty object if dilution is false
    }

    const calculatedFinalVolume = finalVolume(ingredients.totalVolume, initialDilution);
    const calculatedAbv = finalEthanol(ingredients.totalAbv, ingredients.totalVolume, calculatedFinalVolume);
    const calculatedSugarConcentration = finalSugarContent(ingredients.totalSugar, ingredients.totalVolume, calculatedFinalVolume);
    const calculatedAcid = finalAcidContent(ingredients.totalAcid, ingredients.totalVolume, calculatedFinalVolume);
    const calculatedSugarAcidRatio = sugarAcidRatio(calculatedSugarConcentration, calculatedAcid);

    const attributes: Attributes = {
        dilution: initialDilution,
        finalVolume: calculatedFinalVolume,
        abv: calculatedAbv,
        sugarConcentration: calculatedSugarConcentration,
        acid: calculatedAcid,
        sugarAcid: calculatedSugarAcidRatio,
    };

    return attributes;

};
