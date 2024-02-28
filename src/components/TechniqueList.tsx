import React, { FC, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type Technique = 'shaken' | 'stirred' | 'built';

interface TechniqueListProps {
  setTechnique: Dispatch<SetStateAction<Technique>>;
}

const TechniqueList: FC<TechniqueListProps> = ({ setTechnique }) => {
  const modifyTechnique = (e: React.MouseEvent<HTMLButtonElement>) => {
    const technique = e.currentTarget.value as Technique;
    setTechnique(technique);
    toast(`🥂 Technique changed to ${technique}🥂`);
  };

  return (
    <div>
      <p>Select Method:</p>
      <button value="shaken" onClick={modifyTechnique}>Shaken</button>
      <button value="stirred" onClick={modifyTechnique}>Stirred</button>
      <button value="built" onClick={modifyTechnique}>Built</button>
    </div>
  );
};

export default TechniqueList;
