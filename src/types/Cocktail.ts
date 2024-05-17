import { Spec } from './Spec';

export interface Cocktail {
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
  