import React from 'react'
import LiquidForm from '../components/LiquidForm'
import NutritionLabel from '../components/NutritionLabel/NutritionLabel'
import { getMacros } from '../functions/getMacros'
import { toast } from 'react-toastify'
import IngredientLists from '../components/IngredientLists/IngredientLists'
import LoadingGif from '../assets/loading.gif'
import { SpiritData } from '../types/SpiritData';
import { Spec } from '../types/Spec'
import styled from 'styled-components'

type Drinks = Spec[];

interface NutritionProps {
    spiritData: SpiritData[];
    loading: boolean;
    drinks: Drinks[];
    setDrinks: React.Dispatch<React.SetStateAction<Drinks[]>>; 
    setTotalEthanol: React.Dispatch<React.SetStateAction<number>>;
}

export default function Nutrition({ spiritData, loading, drinks, setDrinks, setTotalEthanol }: NutritionProps) {
    const [cocktail, setCocktail] = React.useState<Spec[]>([]);

    const addDrinkToState = () => {
        const ethanol = getMacros(cocktail, spiritData).ethanol;
        setTotalEthanol(totalEthanol => totalEthanol += ethanol);
        setDrinks([...drinks, cocktail]);
        toast(`🍸 Cocktail added. Visit my BAC page.🍸`);
        setCocktail([]);
    };

    const clearDrink = () => {
        toast(`🫗 Cocktail Spilled 🫗`);
        setCocktail([]);
    };

    return (
        <>
            {loading ? (
                <img src={LoadingGif} alt="loader" className="loader" />
            ) : (
                <Wrapper>
                    <h2>Nutrition Calculator</h2>
                    <LiquidForm setCocktail={setCocktail} cocktail={cocktail} spiritData={spiritData} />

                    <IngredientLists ingredients={cocktail} setIngredients={setCocktail} clearDrink={clearDrink} addDrinkToState={addDrinkToState} />

                    <NutritionLabel item={getMacros(cocktail, spiritData)} />
                </Wrapper>
            )}
        </>
    );
}

const Wrapper = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;




.liquid-form{
  width: 80vw;
}


@media only screen and (min-width:1025px) {

    display: grid;
    grid-template: "title title"
              "liquids macros"
              "ingredients macros";
              column-gap: 20px;
    row-gap: 20px;
    width: 100%;

    h2 {
    grid-area: title;
    text-align: center;
  }


    .liquid-form{
    grid-area: liquids;
    top: 0;
  }

    .ingredient-list{
    grid-area: ingredients;
  }

  .nutrition-label{
    grid-area: macros;
  }

  
    .liquid-form{
    width: auto;
  }
}
`