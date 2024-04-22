import { Spec } from './Spec';

export interface CocktailData {
  id:          number;
  name:        string;
  description: string;
  glasswareId: number;
  image_url:    string;
  techniqueId: number;
  garnishId:   number;
  createdAt:   Date;
  updatedAt:   Date;
  garnish:     string;
  glass:   string;
  technique:   string;
  specs:       Spec[];
  slug:        string;
}


export interface Spirit {
  name: string;
}

export interface Technique {
  id:          number;
  name:        string;
  instruction: Instruction[];
}

export interface Instruction {
  number:      number;
  step:        string;
  techniqueId: number;
}
