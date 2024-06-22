export interface Spirit {
  id:                string;
  name:               string;
  type:               Type;
  calories:           number;
  ethanol:            number;
  fat:                number;
  carb:               number;
  sugar:              number;
  added_sugar:         number;
  protein:            number;
  abv:                number;
  sugar_concentration: number;
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