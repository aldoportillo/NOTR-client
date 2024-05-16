import React, { useState, useEffect } from 'react';
import BacResults from '../components/BacResults';
import PreBacResults from '../components/PreBacResults';
import { Cocktail } from '../types/Cocktail';
import { UserMetrics } from '../types/UserMetrics';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';

type Drink = Cocktail[];

interface MyBacProps {
  drinks: Drink[]; 
  setDrinks: React.Dispatch<React.SetStateAction<Drink[]>>; 
  totalEthanol: number;
  setTotalEthanol: React.Dispatch<React.SetStateAction<number>>;
}


export default function MyBac({ drinks, setDrinks, totalEthanol, setTotalEthanol }: MyBacProps) {
  const [userMetrics, setUserMetrics] = useState<UserMetrics>({});
  const [bac, setBac] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const metrics = localStorage.getItem("previousMetrics");
    const user = localStorage.getItem("user");
    if (user) {
      const parsedData = JSON.parse(user);
      setUserMetrics({
        weight: parsedData.weight,
        heightFeet: Math.floor(parsedData.height / 12),
        heightInches: parsedData.height % 12,
        gender: parsedData.sex
    });
    } else if (metrics) {
      setUserMetrics(JSON.parse(metrics));
    }

    console.log(userMetrics)
  }, []);

  return (
    <>
    
    <div className='drinks-page'>
      {formSubmitted ? 
          <BacResults setFormSubmitted={setFormSubmitted} bac={bac} totalEthanol={totalEthanol} />:
          <PreBacResults
            formSubmitted={formSubmitted}
            setFormSubmitted={setFormSubmitted} 
            setBac={setBac} 
            totalEthanol={totalEthanol} 
            setTotalEthanol={setTotalEthanol} 
            userMetrics={userMetrics} 
            setUserMetrics={setUserMetrics} 
            drinks={drinks} 
            setDrinks={setDrinks} 
        />
      }
    </div>
    <Helmet>
      <title>BAC Calculator | Neat on the Rocks</title>
      <meta name="description" content="BAC Insights: Stay informed about your alcohol consumption using our advanced Blood Alcohol Content (BAC) tracker. Immerse yourself in the art of responsible drinking." />
      <meta name="keywords" content="perfect, cocktail, alcohol, calories, ethanol, abv, nutrition, glassware, bar, bartender, vodka, gin, tequila, best tequila, instructions, bac" />
      <meta property="og:image" content="https://res.cloudinary.com/dkhtrg1ts/image/upload/v1702322801/NeatontheRocks/Cocktails/photo-1470337458703-46ad1756a187_xcfnzd.avif" />
      <meta name="twitter:image" content="https://res.cloudinary.com/dkhtrg1ts/image/upload/v1702322801/NeatontheRocks/Cocktails/photo-1470337458703-46ad1756a187_xcfnzd.avif" />
    </Helmet>
    </>
  );
}