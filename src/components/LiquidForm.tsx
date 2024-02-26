import { toast } from 'react-toastify';
import TechniqueList from './TechniqueList';
import { Cocktail } from '../types/Cocktail';
import { SpiritData } from '../types/SpiritData';
import Button from './Button/Button';

interface LiquidFormProps {
  cocktail: Cocktail[];
  setCocktail: React.Dispatch<React.SetStateAction<Cocktail[]>>;
  spiritData: SpiritData[];
  setTechnique?: React.Dispatch<React.SetStateAction<string>>;
}

export default function LiquidForm({ cocktail, setCocktail, spiritData, setTechnique }: LiquidFormProps) {
  const renderOptions = spiritData.map(liquid => (
    <option key={liquid._id} value={liquid.name}>{liquid.name}</option>
  ));

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.currentTarget);
    const spirit = formData.get('liquid') as string;
    const ounces = parseFloat(formData.get('ounces') as string);

    if (spiritData.some(liquid => liquid.name === spirit)) {
      toast(`🥃 ${spirit} added 🥃`);
      setCocktail([...cocktail, { spirit, ounces }]);
    } else {
      toast(`❌ That spirit is not in the database yet ❌`);
    }

    // Reset form inputs
    e.currentTarget.reset();
  }

  return (
    <div className='liquid-form'>
      <h4>Enter Liquids:</h4>
      {setTechnique && <TechniqueList setTechnique={setTechnique} />}
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
    </div>
  );
}
