import { getMacros } from '../functions/getMacros';
import NutritionLabel from '../components/NutritionLabel/NutritionLabel';
import React, { useEffect } from 'react';
import { Spec } from '../types/Spec';
import { SpiritData } from '../types/SpiritData';
import { CocktailData } from '../types/CocktailData';
import Button from '../components/Button/Button';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Macros } from '../types/Macros';
import { useManageDrinks } from '../hooks/useManageDrinks';

type Drinks = Spec[];

interface CocktailProps {
  spiritData: SpiritData[];
  setTotalEthanol: React.Dispatch<React.SetStateAction<number>>;
  setDrinks: React.Dispatch<React.SetStateAction<Drinks[]>>;
}

export default function Cocktail({ spiritData }: CocktailProps) {
  const location = useLocation();
  const data = location.state as { data: CocktailData }; 


  const { name, specs, description, image_url, glass, garnish } = data.data;
  const { addDrinkToState } = useManageDrinks(spiritData);

  const renderSpecList = specs.map((spec, index) => {
    return (
      <li key={index}>
        {spec.ounces} oz of {spec.spirit}
      </li>
    );
  });

  const [macros, setMacros] = React.useState<Macros>({
    "fat": 0,
    "carb": 0,
    "sugar": 0,
    "addedsugar": 0,
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
        <h2>{name}</h2>
        <img src={image_url} alt={name} />
        <p>{description}</p>
        <div className='space-between'>
          <div>
            <h3>Spec List</h3>
            <ul>{renderSpecList}</ul>
            <h3>Glassware</h3>
            <p>{glass}</p>
            <h3>Garnish</h3>
            <p>{garnish}</p>
          </div>
          <NutritionLabel macros={macros} />
        </div>
        <div className="inline">
          <Button to="/cocktails" variant="secondary" size="small">Back to Cocktails</Button>
          <Button variant="primary" size="small" onClick={() => addDrinkToState({specs: specs})}>Add to Drinks</Button>
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
  margin: 2rem auto; // Center the content and provide some margin
  max-width: 960px; // Maximum width to maintain readability and aesthetics
  width: 100%; // Take full width up to the maximum

  img {
    width: 100%; // Now it will inherit properly from the wrapper
    height: auto; // Maintain aspect ratio
    border-radius: 8px; // Soften edges for aesthetic purposes
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Subtle shadow for depth
  }

  .inline {
    display: flex;
    justify-content: space-between; // Spread buttons out evenly
    margin-top: 20px; // Spacing from content above
  }

  .space-between {
    display: flex;
    gap: 20px; // Space between elements
    justify-content: space-between; // Use available space evenly
    align-items: flex-start; // Align items at the start of the cross axis

    > div {
      flex: 1; // Each child takes equal space
    }
  }

  h2, h3 {
    color: var(--accent); // Highlight titles with the accent color
    margin-bottom: 10px; // Space below headers
  }

  p {
    line-height: 1.6; // Improve readability
    color: rgba(255, 255, 255, 0.9); // Slightly softer white for text
  }

  ul {
    list-style: none; // Remove list styling
    padding: 0; // Remove padding
    margin: 0; // Remove margins
  }

  li {
    background: var(--header); // Use theme's header color for list items
    padding: 10px;
    margin-bottom: 5px; // Space between list items
    border-radius: 4px; // Rounded corners for list items
  }

  @media (max-width: 1024px) {
    .space-between, .inline {
      flex-direction: column; // Stack on smaller screens
    }
  }
`;