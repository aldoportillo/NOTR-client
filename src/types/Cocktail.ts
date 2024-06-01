import { Spec } from './Spec';
import { Technique } from './Technique';

export interface Cocktail {
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
  