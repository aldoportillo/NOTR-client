export interface Spirit {
  id:                string;
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
}

enum Type {
  Bitters = "bitters",
  Cordials = "cordials",
  Extras = "extras",
  Juice = "juice",
  Spirit = "spirit",
  Syrup = "syrup",
  Vermouth = "vermouth",
}