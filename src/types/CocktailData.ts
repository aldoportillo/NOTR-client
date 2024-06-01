import { Spec } from './Spec';
import { Technique } from './Technique';

export interface CocktailData {
  id:           number;
  name:         string;
  description:  string;
  image_url:    string;
  slug:         string;
  glass:        string;
  technique:    Technique;
  garnish:      string;
  specs:        Spec[];
}


export interface Spirit {
  name: string;
}

export interface Instruction {
  number:      number;
  step:        string;
  techniqueId: number;
}
