import React, { useEffect } from 'react'
import LiquidForm from '../components/LiquidForm'
import DilutionResults from '../components/DilutionResults/DilutionResults'
import { getDilutionIngredients } from '../functions/getDilutionIngredients'
import { dilutionCalculus } from '../functions/dilutionCalculus'
import IngredientLists from '../components/IngredientLists/IngredientLists'
import { SpiritData } from '../types/SpiritData'
import styled from 'styled-components'
import { CocktailAttributes } from '../types/CocktailAttributes'
import { Helmet } from 'react-helmet'
import { useDrinks } from '../context/DrinksContext'
import { useManageDrinks } from '../hooks/useManageDrinks'


interface DilutionProps {
  loading: boolean;
  spiritData: SpiritData[];
}

type Technique = 'shaken' | 'stirred' | 'built';


export default function Dilution({ loading, spiritData }: DilutionProps) {


  const { cocktail, setCocktail } = useDrinks();
  const [technique, setTechnique] = React.useState<Technique>("shaken");
  const { clearCocktail } = useManageDrinks(spiritData);

  const [cocktailAttributes, setCocktailAttributes] = React.useState<CocktailAttributes>({
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
      {loading ?
        <img src="../assets/loading.gif" alt="loader" className='loader' /> : 
        <>
        <Wrapper className='dilution-page'>
          <h2>Perfect Cocktail Calculator</h2>
          <LiquidForm technique={technique} setTechnique={setTechnique} cocktail={cocktail} setCocktail={setCocktail} spiritData={spiritData} />
          <IngredientLists ingredients={cocktail} setIngredients={setCocktail} spiritData={spiritData} clearDrink={clearCocktail} />
          <DilutionResults cocktailAttributes={cocktailAttributes} />
        </Wrapper>
        <Helmet>
            <title>Dilution Calculator | Neat on the Rocks</title>
            <meta name="description" content="Perfect Mix, Every Time: Unleash your inner mixologist with confidence. Our Perfect Cocktail Calculator ensures harmonious blends that tantalize your taste buds." />
            <meta name="keywords" content="perfect, cocktail, alcohol, calories, ethanol, abv, nutrition, glassware, bar, bartender, vodka, gin, tequila, best tequila, instructions" />
            <meta property="og:image" content="https://res.cloudinary.com/dkhtrg1ts/image/upload/v1702322801/NeatontheRocks/Cocktails/photo-1470337458703-46ad1756a187_xcfnzd.avif" />
            <meta name="twitter:image" content="https://res.cloudinary.com/dkhtrg1ts/image/upload/v1702322801/NeatontheRocks/Cocktails/photo-1470337458703-46ad1756a187_xcfnzd.avif" />
      </Helmet>
        </>
      }
    </>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  h2 {
    color: white;
  }

  .liquid-form {
    width: 80vw;
  }

  @media only screen and (min-width: 1025px) {
    display: grid;
    grid-template-areas:
      "title title"
      "liquids ingredients"
      "results results";
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
    
    h2 {
      grid-area: title;
      text-align: center;
    }

    .liquid-form {
      grid-area: liquids;
      width: 100%;  
    }

    .ingredient-list { 
      grid-area: ingredients;
      width: 100%; 
    }

    .dilution-results {
      grid-area: results;
      width: 100%;  
    }
  }
`;
