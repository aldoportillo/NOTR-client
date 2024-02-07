export const getDilutionIngredients = (cocktail, data) => {
    const ingredients = {
        totalVolume: 0,
        totalAbv: 0,
        totalSugar: 0,
        totalAcid: 0,
    }

    cocktail.map((item) => {
        data.map((item2) => {
            if(item2.name === item.spirit){
                if (item.ounces) {
                    item.ounces = item.ounces /1
                    ingredients.totalVolume += item.ounces
                    ingredients.totalAbv += (item.ounces * item2.abv)//Maybe divide after
                    ingredients.totalSugar += (item.ounces * item2.sugarConcentration)
                    ingredients.totalAcid += (item.ounces * item2.acid)
                } else {
                    item.dashes = item.dashes /1
                    ingredients.totalVolume += item.dashes * 0.02083333333
                    ingredients.totalAbv += (item.dashes * 0.02083333333 * item2.abv) //Maybe divide after
                    ingredients.totalSugar += (item.dashes * 0.02083333333 *item2.sugarConcentration)
                    ingredients.totalAcid += (item.dashes * 0.02083333333 * item2.acid)
                }
                
            }
            return null
        })
        return null
    })
    ingredients.totalAbv /= ingredients.totalVolume
    ingredients.totalSugar /= ingredients.totalVolume
    ingredients.totalAcid /= ingredients.totalVolume
    return ingredients
}