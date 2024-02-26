import React from 'react';
import { toast } from 'react-toastify';
import { GiBodyHeight, GiWeightScale } from 'react-icons/gi';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { UserMetrics } from '../types/UserMetrics';
import Button from './Button';


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
    if (!userMetrics.weight || !userMetrics.heightFeet || !userMetrics.heightInches) {
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
    <form onSubmit={submitForm} className='body-metrics-form'>
      <label>
        <GiWeightScale size="2em" />
        <input name="weight" type="number" placeholder='weight (lbs)' onChange={changeForm} required value={userMetrics.weight || ''} />
        pounds
      </label>
      <label>
        <GiBodyHeight size="2em" />
        <input name="heightFeet" type="number" placeholder='height (ft)' onChange={changeForm} required value={userMetrics.heightFeet || ''} />
        feet
        <input name="heightInches" type="number" placeholder='height (in)' onChange={changeForm} required value={userMetrics.heightInches || ''} />
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
  );
};

export default BodyCompForm;
