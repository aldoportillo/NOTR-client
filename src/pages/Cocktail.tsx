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
        <Button to="/cocktails" variant="secondary" size="large">Back to Cocktails</Button>
        <Button variant="primary" size="large" onClick={addToDrinks}>Add to Drinks</Button>
      </div> 
    </Wrapper>
  );
}

const Wrapper = styled.div`

  display: flex;
  flex-direction: column;
  margin: 5vw 30vw 0vw 30vw;

  img{
    width: 80vw; /* I don't like this solution but for some reason the wrapper set to 100% and img set to 100% isn't inheriting the width from the wrapper */
  }

  .space-between{
    display: flex;
    justify-content: space-between;
    gap: 20px;

  }

  .space-between > div{
    flex: 1;
  }
  
`