import { getMacros } from '../functions/getMacros';
import NutritionLabel from '../components/NutritionLabel/NutritionLabel';
import { toast } from 'react-toastify';
import React from 'react';
import { Spec } from '../types/Spec';
import { SpiritData } from '../types/SpiritData';
import { CocktailData } from '../types/CocktailData';
import Button from '../components/Button/Button';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

type Drinks = Spec[];

interface CocktailProps {
  spiritData: SpiritData[];
  setTotalEthanol: React.Dispatch<React.SetStateAction<number>>;
  setDrinks: React.Dispatch<React.SetStateAction<Drinks[]>>;
}

export default function Cocktail({ spiritData, setDrinks, setTotalEthanol }: CocktailProps) {
  const location = useLocation();
  const data = location.state as { data: CocktailData }; 

  const { name, specs, instructions, description, image, glass, garnish } = data.data;

  const renderSpecList = specs.map((spirit, index) => {
    return (
      <li key={index}>
        {spirit.dashes ? `${spirit.dashes} dashes of ${spirit.spirit}` : `${spirit.ounces} oz of ${spirit.spirit}`}
      </li>
    );
  });

  const renderInstructions = instructions.map((instruction, index) => (
    <li key={index}>{instruction}</li>
  ));

  const addToDrinks = () => {
    setDrinks((currentDrinks) => [...currentDrinks, specs]);
    setTotalEthanol((currentEthanol) => currentEthanol + getMacros(specs, spiritData).ethanol);
    toast(`🍸 ${name} added to Drinks. 🍸`);
  };

  return (
    <>
      <Wrapper className='cocktail-page'>
        <h2>{name}</h2>
        <img src={image.filePath} alt={name} />
        <p>{description}</p>
        <div className='space-between'>
          <div>
            <h3>Spec List</h3>
            <ul>{renderSpecList}</ul>
            <h3>Instructions</h3>
            <ol>{renderInstructions}</ol>
            <h3>Glassware</h3>
            <p>{glass}</p>
            <h3>Garnish</h3>
            <p>{garnish}</p>
          </div>
          <NutritionLabel item={getMacros(specs, spiritData)} />
        </div>
        <div className="inline">
          <Button to="/cocktails" variant="secondary" size="small">Back to Cocktails</Button>
          <Button variant="primary" size="small" onClick={addToDrinks}>Add to Drinks</Button>
        </div> 
      </Wrapper>

      <Helmet>
        <title>{ name } | Neat on the Rocks</title>
        <meta name="description" content={ description } />
        <meta name="keywords" content="alcohol, calories, ethanol, abv, nutrition, glassware, bar, bartender, vodka, gin, tequila, best tequila, instructions" />
        <meta property="og:image" content={ image.filePath } />
        <meta name="twitter:image" content={ image.filePath } />
      </Helmet>
    </>
  );
}

const Wrapper = styled.div`

  display: flex;
  flex-direction: column;
  margin: 5vw 30vw 0vw 30vw;

  img{
    width: 80vw; /* I don't like this solution but for some reason the wrapper set to 100% and img set to 100% isn't inheriting the width from the wrapper */
  }

  .inline{
    display: flex;
    justify-content: flex-start;
  }

  @media only screen and (min-width:1025px) {
    .space-between{
      display: flex;
      gap: 20px;
      justify-content: space-between;
    }
    .space-between > div{
      flex: 1;
    }

    }

    .inline{
      justify-content: space-between;
     
      gap: 20px;
    }
    


  
`