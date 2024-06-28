import React, { FC, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

type Technique = 'shaken' | 'stirred' | 'built';

interface TechniqueListProps {
  technique: Technique;
  setTechnique: Dispatch<SetStateAction<Technique>>;
}

const TechniqueList: FC<TechniqueListProps> = ({ technique, setTechnique }) => {
  const modifyTechnique = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTechnique = e.currentTarget.value as Technique;
    setTechnique(newTechnique);
    toast(`🥂 Technique changed to ${newTechnique} 🥂`);
  };

  return (
    <div>
      <p>Select Method:</p>
      <TechniqueButton value="shaken" onClick={modifyTechnique} isActive={technique === 'shaken'}>
        Shaken
      </TechniqueButton>
      <TechniqueButton value="stirred" onClick={modifyTechnique} isActive={technique === 'stirred'}>
        Stirred
      </TechniqueButton>
      <TechniqueButton value="built" onClick={modifyTechnique} isActive={technique === 'built'}>
        Built
      </TechniqueButton>
    </div>
  );
};

export default TechniqueList;


const TechniqueButton = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? 'var(--accent)' : 'var(--overlay)')};
  color: ${({ isActive }) => (isActive ? '#fff' : 'white')};
  border: 1px solid var(--accent);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: var(--accent);
    color: #fff;
  }
`;
