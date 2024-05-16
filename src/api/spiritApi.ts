import fetchData from './axiosRequests';



interface Spirit {
    _id:                string;
    name:               string;
    type:               Type;
    calories:           number;
    ethanol:            number;
    fat:                number;
    carb:               number;
    sugar:              number;
    addedSugar:         number;
    protein:            number;
    abv:                number;
    sugarConcentration: number;
    acid:               number;
    __v:                number;
}

export enum Type {
    Bitters = "bitters",
    Cordials = "cordials",
    Extras = "extras",
    Juice = "juice",
    Spirit = "spirit",
    Syrup = "syrup",
    Vermouth = "vermouth",
}


export const fetchSpirits = async (): Promise<Spirit[]> => {
  let url = `${import.meta.env.VITE_SERVER_URI}/spirits`;

  if (process.env.NODE_ENV === 'development') {
    url = `${import.meta.env.VITE_SERVER_URI}/spirits`;
  }
  
  return await fetchData<Spirit[]>(url);
};
