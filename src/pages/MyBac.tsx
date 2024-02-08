import React, { useState, useEffect } from 'react';
import BacResults from '../components/BacResults';
import PreBacResults from '../components/PreBacResults';
import { Cocktail } from '../types/Cocktail';
import { UserMetrics } from '../types/UserMetrics';


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
    if (metrics) {
      setUserMetrics(JSON.parse(metrics));
    }
  }, []);

  return (
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
  );
}