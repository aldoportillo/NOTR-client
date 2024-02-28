import fetchData from './axiosRequests';

export interface Cocktail {
    _id:          string;
    name:         string;
    image:        Image;
    specs:        Spec[];
    instructions: Instruction[];
    description:  string;
    method:       Method;
    garnish:      string;
    type:         Type;
    glass:        string;
    __v:          number;
}

export interface Image {
    filePath: string;
}

export enum Instruction {
    AddGarnishAndEnjoy = "Add garnish and enjoy!",
    AddGarnishesAndEnjoy = "Add garnishes and Enjoy!",
    CloseShakerAndShakeFor30Seconds = "Close shaker and shake for 30 seconds",
    FillTheGlassWithIceCubesOrCrushedIce = " Fill the glass with ice cubes or crushed ice.",
    FillTheMixingGlassWithIceCubes = "Fill the mixing glass with ice cubes.",
    FillTheShakerWithIce = "Fill the shaker with ice.",
    IfNeededGiveAGentleStirToCombineFlavors = " If needed, give a gentle stir to combine flavors.",
    PourEachIngredientDirectlyIntoTheGlass = "Pour each ingredient directly into the glass.",
    PourInTheCocktailIngredients = "Pour in the cocktail ingredients.",
    StirFor30Seconds = "Stir for 30 seconds",
    UseAStrainerToPourIntoAGlass = "Use a strainer to pour into a glass.",
}

export enum Method {
    Build = "Build",
    Shaken = "Shaken",
    Stirred = "Stirred",
}

export interface Spec {
    spirit?:     string;
    ounces?:     number;
    dashes?:     number;
    drops?:      number;
    ingredient?: string;
}

export enum Type {
    Cocktail = "cocktail",
}


export const fetchCocktails = async (): Promise<Cocktail[]> => {
    let url = 'https://neatontherocks-server.onrender.com/cocktails';

    if (process.env.NODE_ENV === 'development') {
      url = 'http://localhost:5000/cocktails';
    }
    
  return await fetchData<Cocktail[]>(url);
};
