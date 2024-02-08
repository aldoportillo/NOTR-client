import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EthanolInDrinkForm from './EthanolInDrinkForm';
import BodyCompForm from './BodyCompForm';
import { Cocktail } from '../types/Cocktail';
import { UserMetrics } from '../types/UserMetrics';

type Drink = Cocktail[];

interface PreBacResultsProps {
  drinks: Drink[];
  setDrinks: React.Dispatch<React.SetStateAction<Drink[]>>;
  setBac: React.Dispatch<React.SetStateAction<number>>;
  totalEthanol: number;
  setTotalEthanol: React.Dispatch<React.SetStateAction<number>>;
  userMetrics: UserMetrics;
  setUserMetrics: React.Dispatch<React.SetStateAction<UserMetrics>>;
  formSubmitted: boolean; 
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PreBacResults({
  setBac,
  totalEthanol,
  setTotalEthanol,
  userMetrics,
  setUserMetrics,
  setFormSubmitted,
}: PreBacResultsProps) {
  const [widmarkFactor, setWidmarkFactor] = useState<number>(0.68);
  const [ethanolInDrinkForm, setEthanolInDrinkForm] = useState<boolean>(false);

  return (
    <div className='body-comp-page'>
      {totalEthanol > 0 ? (
        <>
          <p>You have consumed</p>
          <h2 style={{ color: "#f49a73da" }}>{totalEthanol.toFixed(2)}g of ethanol</h2>
          <div className='liquid-form'>
            {ethanolInDrinkForm ? <h3>Calculate ethanol in a drink: </h3> : <h3>Enter your details to accurately calculate your BAC</h3>}
            {ethanolInDrinkForm ? (
              <EthanolInDrinkForm
                totalEthanol={totalEthanol}
                setTotalEthanol={setTotalEthanol}
                ethanolInDrinkForm={ethanolInDrinkForm}
                setEthanolInDrinkForm={setEthanolInDrinkForm}
              />
            ) : (
              <BodyCompForm
                widmarkFactor={widmarkFactor}
                ethanolInDrinkForm={ethanolInDrinkForm}
                setEthanolInDrinkForm={setEthanolInDrinkForm}
                setBac={setBac}
                ethanol={totalEthanol}
                setFormSubmitted={setFormSubmitted}
                setWidmarkFactor={setWidmarkFactor}
                userMetrics={userMetrics}
                setUserMetrics={setUserMetrics}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <h2>You haven't added any drinks visit <Link to="/nutrition">Nutrition</Link></h2>
          {ethanolInDrinkForm ? (
            <div className='liquid-form'>
              <h3>Calculate ethanol in a drink: </h3>
              <EthanolInDrinkForm
                totalEthanol={totalEthanol}
                setTotalEthanol={setTotalEthanol}
                ethanolInDrinkForm={ethanolInDrinkForm}
                setEthanolInDrinkForm={setEthanolInDrinkForm}
              />
            </div>
          ) : (
            <p>Add <span className="clickable" onClick={() => setEthanolInDrinkForm(!ethanolInDrinkForm)}>Beer or Wine </span></p>
          )}
        </>
      )}
    </div>
  );
}
