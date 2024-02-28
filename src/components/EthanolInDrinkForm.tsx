import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from './Button/Button';
import styled from 'styled-components';

interface EthanolInDrinkFormProps {
  totalEthanol: number;
  setTotalEthanol: React.Dispatch<React.SetStateAction<number>>;
  ethanolInDrinkForm: boolean;
  setEthanolInDrinkForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EthanolInDrinkForm: React.FC<EthanolInDrinkFormProps> = ({
  totalEthanol,
  setTotalEthanol,
  ethanolInDrinkForm,
  setEthanolInDrinkForm,
}) => {
  const [percent, setPercent] = useState<number | undefined>(undefined);
  const [ounces, setOunces] = useState<number | undefined>(undefined);

  const calculateEthanol = (percent: number | undefined, ounces: number | undefined): number => {
    if (percent === undefined || ounces === undefined) return 0;
    return ounces * 29.5735 * (percent / 100) * 0.789;
  };

  const addEthanolToDrinks = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEthanolInDrinkForm(false);
    setTotalEthanol((totalEthanol) => totalEthanol + calculateEthanol(percent, ounces));
    // setDrinks([...drinks, {name: "Miscellaneous", ethanol: calculateEthanol(percent, ounces), isCocktail: false}]);
    toast(`⚖️ ${calculateEthanol(percent, ounces).toFixed(2)}g of ethanol added ⚖️`);
  };

  return (
    <Wrapper>
    <form onSubmit={addEthanolToDrinks}>
      <label htmlFor="abv">Alcohol (%):</label>
      <input value={percent === undefined ? '' : percent} onChange={(e) => setPercent(Number(e.target.value))} type="number" name="abv" required />
      <label htmlFor="ounces">Ounces (oz):</label>
      <input value={ounces === undefined ? '' : ounces} onChange={(e) => setOunces(Number(e.target.value))} type="number" name="ounces" required />
      {totalEthanol > 0 && <p>Return to <span className="clickable" onClick={() => setEthanolInDrinkForm(!ethanolInDrinkForm)}>body metrics form</span></p>}
      <Button variant="primary" size="small">Submit</Button>
    </form>
    </Wrapper>
  );
};

export default EthanolInDrinkForm;



const Wrapper = styled.div`


display: flex;
flex-direction: column;
padding: 0vh 50px 2vh 50px;
background-color: #838383;
border-radius: 1vh;
border: 3px solid rgb(244, 154, 115);
width: 100%;


form {
  display: flex;
  flex-direction: column;
  gap: 1vh;
}
input{
  height: 3em;
  border-radius: 1vh;
}

input:focus{
  outline-offset: 0px ! important;
  outline: none ! important;
  border : 1px var(--accent) ! important;
  box-shadow : 0 0 3px var(--accent) ! important;
  -moz-box-shadow : 0 0 3px var(--accent) ! important;
  -webkit-box-shadow : 0 0 3px var(--accent) ! important;

}

input[type="radio"] {
  accent-color: var(--accent)
}

label {
  display: flex;
  align-items: center;
  gap: 8px;
}

label > input{
  max-width: 10vw;
} 


label > svg {
  color: var(--accent)
}

`;