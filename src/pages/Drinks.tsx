import useFetchData from "../hooks/useFetchData"
import { useAuth } from "../context/AuthContext"
import NutritionLabel from "../components/NutritionLabel";
import { CocktailOutput } from "../types/CocktailOutput";
import { formatDateTime } from "../functions/formatDateTime";

function Drinks() {

    const { auth } = useAuth()

    

    const res = useFetchData('http://localhost:5000/cocktail-entry', auth.token)

   console.table(res.data);

   const renderDrinks = res.data?.map((drink: CocktailOutput) => {
    console.log(drink)
      return (
        <div key={drink._id}>
          <h1>ID {drink._id}</h1>
          <h1>{drink.name}</h1>
          <h2>ABV: {(drink.abv * 100).toFixed(2)}%</h2>
          <h2>OZ: {drink.ounces.toFixed(2)}</h2>
          <h2>Sugar Acid: {drink.sugarAcid?.toFixed(2)}</h2>
          <h2>Time: {formatDateTime(drink.timestamp)}</h2>
          <NutritionLabel macros={{calories: drink.calories, ethanol: drink.ethanol, fat: drink.fat, carb: drink.carbs, sugar: drink.sugar, addedsugar: drink.addedSugar, protein: drink.protein}} />
        </div>
      )
   })
   
  return (
    <>
    <div>Drinks</div>
    {renderDrinks}
    </>
  )
}

export default Drinks