import { toast } from 'react-toastify';
import TechniqueList from './TechniqueList';
import { SpiritData } from '../types/SpiritData';
import Button from './Button';
import styled from 'styled-components';
import { Spec } from '../types/Spec';

interface LiquidFormProps {
  cocktail: Spec[];
  setCocktail: React.Dispatch<React.SetStateAction<Spec[]>>;
  spiritData: SpiritData[];
  technique?: Technique;
  setTechnique?: React.Dispatch<React.SetStateAction<Technique>>;
}

type Technique = 'shaken' | 'stirred' | 'built';

export default function LiquidForm({ cocktail, setCocktail, spiritData, technique, setTechnique }: LiquidFormProps) {
  const renderOptions = spiritData.map(liquid => (
    <option key={liquid.id} value={liquid.name}>{liquid.name}</option>
  ));

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const spirit = formData.get('liquid') as string;
    const ounces = parseFloat(formData.get('ounces') as string);

    if (spiritData.some(liquid => liquid.name === spirit)) {
      toast(`🥃 ${spirit} added 🥃`);
      setCocktail([...cocktail, { spirit, ounces }]);
    } else {
      toast(`❌ That spirit is not in the database yet ❌`);
    }


    e.currentTarget.reset();
  }

  return (
    <Wrapper>
      <h4>Enter Liquids:</h4>
      {setTechnique && <TechniqueList technique={technique} setTechnique={setTechnique} />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="liquid-input">Spirit: (Use autofill results)</label>
        <input list="liquid-options" name="liquid" id="liquid-input" placeholder='spirit' autoComplete="off" required />
        <datalist id="liquid-options">
          {renderOptions}
        </datalist>
        <label htmlFor="ounces">Ounces:</label>
        <input name="ounces" type="number" placeholder='ounces' step="any" min="0" required />
        <Button variant='primary' size="medium">Add Liquid</Button>
      </form>
    </Wrapper>
  );
}


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