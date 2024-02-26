import { Link, useLocation } from 'react-router-dom';
import { getMacros } from '../functions/getMacros';
import NutritionLabel from '../components/NutritionLabel/NutritionLabel';
import { toast } from 'react-toastify';
import React from 'react';
import { Spec } from '../types/Spec';
import { SpiritData } from '../types/SpiritData';
import { CocktailData } from '../types/CocktailData';
import Button from '../components/Button';

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
    <div className='cocktail-page'>
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
      <Button href="/cocktails" variant="secondary" size="large">Back to Cocktails</Button>
      {/* <button onClick={addToDrinks}>Add to Drinks</button> */}
      <Button variant="primary" size="large" href={addToDrinks}>Add to Drinks</Button> {/*Buggy Don't Create Pull Request*/}
    </div>
  );
}
