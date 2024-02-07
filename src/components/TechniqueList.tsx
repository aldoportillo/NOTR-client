import React, { FC, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

// Define the props expected by the TechniqueList component
interface TechniqueListProps {
  setTechnique: Dispatch<SetStateAction<string>>;
}

const TechniqueList: FC<TechniqueListProps> = ({ setTechnique }) => {
  const modifyTechnique = (e: React.MouseEvent<HTMLButtonElement>) => {
    const technique = e.currentTarget.value;
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
