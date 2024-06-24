import { getMacros } from '../functions/getMacros';
import NutritionLabel from '../components/NutritionLabel';
import React, { useEffect } from 'react';
import { SpiritData } from '../types/SpiritData';
import { CocktailData } from '../types/CocktailData';
import Button from '../components/Button';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Macros } from '../types/Macros';
import { useManageDrinks } from '../hooks/useManageDrinks';

interface CocktailProps {
  spiritData: SpiritData[];
}

export default function Cocktail({ spiritData }: CocktailProps) {
  const location = useLocation();
  const data = location.state as { data: CocktailData }; 



  const { name, specs, description, image_url, glass, garnish, technique } = data.data;
  const { addDrinkToState } = useManageDrinks(spiritData);

  const renderSpecList = specs.map((spec, index) => {
    return (
      <li key={index}>
        {spec.ounces} oz of {spec.spirit}
      </li>
    );
  });

  console.log(specs);

  const [macros, setMacros] = React.useState<Macros>({
    "fat": 0,
    "carb": 0,
    "sugar": 0,
    "added_sugar": 0,
    "protein": 0,
    "calories": 0,
    "ethanol": 0
});

  useEffect(() => {
    setMacros(getMacros(specs, spiritData));
  }, [specs, spiritData]);

  return (
    <>
      <Wrapper className='cocktail-page'>
        <h2 className='section-header'>{name}</h2>
        <img src={image_url} alt={name} />
        <p>{description}</p>
        <div className='space-between'>
          <div>
            <h3 className='section-header'>Spec List</h3>
            <ul>{renderSpecList}</ul>
            <h3 className='section-header'>Glassware</h3>
            <p>{glass}</p>
            <h3 className='section-header'>Garnish</h3>
            <p>{garnish}</p>
          </div>
          <NutritionLabel macros={macros} />
        </div>
        <div className="inline">
          <Button to="/cocktails" variant="secondary" size="small">Back to Cocktails</Button>
          <Button variant="primary" size="small" onClick={() => addDrinkToState({name: name, specs: specs, technique: technique})}>Add to Drinks</Button>
        </div> 
      </Wrapper>

      <Helmet>
        <title>{ name } | Neat on the Rocks</title>
        <meta name="description" content={ description } />
        <meta name="keywords" content="alcohol, calories, ethanol, abv, nutrition, glassware, bar, bartender, vodka, gin, tequila, best tequila, instructions" />
        <meta property="og:image" content={ image_url } />
        <meta name="twitter:image" content={ image_url } />
      </Helmet>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem auto; 
  max-width: 960px;
  width: 100%; 

  img {
    width: 100%;
    height: auto; 
    border-radius: 8px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  }

  .inline {
    display: flex;
    justify-content: space-between; 
    margin-top: 20px;
  }

  .space-between {
    display: flex;
    gap: 20px; 
    justify-content: space-between; 
    align-items: flex-start; 

    > div {
      flex: 1;
    }
  }

  .section-header {
    color: var(--accent);
    margin-bottom: 10px; 
  }

  p {
    line-height: 1.6; 
    color: rgba(255, 255, 255, 0.9); 
  }

  ul {
    list-style: none; 
    padding: 0;
    margin: 0; 
  }

  li {
    background: var(--header);
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
  }

  @media (max-width: 1024px) {
    .space-between, .inline {
      flex-direction: column; 
    }
  }
`;