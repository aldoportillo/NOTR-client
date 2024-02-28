import React from 'react';
import { toast } from 'react-toastify';
import { GiBodyHeight, GiWeightScale } from 'react-icons/gi';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { UserMetrics } from '../../types/UserMetrics';
import Button from '../Button/Button';
import styled from 'styled-components';
import { COLORS } from '../../styles/COLORS.ts';


interface BodyCompFormProps {
  setUserMetrics: React.Dispatch<React.SetStateAction<UserMetrics>>;
  userMetrics: UserMetrics;
  widmarkFactor: number;
  setWidmarkFactor: React.Dispatch<React.SetStateAction<number>>;
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  ethanol: number;
  setBac: React.Dispatch<React.SetStateAction<number>>;
  setEthanolInDrinkForm: React.Dispatch<React.SetStateAction<boolean>>;
  ethanolInDrinkForm: boolean;
}

const BodyCompForm: React.FC<BodyCompFormProps> = ({
  setUserMetrics,
  userMetrics,
  setWidmarkFactor,
  widmarkFactor,
  setFormSubmitted,
  ethanol,
  setBac,
  setEthanolInDrinkForm,
  ethanolInDrinkForm,
}) => {
  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserMetrics({ ...userMetrics, [name]: name === 'weight' || name === 'heightFeet' || name === 'heightInches' ? parseInt(value) : value });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userMetrics.weight || userMetrics.heightFeet === undefined || userMetrics.heightInches === undefined) {
    
      toast('🫵 Please fill all the fields. 💪');
      return;
    }
    const bmi = 703 * (userMetrics.weight / ((userMetrics.heightInches + (userMetrics.heightFeet * 12)) ** 2));
    setWidmarkFactor(userMetrics.gender === 'male' ? 1.0181 - (0.01213 * bmi) : 1.0181 - (0.01240 * bmi));
    toast(`🫵 Body Metrics Added. BAC Calculated. 💪`);
    localStorage.setItem('previousMetrics', JSON.stringify(userMetrics));
    setFormSubmitted(true);
    setBac((ethanol * 100) / (widmarkFactor * (453.592 * userMetrics.weight)));
  };

  return (
    <Wrapper>
    <h4>Enter Liquids:</h4>
    <form onSubmit={submitForm}>
      <label>
        <GiWeightScale size="2em" />
        <input name="weight" type="number" placeholder='weight (lbs)' onChange={changeForm} required value={userMetrics.weight || ''} />
        pounds
      </label>
      <label>
        <GiBodyHeight size="2em" />
        <input name="heightFeet" type="number" placeholder='height (ft)' onChange={changeForm} required value={userMetrics.heightFeet || ''} />
        feet
        <input name="heightInches" type="number" placeholder='height (in)' onChange={changeForm} required value={userMetrics.heightInches !== undefined ? userMetrics.heightInches : ''} />
        inches
      </label>
      <label>
        <BsGenderAmbiguous size="2em" />
        Male:
        <input type="radio" name="gender" value="male" onChange={changeForm} checked={userMetrics.gender === 'male'} />
        Female:
        <input type="radio" name="gender" value="female" onChange={changeForm} checked={userMetrics.gender === 'female'} />
      </label>
      <p>Add <span className="clickable" onClick={() => setEthanolInDrinkForm(!ethanolInDrinkForm)}>Beer or Wine </span></p>
      <Button variant="primary" size="large">Submit</Button>
    </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`


display: flex;
flex-direction: column;
padding: 0vh 50px 2vh 50px;
background-color: ${COLORS.overlay};
border-radius: 1vh;
border: 3px solid ${COLORS.accent};

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
  border : 1px ${COLORS.accent} ! important;
  box-shadow : 0 0 3px ${COLORS.accent} ! important;
  -moz-box-shadow : 0 0 3px ${COLORS.accent} ! important;
  -webkit-box-shadow : 0 0 3px ${COLORS.accent} ! important;

}


input[type="radio"] {
  accent-color: ${COLORS.accent}
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
  color: ${COLORS.accent}
}

`;

export default BodyCompForm;