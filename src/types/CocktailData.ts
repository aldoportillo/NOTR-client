import { Image } from './Image';
import { Spec } from './Spec';


export interface CocktailData {
    _id: string;
    name: string;
    image: Image;
    specs: Spec[];
    instructions: string[];
    description: string;
    method: string;
    garnish: string;
    type: string;
    glass: string;
    __v: number;
  }