import { Spec } from './Spec';

export interface CocktailData {
  id:           number;
  name:         string;
  description:  string;
  image_url:    string;
  slug:         string;
  glass:        string;
  technique:    string;
  garnish:      string;
  specs:        Spec[];
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
