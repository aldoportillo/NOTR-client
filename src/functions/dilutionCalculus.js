//The perfect cocktail
//Dilution %: 51% - 60% for shaken, 41 - 49 for stirred, 46-49 if egg white is added
//Final Volume oz: 5.28oz - 6.02oz
//Ethanol ABV %: 15% - 20%
//Sugar g/100ml: 5.00 - 8.90
//Acid %: 0.76 - 0.94
//Sugar/Acid - 7.5 - 11.00

//Equation to estimate Dilution 
//Params: ABV as %, shaken or stirred
//Output: Dilution as %

function estimateDilution(abv, technique){
    if(technique === 'shaken'){ //For 10 seconds
        return ((-1.567* Math.pow(abv, 2)) + (1.742 * abv) + 0.203)
    } else if (technique === 'stirred'){ //For 15 seconds
        return ((-1.21* Math.pow(abv, 2)) + (1.246 * abv) + 0.145)
    } else if(technique === 'built'){
        return 0.24
    }
    return false; //Have toast check for this false case and set a notification
}

function finalVolume(volume, dilution){
    return (volume * dilution) + volume
}

function finalEthanol(ethanol, initialVolume, finalVolume){
    return (ethanol * initialVolume) /finalVolume
}

function finalSugarContent(initialSugar, initialVolume, finalVolume) {
    return (initialSugar*initialVolume) / finalVolume
}

function finalAcidContent(initialAcid, initialVolume, finalVolume){
    return (initialAcid*initialVolume) / finalVolume * 100
}

function sugarAcidRatio(finalSugarContent, finalAcidContent){
    return finalSugarContent/ finalAcidContent
}


export const dilutionCalculus = (ingredients, technique) => {
    const attributes = {
      dilution: 0,
      finalVolume: 0, 
      abv: 0,
      sugarConcentration: 0,
      acid: 0,
      sugarAcid: 0,
    }

    attributes.dilution = estimateDilution(ingredients.totalAbv, technique)
    attributes.finalVolume = finalVolume(ingredients.totalVolume, attributes.dilution)
    attributes.abv = finalEthanol(ingredients.totalAbv, ingredients.totalVolume, attributes.finalVolume)
    attributes.sugarConcentration = finalSugarContent(ingredients.totalSugar, ingredients.totalVolume, attributes.finalVolume)
    attributes.acid = finalAcidContent(ingredients.totalAcid, ingredients.totalVolume, attributes.finalVolume)
    attributes.sugarAcid = sugarAcidRatio(attributes.sugarConcentration,attributes.acid)

    return attributes
}