import LiquidForm from '../components/LiquidForm'
import NutritionLabel from '../components/NutritionLabel'
import { getMacros } from '../functions/getMacros'
import IngredientLists from '../components/IngredientLists'
import LoadingGif from '../assets/loading.gif'
import { SpiritData } from '../types/SpiritData';
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { useDrinks } from '../context/DrinksContext'
import { useManageDrinks } from '../hooks/useManageDrinks'
import { useEffect, useState } from 'react'
import { dilutionCalculus } from '../functions/dilutionCalculus'
import { getDilutionIngredients } from '../functions/getDilutionIngredients'
import { CocktailAttributes } from '../types/CocktailAttributes'
import DilutionResults from '../components/DilutionResults'

interface NutritionProps {
    spiritData: SpiritData[];
    loading: boolean;
}

type Technique = 'shaken' | 'stirred' | 'built';

export default function Nutrition({ spiritData, loading }: NutritionProps) {

  const { cocktail, setCocktail } = useDrinks(); 
  const { clearCocktail } = useManageDrinks(spiritData);
  const [technique, setTechnique] = useState<Technique>("shaken");

  const [cocktailAttributes, setCocktailAttributes] = useState<CocktailAttributes>({
    dilution: 0,
    finalVolume: 0,
    abv: 0,
    sugarConcentration: 0,
    acid: 0,
    sugarAcid: 0,
  });

  useEffect(() => {
    if (!loading) {
      setCocktailAttributes(dilutionCalculus(getDilutionIngredients(cocktail, spiritData), technique));
    }
  }, [cocktail, technique, spiritData, loading]);


    return (
        <>
            {loading ? (
                <img src={LoadingGif} alt="loader" className="loader" />
            ) : (
                <Wrapper>
                    <h2>Nutrition Calculator</h2>
                    <LiquidForm technique={technique} setTechnique={setTechnique} setCocktail={setCocktail} cocktail={cocktail} spiritData={spiritData} />

                    <IngredientLists ingredients={cocktail} setIngredients={setCocktail} clearDrink={clearCocktail} spiritData={spiritData} />

                    <NutritionLabel macros={getMacros(cocktail, spiritData)} />

                    <DilutionResults cocktailAttributes={cocktailAttributes} />
                </Wrapper>
            )}
            <Helmet>
              <title>Nutrition Calculator | Neat on the Rocks</title>
              <meta name="description" content="Nutrition in Every Sip: Maintain your nutritional balance while enjoying your favorite libations. Our Macronutrient Calculator empowers you to make informed choices." />
              <meta name="keywords" content="perfect, cocktail, alcohol, calories, ethanol, abv, nutrition, glassware, bar, bartender, vodka, gin, tequila, best tequila, instructions, bac" />
              <meta property="og:image" content="https://res.cloudinary.com/dkhtrg1ts/image/upload/v1702322801/NeatontheRocks/Cocktails/photo-1470337458703-46ad1756a187_xcfnzd.avif" />
              <meta name="twitter:image" content="https://res.cloudinary.com/dkhtrg1ts/image/upload/v1702322801/NeatontheRocks/Cocktails/photo-1470337458703-46ad1756a187_xcfnzd.avif" />
          </Helmet>
        </>
    );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .liquid-form {
    width: 80vw;
  }

  @media only screen and (min-width: 1025px) {
    display: grid;
    grid-template-areas:
      "title title"
      "liquids macros"
      "ingredients macros"
      "results results";
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
    width: 100%;

    h2 {
      grid-area: title;
      text-align: center;
    }

    .liquid-form {
      grid-area: liquids;
    }

    .ingredient-list {
      grid-area: ingredients;
    }

    .nutrition-label {
      grid-area: macros;
      height: 100%;
    }

    .liquid-form,
    .nutrition-label {
      width: 100%; 
    }
  }
`;
