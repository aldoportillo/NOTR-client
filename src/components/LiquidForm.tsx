import { toast } from 'react-toastify';
import TechniqueList from './TechniqueList';
import { SpiritData } from '../types/SpiritData';
import Button from './Button';
import styled from 'styled-components';
import { Spec } from '../types/Spec';
import { Technique } from '../types/Technique';

interface LiquidFormProps {
  cocktail: Spec[];
  setCocktail: React.Dispatch<React.SetStateAction<Spec[]>>;
  spiritData: SpiritData[];
  technique?: Technique;
  setTechnique?: React.Dispatch<React.SetStateAction<Technique>>;
}

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
      <h3>Enter Liquids</h3>
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

h3{
  color: var(--accent);
  margin-bottom: 20px;
  align-self: center;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1vh;
}
input{
  height: 3em;
  border-radius: 1vh;
  background-color: var(--overlay);
  color: white;
}

input::placeholder{
  color: white;
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