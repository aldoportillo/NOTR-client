import React from 'react'
import LiquidForm from '../components/LiquidForm'
import DilutionResults from '../components/DilutionResults'
import { getDilutionIngredients } from '../functions/getDilutionIngredients'
import { dilutionCalculus } from '../functions/dilutionCalculus'
import IngredientLists from '../components/IngredientLists'
import { getMacros } from '../functions/getMacros'
import { toast } from 'react-toastify'
import { SpiritData } from '../types/SpiritData'
import { Spec } from '../types/Spec'

interface DilutionProps {
    loading: boolean;
    spiritData: SpiritData[];
    drinks: Spec[];
    setDrinks: React.Dispatch<React.SetStateAction<Spec[]>>;
    setTotalEthanol: React.Dispatch<React.SetStateAction<number>>;
}

export default function Dilution({loading, spiritData, drinks, setDrinks, setTotalEthanol}: DilutionProps) {

    const [cocktail, setCocktail] = React.useState([])
    const [cocktailAttributes, setCocktailAttributes] = React.useState({
      dilution: 0,
      finalVolume: 0, 
      abv: 0,
      sugarConcentration: 0,
      acid: 0,
      sugarAcid: 0,
  })
  const [technique, setTechnique] = React.useState("shaken")
  
    React.useEffect(() => {
      if(!loading){
        setCocktailAttributes(dilutionCalculus(getDilutionIngredients(cocktail, spiritData), technique))
      }
    }, [cocktail, technique, spiritData, loading ])

    const addDrinkToState = () => {
      const ethanol = getMacros(cocktail, spiritData).ethanol
      setTotalEthanol(totalEthanol => totalEthanol += ethanol)
      setDrinks([...drinks, cocktail])
      toast(`🍸 Cocktail added. Visit my BAC page.🍸`)
      setCocktail([])
     }
  
     const clearDrink = () => {
      toast(`🫗 Cocktail Spilled 🫗`)
      setCocktail([])
     }
    
  return (
    <>
      {loading ?
        <img src={require("../assets/loading.gif")} alt="" className='loader'/> :
        <div className='dilution-page'> 
        <h2>Perfect Cocktail Calculator</h2>
        <LiquidForm title="oops" setTechnique={setTechnique} cocktail={cocktail} setCocktail={setCocktail} spiritData={spiritData}  />
        <IngredientLists ingredients={cocktail} setIngredients={setCocktail} addDrinkToState={addDrinkToState} clearDrink={clearDrink}/>
        <DilutionResults cocktailAttributes={cocktailAttributes}/>
      </div>
      }
    </>
   
  )
}
